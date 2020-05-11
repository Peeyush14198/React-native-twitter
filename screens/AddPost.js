import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Platform, Button } from 'react-native'
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import firebase from '@react-native-firebase/auth'


const iosTextHeight = 20.5
const androidTextHeight = 20.5
const textHeight = Platform.OS === 'ios' ? iosTextHeight : androidTextHeight
export default class AddPost extends Component {
    state = { height: textHeight * 2, lines: 1 }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value === '') {
            this.setState({ height: textHeight * 2, lines: 1 })
        }
    }
    constructor(props) {
        super(props);
        this.state = {
          postText:''
        };
    }

    render() {
        const { style, value, placeholder = "Write Something", numberOfLines = 2, autoFocus = true, onChangeText } = this.props

        return (
            <View style={{ flex: 1 }}>
                <Appbar style={styles.bottom}>
                    <Appbar.Content title="Add Post"></Appbar.Content>
                </Appbar>
                <View style={{ marginTop: 100 }}>

                    <TextInput
                        style={[style, { height: this.state.height }]}
                        multiline
                        autoFocus={autoFocus}
                        value={value}
                        onChangeText = {
                         (text) => this.setState({postText:text}) 
                        }
                        placeholder={placeholder}
                        numberOfLines={2}
                        maxLength={80}
                        underlineColorAndroid='transparent'
                    />
                </View>
                <View style={{
                    width: '90%',
                    height: 50,

                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 0
                }}>
                    <View style={{
                        width: '90%'
                    }}>
                        <Button
                            onPress={() =>{
                                console.log(this.state.postText)
                                if(this.state.text!='')
                                {
                                    firestore().collection("activity").add({
                                        "post":this.state.postText,
                                        "uid":firebase().currentUser.uid,
                                        "timeStamp": Date()
                                    })
                                    this.props.navigation.pop()
                                }
                            }}
                            title="Make a Post"
                            color="blue"
                        />
                    </View>
                </View>
            </View>
        )
    }
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