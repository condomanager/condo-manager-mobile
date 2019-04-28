import React, { Component }       from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Colors                from 'utils/Colors';

import ScreenContainer       from 'components/ScreenContainer';
import InputText             from 'components/InputText';
import { SecondaryButton }   from 'components/Button';
import { SecondaryLink }     from 'components/Link';

import AuthenticationService from 'services/AuthenticationService';
import AsyncStorageService from 'services/AsyncStorageService';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {},
      error:       undefined,
    };
  };

  attemptAuthentication = () => {
    const { credentials } = this.state;

    this.setState({ loading: true, error: undefined });

    AuthenticationService.login(credentials).then((token) => {
      if (token) {
        this.setState({ loading: false });
        this.props.navigation.navigate('Home');
      }
    }).catch((error) => {
      this.setState({ loading: false, error });
    });
  };

  goToCreateProfileScreen = () => {
    this.props.navigation.navigate('CreateProfileScreen');
  };

  render() {
    const { loading, error, credentials } = this.state;

    return (
      <ScreenContainer loading={loading} contentContainerStyle={styles.container}>
        
        {error && <Text style={styles.error}>{error.title}</Text>}

        <InputText 
          style={styles.inputContainer}
          inputStyle={styles.input}
          textContentType="username"
          keyboardType="number-pad" 
          maxLength={11}
          placeholder="Informe seu CPF" 
          value={credentials.username}
          onChangeText={(text) => this.setState(state => {
            state.credentials.username = text;
            return state;
          })}
        />

        <InputText 
          style={styles.inputContainer} 
          inputStyle={styles.input} 
          textContentType="password" 
          secureTextEntry={true} 
          placeholder="Informe sua senha" 
          value={credentials.password}
          onChangeText={(text) => this.setState(state => {
            state.credentials.password = text;
            return state;
          })}
        />

        <SecondaryButton title="Entrar" onPress={this.attemptAuthentication} />
        <SecondaryLink text="Ainda não tenho cadastro" style={styles.link} onPress={this.goToCreateProfileScreen} />
      </ScreenContainer>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
    padding: 32,
  },

  error: {
    color: Colors.WHITE,
    opacity: 0.5,
  },

  inputContainer: {
    marginBottom: 32,
  },

  input: {
    borderWidth: 0,
  },

  link: {
    margin: 16,
  }
});