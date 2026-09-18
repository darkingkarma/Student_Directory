import { useState } from 'react';

import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { addDoc, collection } from 'firebase/firestore';

import { db } from '../firebaseConfig';

export default function AddStudentScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState('');

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permission Required',
        'Please allow access to your photos.'
      );
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true,
      });

    if (!result.canceled && result.assets[0].base64) {
      setImage(
        `data:image/jpeg;base64,${result.assets[0].base64}`
      );
    }
  };

  const saveStudent = async () => {
    if (!name || !course || !yearLevel || !email || !age) {
      Alert.alert(
        'Error',
        'Please fill in all fields.'
      );
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
    Alert.alert(
        'Invalid Email',
        'Please enter a valid email address.'
    );
    return;
    }

    try {
      await addDoc(collection(db, 'students'), {
        name,
        course,
        yearLevel,
        email,
        age,
        image,
      });

      Alert.alert(
        'Success',
        'Student added successfully.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Main'),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to add student.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Student</Text>

      <TouchableOpacity
        style={styles.imageButton}
        onPress={pickImage}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imageText}>
              Add Photo
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Student Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Course / Program"
        value={course}
        onChangeText={setCourse}
      />

      <TextInput
        style={styles.input}
        placeholder="Year Level"
        value={yearLevel}
        onChangeText={setYearLevel}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={saveStudent}
      >
        <Text style={styles.buttonText}>
          Save Student
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.cancelText}>
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 30,
    backgroundColor: '#E3FDFD',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  imageButton: {
    alignSelf: 'center',
    marginBottom: 20,
  },

  imagePlaceholder: {
    width: 110,
    height: 110,
    borderWidth: 2,
    borderColor: '#71C9CE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImage: {
    width: 110,
    height: 110,

  },

  imageText: {
    color: '#71C9CE',
    fontWeight: 'bold',
  },

  input: {
    borderWidth: 1,
    borderColor: '#71C9CE',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#71C9CE',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },

  buttonText: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },

  cancelButton: {
    marginTop: 10,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#71C9CE',
  },

  cancelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});