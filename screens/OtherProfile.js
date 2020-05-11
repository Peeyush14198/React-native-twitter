import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import firebase from '@react-native-firebase/auth'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import OtherFollower from './OtherFollower'
import Following from './Following'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();


function OtherProfileScreen({ route, navigation }) {
    const { id } = route.params;
    const LeftContent = props => <Avatar.Image
        source={{
            uri:
                'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
        }}
        size={50}
    />
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")

    firestore().collection("user").doc(id).onSnapshot((userSnap) => {
        setName(userSnap.data().name)
        setEmail(userSnap.data().email)

    })
    return (
        <View style={styles.view}>
            <Appbar style={styles.bottom}>

                <Appbar.Content title="My Profile">

                </Appbar.Content>
            </Appbar>
            <View style={{ marginTop: 50 }}>
                <Card style={styles.card} onPress={() => handle()}>
                    <Card.Title title={name} subtitle={email} left={LeftContent} />

                </Card>
            </View>
            <View style={{ flex: 1, marginTop: 0 }}>
                <Tab.Navigator initialRouteName="Follower">
                    <Tab.Screen name="Follower" component={OtherFollower ,{
                        "id":id
                    }}   />
                    <Tab.Screen name="Following" component={Following} />
                </Tab.Navigator>
            </View>
        </View>
    );
}
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
export default OtherProfileScreen;
