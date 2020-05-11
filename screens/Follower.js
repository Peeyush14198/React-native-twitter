import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from '@react-native-firebase/auth'
import { StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import { ScrollView } from 'react-native-gesture-handler';
function Follower({ navigation }) {
    const [follower, setarray1] = React.useState([]);
    const LeftContent = props => <Avatar.Image
        source={{
            uri:
                'https://i.stack.imgur.com/gjwr8.png',
        }}
        size={50}
    />
    firestore().collection("user").onSnapshot((usersSnap) => {
        var userList = usersSnap.docs
        var currentId = firebase().currentUser.uid
        firestore().collection("user").doc(firebase().currentUser.uid).onSnapshot((snap) => {
            var follow = []
            var arr = []
            var following = []
            follow = snap.data().followers
            following = snap.data().following
            var newFollowing = []
            for (var i = 0; i < following.length; i++) {
                newFollowing.push(following[i])
            }
            var name;
            var email;

            follow.map((foll) => {
                var hasFollowed = false;
                var hisFollowers = [];
                for (var k = 0; k < following.length; k++) {
                    if (following[k] === foll) {
                        hasFollowed = true
                    }
                }
                for (var j = 0; j < userList.length; j++) {
                    if (userList[j].id === foll) {
                        name = userList[j].data().name
                        email = userList[j].data().emaild
                        hisFollowers = userList[j].data().followers
                        // console.log("1")
                    }
                }
                //  console.log(name)

                arr.push(<Card style={styles.card}>
                    <Card.Title title={name} subtitle={email} left={LeftContent} />
                    <Card.Actions>
                        {hasFollowed ? <Button>Following</Button> : <Button
                            onPress={() => {
                                newFollowing.push(foll)
                                firestore().collection("user").doc(firebase().currentUser.uid).update({
                                    "following": newFollowing
                                })
                                hisFollowers.push(firebase().currentUser.uid)
                                firestore().collection("user").doc(foll).update({
                                    "followers": hisFollowers
                                })
                            }}
                        >Follow</Button>}
                    </Card.Actions>
                </Card>)
            })
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
