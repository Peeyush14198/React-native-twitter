import React, { useEffect } from 'react';
import { Appbar } from 'react-native-paper';
import { View, Text, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from '@react-native-firebase/auth'
import FAB from 'react-native-fab';
import AddPost from './AddPost.js'

function Feed({ navigation }) {
    const [array, setarray] = React.useState([]);

    useEffect(() => {
        const LeftContent = props =>  <Avatar.Image
        source={{
          uri:
            'https://i.stack.imgur.com/gjwr8.png',
        }}
        size={50}
      />
        var currentUserFollowing = [];
        firestore().collection("user").doc(firebase().currentUser.uid).onSnapshot((userSnap) => {
            var currentUserFollowing = [];
            currentUserFollowing = userSnap.data().following
            firestore().collection("user").onSnapshot((usersSnap) => {
                var userList = []
                userList = usersSnap.docs
                firestore().collection("activity").orderBy('timeStamp', "desc").onSnapshot((activitySnap) => {
                    var activityFeed = []
                    for (var i = 0; i < activitySnap.docs.length; i++) {
                        // console.log(activitySnap.docs[i].data())
                        var uid = activitySnap.docs[i].data().uid;
                        var previousDate = activitySnap.docs[i].data().timeStamp;
                        var showFeed = false
                        if (uid == firebase().currentUser.uid) {
                            var post = activitySnap.docs[i].data().post;
                            activityFeed.push(
                                <Card style={styles.card} onPress={() => { console.log(j) }}>
                                    <Card.Title title={userSnap.data().name} subtitle={userSnap.data().email} left={LeftContent} />
                                    <Card.Content>
                                        <Paragraph>{post}</Paragraph>
                                    </Card.Content>
                                </Card>
                            )
                        }
                        else {
                            for (var k = 0; k < currentUserFollowing.length; k++) {
                                if (currentUserFollowing[k] == uid) {
                                    showFeed = true
                                }
                            }
                            if (showFeed) {
                                for (var j = 0; j < userList.length; j++) {
                                    if (userList[j].id === uid) {
                                        name = userList[j].data().name
                                        email = userList[j].data().email
                                    }
                                }
                                var post = activitySnap.docs[i].data().post;
                                activityFeed.push(
                                    <Card style={styles.card} >
                                        <Card.Title title={name} subtitle={email} left={LeftContent} />
                                        <Card.Content>
                                            <Paragraph>{post}</Paragraph>
                                        </Card.Content>
                                    </Card>
                                )
                            }
                        }

                        // var diff = currentDate.getTime() - previousDate.toDate().getTime()
                        // var second=Math.abs(diff/1000)
                        // var postTime;
                        // console.log(second)
                        // if(second>60)
                        // {
                        //     var diffMins =Math.floor(second / 60) % 60;
                        //   //  console.log(diff-= diffMins * 60)
                        //     if(diffMins>60)
                        //     {
                        //         var hours=Math.abs(diff) / 36e5;
                        //         if(hours>24)
                        //         {
                        //            postTime = diff+"d"
                        //         }
                        //         else{
                        //             postTime = hours+"h"
                        //         }
                        //     }
                        //     else{
                        //         postTime = diffMins+"m"
                        //     }
                        // }
                        // else{
                        //     postTime = second+"s"
                        // }

                    }
                    setarray(activityFeed)

                })
            })
        })
    }, []);
    return (

        <View style={styles.container}>
            <Appbar style={styles.bottom}>
                <Appbar.Action icon={{uri:"https://cdn4.iconfinder.com/data/icons/mobile-app-navigation-line-style/32/Hamburger_Menu-512.png"}} onPress={() => navigation.toggleDrawer()} />
                <Appbar.Content title="Feed"></Appbar.Content>
            </Appbar>

            <ScrollView style={styles.scrollView} >
                {array}
            </ScrollView>
            <FAB buttonColor="red" iconTextColor="#FFFFFF" onClickAction={() => {
                navigation.navigate('AddPost')
            }} visible={true} />
        </View>);

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
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
});
export default Feed;