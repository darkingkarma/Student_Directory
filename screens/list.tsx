import { useCallback, useState } from 'react';

import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore';

import { db } from '../firebaseConfig';

type Student = {
  id: string;
  name: string;
  course: string;
  yearLevel: string;
  email: string;
  age: string;
  image?: string;
};

export default function StudentListScreen({ navigation }: any) {
  const [students, setStudents] = useState<Student[]>([]);

  const getStudents = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, 'students')
      );

      const studentList: Student[] = [];

      querySnapshot.forEach((studentDoc) => {
        studentList.push({
          id: studentDoc.id,
          ...studentDoc.data(),
        } as Student);
      });

      setStudents(studentList);
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to retrieve students.'
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      getStudents();
    }, [])
  );

  const deleteStudent = (id: string) => {
    Alert.alert(
      'Delete Student',
      'Are you sure you want to delete this student?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',

          onPress: async () => {
            try {
              await deleteDoc(
                doc(db, 'students', id)
              );

              Alert.alert(
                'Success',
                'Student deleted successfully.'
              );

              getStudents();
            } catch (error) {
              Alert.alert(
                'Error',
                'Failed to delete student.'
              );
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Student List
      </Text>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No students found.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.studentCard}>
            {item.image ? (
              <Image
                source={{ uri: item.image }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.noImage}>
                <Text style={styles.noImageText}>
                  No Photo
                </Text>
              </View>
            )}

            <Text style={styles.studentName}>
              {item.name}
            </Text>

            <Text>
              Course: {item.course}
            </Text>

            <Text>
              Year Level: {item.yearLevel}
            </Text>

            <Text>
              Email: {item.email}
            </Text>

            <Text>
              Age: {item.age}
            </Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  navigation.navigate(
                    'EditStudent',
                    { student: item }
                  )
                }
              >
                <Text style={styles.buttonText}>
                  Edit
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  deleteStudent(item.id)
                }
              >
                <Text style={styles.buttonText}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
    backgroundColor: '#E3FDFD',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  studentCard: {
    borderWidth: 1,
    borderColor: '#71C9CE',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
  },

  profileImage: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    marginBottom: 12,
  },

  noImage: {
    width: 90,
    height: 90,
    borderWidth: 1,
    borderColor: '#71C9CE',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  noImageText: {
    color: '#71C9CE',
    fontSize: 12,
  },

  studentName: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 7,
  },

  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },

  editButton: {
    backgroundColor: '#71C9CE',
    padding: 10,
    borderRadius: 7,
    flex: 1,
    alignItems: 'center',
  },

  deleteButton: {
    backgroundColor: '#71C9CE',
    padding: 10,
    borderRadius: 7,
    flex: 1,
    alignItems: 'center',
  },

  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },
});