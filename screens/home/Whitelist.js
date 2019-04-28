import React, { Component }       from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ScreenContainer from 'components/ScreenContainer';

export default class Whitelist extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Authorizações de entrada',
  };

  render() {
    return (
      <ScreenContainer>
        <View style={{flex: 1, borderWidth: 4, borderColor: '#F33'}}>
          <View style={{height: 20, width: '100%', backgroundColor: '#333'}} />
          <View style={{height: 20, width: '100%', backgroundColor: '#666'}} />
          <View style={{height: 20, width: '100%', backgroundColor: '#999'}} />
          <Text>Lista das visitas com entrada previamente autorizada</Text>
        </View>
      </ScreenContainer>
    );
  };
};

const styles = StyleSheet.create({
  container: {
  },
});