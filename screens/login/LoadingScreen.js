import React, { Component }       from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Colors              from 'utils/Colors';
import ScreenContainer     from 'components/ScreenContainer';
import AsyncStorageService from 'services/AsyncStorageService';

export default class LoadingScreen extends React.Component {

  async componentDidMount() {
    AsyncStorageService.get('authenticationToken').then((token, error) => {
      console.log('LOADING SCREEN', token, error);
      if (token)
        this.props.navigation.navigate('Home');
      else
        this.props.navigation.navigate('LoginScreen');
    });
  };

  render() {
    return (
      <ScreenContainer loading={true} contentContainerStyle={styles.container} />
    );
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
  },
});