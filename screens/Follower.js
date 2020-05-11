import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from '@react-native-firebase/auth'
import { StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import { ScrollView } from 'react-native-gesture-handler';
function Follower({ navigation }) {
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
            follow = snap.data().followers
            following = snap.data().following
            var name;
            var email;
            
            for (var i = 0; i < follow.length; i++) {
                var hasFollowed = false;
                for(var k = 0;k<following.length;k++)
                {
                    if(following[k]===follow[i])
                    {
                        hasFollowed = true
                    }
                }
                for (var j = 0; j < userList.length; j++) {
                    if (userList[j].id === follow[i]) {
                        name = userList[j].data().name
                        email = userList[j].data().email
                       // console.log("1")
                    }
                }
              //  console.log(name)
                
                arr.push(<Card style={styles.card} onPress={() => handle(k)}>
                    <Card.Title title={name} subtitle={email} left={LeftContent} />
                    <Card.Actions>
                            {hasFollowed?<Button>Following</Button>:<Button>Follow</Button>}
                        </Card.Actions>
                </Card>)
            }
            setarray1(arr)
        })

      
    })
    return (
        <ScrollView >
        {follower}
    </ScrollView>
    )
}
export default Follower;
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
