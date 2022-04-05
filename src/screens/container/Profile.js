import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native';
import React, { Component, } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loaded: true
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('@Users').then((user) => {
      console.log(user);
      this.setState({ user: JSON.parse(user), loaded: false });
    });
  }

  render() {
    if (this.state.loaded) {
      return (
        <View><Text>Cargando...</Text></View>
      );
    }
    return (
      <ImageBackground  source={this.state.user.urlbakground}
             style={styles.profileBackground}>
        <View/>
        <Image source={this.state.user.avatar}
               style={styles.avatar}/>
        <Text style={styles.nameText}>
          {this.state.user.nombre}
        </Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  profileBackground: {
    width: null,
    height: 220,
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center'
  },
  nameText: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingLeft: 20,
    paddingVertical: 5,
    fontSize: 32,
    color: 'white'
  }
});
