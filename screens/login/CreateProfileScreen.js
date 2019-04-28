import React, { Component }       from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Colors from 'utils/Colors';

import { PrimaryButton, SecondaryButton } from 'components/Button';
import { PrimaryLink, SecondaryLink } from 'components/Link';

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Criação de novo perfil</Text>
        <SecondaryButton title="Criar" />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
    padding: 32,
  },

  text: {
    fontSize: 24,
    color: Colors.WHITE,
  }
});