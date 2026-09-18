import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function MainScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Student Directory
      </Text>

      <Text style={styles.subtitle}>
        Student Information
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('AddStudent')
        }
      >
        <Text style={styles.buttonText}>
          Add Student
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('StudentList')
        }
      >
        <Text style={styles.buttonText}>
          View Student List
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#E3FDFD',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 40,
  },

  button: {
    backgroundColor: '#71C9CE',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },

  buttonText: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
});