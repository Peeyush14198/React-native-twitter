import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


export default class SignUp extends React.Component {
    state = { email: '', password: '', errorMessage: null }
    makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    handleSignUp = () => {
        const { email, password } = this.state
        firebase()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                firestore().collection("user").doc(user.user.uid).set({
                    "name": this.makeid(6),
                    "followers": [],
                    "following": [],
                    "email": user.user.email
                })
                this.props.navigation.navigate('Home')
            })
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ "color": "red", fontSize: 20 }}>Sign Up</Text>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <View style={styles.space}></View>
                <View style={[{ width: "50%", margin: 10, backgroundColor: "red" }]}><Button title="Sign Up"
                    color="#FF3D00"
                    onPress={this.handleSignUp} /></View>
                <View style={styles.space}></View>
                <View style={[{ width: "90%", margin: 10 }]}>
                    <Button
                        title="Already have an account? Login"
                        color="blue"

                        onPress={() => this.props.navigation.navigate('Login')}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    },
    space: {
        margin: 20
    },
})