import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from '@react-native-firebase/auth'


export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  handleLogin = () => {
    const { email, password } = this.state
    firebase()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style = {{"color":"red",fontSize: 20}}>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <View style = {styles.space}></View>
        <View style={[{ width: "50%", margin: 10, backgroundColor: "red" }]}>
          <Button
            onPress={this.handleLogin}
            title="Login"
            color="#FF3D00"
          />
        </View> 
        <View style = {styles.space}></View>
        <View style={[{ width: "90%", margin: 10}]}>
          <Button
            onPress={() => this.props.navigation.navigate('SignUp')}
            title="Don't have an account? Sign Up"
            color="blue"
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
    alignItems: 'center',
    marginVertical:50
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
  ,
  signUp:{
    marginTop:50,
    position: 'relative',
    top:100
  },
  space:{
      margin:20
  },
  login:{
      width:100
  }
})