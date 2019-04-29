import React, { Component }       from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Colors                from 'utils/Colors';

import ScreenContainer       from 'components/ScreenContainer';
import InputText             from 'components/InputText';
import { SecondaryButton }   from 'components/Button';
import { SecondaryLink }     from 'components/Link';

import AuthenticationService from 'services/AuthenticationService';
import AsyncStorageService from 'services/AsyncStorageService';

export default class CreateProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile:        {},
      loading:        false,
      loadingMessage: undefined,
      error:          undefined,
    };
  };

  attemptAuthentication = () => {
    const { profile } = this.state;

    this.setState({ loading: true, error: undefined, loadingMessage: 'Criando seu novo perfil...' });

    AuthenticationService.login(profile).then((token) => {
      if (token) {
        this.setState({ loading: false });
        this.props.navigation.navigate('Home');
      }
    }).catch((error) => {
      this.setState({ loading: false, error });
    });
  };

  render() {
    const { loading, loadingMessage, error, profile } = this.state;

    return (
      <ScreenContainer loading={loading} loadingMessage={loadingMessage} contentContainerStyle={styles.container}>
        
        {error && <Text style={styles.error}>{error.title}</Text>}

        <InputText 
          style={styles.inputContainer}
          inputStyle={styles.input}
          textContentType="name"
          placeholder="Informe seu name" 
          value={profile.name}
          onChangeText={(text) => this.setState(state => {
            state.profile.name = text;
            return state;
          })}
        />

        <InputText 
          style={styles.inputContainer}
          inputStyle={styles.input}
          textContentType="username"
          keyboardType="number-pad" 
          maxLength={11}
          placeholder="Informe seu CPF" 
          value={profile.username}
          onChangeText={(text) => this.setState(state => {
            state.profile.username = text;
            return state;
          })}
        />

        <InputText 
          style={styles.inputContainer} 
          inputStyle={styles.input} 
          textContentType="password" 
          secureTextEntry={true} 
          placeholder="Informe sua senha" 
          value={profile.password}
          onChangeText={(text) => this.setState(state => {
            state.profile.password = text;
            return state;
          })}
        />

        <SecondaryButton title="Criar meu perfil" onPress={this.attemptAuthentication} />
        <SecondaryLink text="Cancelar" style={styles.link} onPress={() => this.props.navigation.goBack()} />
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