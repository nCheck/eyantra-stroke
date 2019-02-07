import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { Font } from 'expo'; 
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen'
import UploadScreen from './screens/UploadScreen';



const MainCon = createStackNavigator(

  {
    Home : { screen : HomeScreen },
    Login : { screen : LoginScreen },
    Upload : { screen : UploadScreen }
  },
  {
    initialRouteName : 'Login'

}

)

const MainNav = createAppContainer( MainCon );




export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loaded : false
    };
  }


  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState( { loaded : true } );
  }


  render()  {
    if ( this.state.loaded ){

      return (
        <MainNav/>
    );

    }
    else{

      return (
        <View/>
    );

    }

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
