import React, { Component, useEffect } from 'react';
import { View, Text, } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { Avatar, Card, Button, Title, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import OtherProfile from './OtherProfile'
import firebase from '@react-native-firebase/auth'

function UsersScreen({ navigation }) {
    const [users, setarray] = React.useState([]);
    const [ar] = React.useState(["sa", "adsa"])
    const LeftContent = props => <Avatar.Image
        source={{
            uri:
                'https://i.stack.imgur.com/gjwr8.png',
        }}
        size={50}
    />
    const handle = (dum) => {
        console.log(dum)
    }
    useEffect(() => {
        firestore().collection("user").doc(firebase().currentUser.uid).onSnapshot((mySnap) => {
            var following = mySnap.data().following
            var newFollowing = []
            for (var i = 0; i < following.length; i++) {
                newFollowing.push(following[i])
            }
            console.log(newFollowing)
            var usersTags = []
            var usersArray = []
            firestore().collection("user").onSnapshot((userSnap) => {


                for (var i = 0; i < userSnap.docs.length; i++) {

                    if (mySnap.id !== userSnap.docs[i].id) {

                        usersArray.push(userSnap.docs[i])
                    }
                }
                //  console.log(usersArray)
                usersArray.map((user) => {
                    var hasFollowed = false;
                    for (var j = 0; j < following.length; j++) {
                        if (following[j] === user.id) {
                            hasFollowed = true
                        }
                    }
                   
                    usersTags.push(<Card style={styles.card} onPress={() => {
                        console.log(user.id)
                        // navigation.navigate("OtherProfileScreen",{
                        //     "id":user.id
                        // })
                    }
                    }>
                        <Card.Title title={user.data().name} subtitle={user.data().email} left={LeftContent} />
                        <Card.Actions>
                            {hasFollowed ? <Button>Following</Button> : <Button onPress={() => {
                                newFollowing.push(user.id)
                                firestore().collection("user").doc(firebase().currentUser.uid).update({
                                    "following": newFollowing
                                })
                            }}>Follow</Button>}
                        </Card.Actions>
                    </Card>)
                })
                // for (var k = 0; k <usersArray.length ; k++) {
                //     var hasFollowed = false;
                //     for (var j = 0; j < following.length; j++) {
                //         if (following[j] === usersArray[k].id) {
                //             hasFollowed = true
                //         }
                //     }  
                //     var dum = usersArray[k].data().name
                //     usersTags.push(<Card style={styles.card} onPress={()=>handle(k)}>
                //         <Card.Title title={usersArray[k].data().name} subtitle={usersArray[k].data().email} left={LeftContent} />
                //         <Card.Actions>
                //             {hasFollowed?<Button>Following</Button>:<Button>Follow</Button>}
                //         </Card.Actions>
                //     </Card>)
                // }
                setarray(usersTags)
            })

        })
    }, [])

    return (

        <View>
            <Appbar style={styles.bottom}>
                <Appbar.Action icon={{ uri: "https://cdn4.iconfinder.com/data/icons/mobile-app-navigation-line-style/32/Hamburger_Menu-512.png" }} onPress={() => navigation.toggleDrawer()} />
                <Appbar.Content title="Users"></Appbar.Content>
            </Appbar>

            <ScrollView style={styles.scrollView} >
                {users}
            </ScrollView>

        </View>
    )
}
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
export default UsersScreen;