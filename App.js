import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen.js'
import OtherProfileScreen from './screens/OtherProfile'
import Loading from './screens/Loading'
import SignUp from './screens/Signup.js';
import Login from './screens/Login'
import ProfileScreen from './screens/ProfileScreen.js';
import AddPost from './screens/AddPost.js';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading" screenOptions={{
        headerShown: false
      }}>
         <Stack.Screen name = "Loading" component = {Loading}/>
         <Stack.Screen name = "Login" component = {Login}/>
         <Stack.Screen name = "SignUp" component = {SignUp}/>
         <Stack.Screen name = "ProfileScreen" component = {ProfileScreen}/>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddPost" component={AddPost} />
        <Stack.Screen name="OtherProfileScreen" component={OtherProfileScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;