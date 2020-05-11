import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from '@react-native-firebase/auth'
import { StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import { ScrollView } from 'react-native-gesture-handler';
function OtherFollower({navigation }) {
   
    const [follower, setarray1] = React.useState([]);
    const LeftContent = props =>  <Avatar.Image
    source={{
      uri:
        'https://i.stack.imgur.com/gjwr8.png',
    }}
    size={50}
  />
    firestore().collection("user").onSnapshot((usersSnap) => {
        var userList = usersSnap.docs
        var currentId = firebase().currentUser.uid
        var follow = []
        var arr = []
        var following = []
        firestore().collection("user").doc(firebase().currentUser.uid).onSnapshot((snap) => {
           
           var  myFollowing = snap.data().following
            var name;
            var email;
           // firestore().collection("user").doc()
            setarray1(arr)
        })

      
    })
    return (
        <ScrollView >
        {follower}
    </ScrollView>
    )
}
export default OtherFollower;
const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    view: {
        position: 'absolute',
        top: 100
    },
    scrollView: {
        backgroundColor: 'white',
        marginVertical: 60
    },
    card: {
        marginTop: 10
    }
});
