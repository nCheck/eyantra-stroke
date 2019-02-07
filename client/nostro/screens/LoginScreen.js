import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up Login to start working on your app!</Text>
        <Button
        onPress={ ()=> this.props.navigation.navigate('Home') }
        title="Login"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});