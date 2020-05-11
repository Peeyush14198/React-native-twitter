import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import Feed from './Feed'
import UsersScreen from './UsersScreen'
import DrawerContent from './DrawerContent';
import ProfileScreen from './ProfileScreen'
import Logout from './Logout'


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }



  render() {
    const Drawer = createDrawerNavigator();
    return (

      <Drawer.Navigator initialRouteName="Feed" >
        <Drawer.Screen name="Feed" component={Feed} />
        <Drawer.Screen name = "My Profile" component = {ProfileScreen}/>
        <Drawer.Screen name = "Users" component = {UsersScreen}/>
        <Drawer.Screen name = "Logout" component = {Logout}/>
      </Drawer.Navigator>


    );
  }
}
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    marginTop: 50
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

