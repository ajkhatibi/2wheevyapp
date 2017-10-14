import React from 'react';
import {View} from 'react-native';
import Login from './src/screens/Login.js';
import Profile from './src/screens/Profile.js';
import Register from './src/screens/Register.js';
import {Navigator} from 'react-native-deprecated-custom-components';

export default class App extends React.Component {
  constructor() {
    super()
    this.navigatorRenderScene = this
      .navigatorRenderScene
      .bind(this);
  }

  render() {
    return (
      <Navigator 
        initialRoute={{name: 'Login'}}
        renderScene={this.navigatorRenderScene}
        />
      );
  }

  navigatorRenderScene(route, navigator) {
    switch (route.name) {
      case 'Login':
        return (<Login navigator={navigator}/>)
      case 'Profile':
        return (<Profile navigator={navigator}/>)
      case 'Register':
        return (<Register navigator={navigator}/>)
    }
  }
}
