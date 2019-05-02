import React, { Component }       from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationEvents }       from 'react-navigation';

import ScreenContainer       from 'components/ScreenContainer';
import AuthenticationService from 'services/AuthenticationService';

import Colors                from 'utils/Colors';

export default class LoadingScreen extends React.Component {

  focusHandler = () => {
    console.log('LOADING SCREEN DID FOCUS!');

    AuthenticationService.getInstance().getToken().then(token => {
      console.log('====== Loading APP, token: ', token);
      if (token)
        this.props.navigation.navigate('Home');
      else
        this.props.navigation.navigate('LoginScreen');
    });
  };

  render() {
    return (
      <ScreenContainer loading={true} contentContainerStyle={styles.container}>
        <NavigationEvents onDidFocus={this.focusHandler} />
      </ScreenContainer>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
  },
});