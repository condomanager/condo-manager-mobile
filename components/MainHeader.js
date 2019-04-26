import React, { Component }         from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Header }                   from 'react-navigation';

export default class MyProfile extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Minhas visitas',
  };

  render() {
    return (
      <View style={{height: Header.HEIGHT, width: '100%', backgroundColor: '#66F'}}>
        <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
          <Text>Menu</Text>
        </TouchableOpacity>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  
});