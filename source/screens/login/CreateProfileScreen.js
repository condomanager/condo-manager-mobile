import React, { Component }       from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Colors                from 'utils/Colors';

import ScreenContainer       from 'components/ScreenContainer';
import InputText             from 'components/InputText';
import { SecondaryButton }   from 'components/Button';
import { SecondaryLink }     from 'components/Link';

import ProfileService        from 'services/ProfileService';
import AuthenticationService from 'services/AuthenticationService';

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

    ProfileService.getInstance().create(profile)
    .then(createdProfile => {
      this.setState({ loadingMessage: 'Autenticando, aguarde...'});
      return AuthenticationService.getInstance().login({username: profile.cpf, password: profile.password})
      .then((token) => {
        this.setState({ loading: false });
        this.props.navigation.navigate('Home');
      });
    })
    .catch((error) => {
      this.setState({ loading: false, error });
    });
  };

  render() {
    const { loading, loadingMessage, error, profile } = this.state;

    return (
      <ScreenContainer loading={loading} loadingMessage={loadingMessage} contentContainerStyle={styles.container}>
        
        {error && <Text style={styles.error}>{error}</Text>}

        <InputText 
          style={styles.inputContainer} 
          inputStyle={styles.input} 
          textContentType="name" 
          leftIcon="user" 
          placeholder="Informe o seu nome" 
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
          leftIcon="id-card" 
          placeholder="Informe o seu CPF" 
          value={profile.cpf}
          onChangeText={(text) => this.setState(state => {
            state.profile.cpf = text;
            return state;
          })}
        />

        <InputText 
          style={styles.inputContainer} 
          inputStyle={styles.input} 
          textContentType="password" 
          secureTextEntry={true} 
          leftIcon="lock" 
          placeholder="Informe a sua senha" 
          value={profile.password}
          onChangeText={(text) => this.setState(state => {
            state.profile.password = text;
            return state;
          })}
        />

        <SecondaryButton title="Criar meu cadastro" onPress={this.attemptAuthentication} />
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