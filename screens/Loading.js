import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from '@react-native-firebase/auth'

export default class Loading extends React.Component {
  componentDidMount() {
    firebase().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? 'Home' : 'Login')
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})