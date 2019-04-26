import React, { Component }       from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Header } from 'react-navigation';

import ScreenContainer from '../components/ScreenContainer';
import ScrollableView  from '../components/ScrollableView';

export default class MyProfile extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Meus dados',
  };

  render() {
    return (
      <ScreenContainer contentContainerStyle={{borderWidth: 4, borderColor: '#3F3'}}>
          <View style={{flex: 1, backgroundColor: '#333'}} />
          <View style={{flex: 1, backgroundColor: '#666'}} />
          <View style={{flex: 1, backgroundColor: '#999'}} />
          <TextInput placeholder="Texto 9"/>
          <View style={{height: 15, width: '100%', backgroundColor: '#999'}} />
      </ScreenContainer> 
    );
  };
};

const styles = StyleSheet.create({
  container: {
  },
});