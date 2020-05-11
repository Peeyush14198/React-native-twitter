import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Appbar } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import firebase from '@react-native-firebase/auth'
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
function Logout({ navigation }) {
  const LeftContent = props =>  <Avatar.Image
  source={{
    uri:
      'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
  }}
  size={50}
/>
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")

  firestore().collection("user").doc(firebase().currentUser.uid).onSnapshot((userSnap) => {
    setName(userSnap.data().name)
    setEmail(userSnap.data().email)

  })
  return (
    <View style={styles.view}>
      <Appbar style={styles.bottom}>
        <Appbar.Action icon={{uri:"https://cdn4.iconfinder.com/data/icons/mobile-app-navigation-line-style/32/Hamburger_Menu-512.png"}} onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Logout">
        </Appbar.Content>
      </Appbar>
      <View style={{ marginTop: 50 }}>
        <Card style={styles.card} onPress={() => handle(k)}>
          <Card.Title title={name} subtitle={email} left={LeftContent} />

        </Card>
      </View>
      <View style={[{ width: "90%", margin: 10 }]}>
        <Button
          onPress={() => {
            firebase().signOut().then(() => {
              navigation.navigate("Login")
            })
          }}
          title="Log Out"
          color="blue"
        />
      </View>
    </View>
  );
}
export default Logout;
const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  view: {
    flex: 1
  },
  scrollView: {
    backgroundColor: 'white',
    marginVertical: 60
  },
  card: {
    marginTop: 10
  }
});
