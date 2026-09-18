import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './screens/main';
import AddStudentScreen from './screens/add';
import StudentListScreen from './screens/list';
import EditStudentScreen from './screens/edit';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ title: 'Student Directory' }}
        />

        <Stack.Screen
          name="AddStudent"
          component={AddStudentScreen}
          options={{ title: 'Add Student' }}
        />

        <Stack.Screen
          name="StudentList"
          component={StudentListScreen}
          options={{ title: 'Student List' }}
        />

        <Stack.Screen
          name="EditStudent"
          component={EditStudentScreen}
          options={{ title: 'Edit Student' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}