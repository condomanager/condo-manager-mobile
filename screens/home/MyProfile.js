import React, { Component }       from 'react';
import { StyleSheet, View, ActivityIndicator, Button } from 'react-native';
import { Header } from 'react-navigation';

import ScreenContainer   from 'components/ScreenContainer';
import ProfilePicture    from 'components/ProfilePicture';
import InputText         from 'components/InputText';
import { PrimaryButton } from 'components/Button';

import ProfileService  from 'services/ProfileService';

export default class MyProfile extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Meus dados',
  };

  constructor(props){
    super(props);

    this.state ={ 
      loading: true,
      profile: {},
    };
  };

  componentDidMount() {
    ProfileService.getInstance().getProfile().then(response => {
      this.setState({
        loading: false,
        profile: response,
      });
    }).catch((error) =>{
      console.error('ERROR:', error);
    });
  };

  save = () => {
    const { profile } = this.state;

    this.setState({
      loading: true,
    });
  };

  render() {
    const { loading, profile } = this.state;

    return (
      <ScreenContainer loading={loading} contentContainerStyle={styles.container}>
        <View style={styles.profilePictureContainer}>
          <ProfilePicture size={200} />
        </View>

        <InputText 
          style={styles.inputContainer}
          textContentType="name" 
          label="Nome" 
          leftIcon="user"
          placeholder="Informe seu nome" 
          value={profile.name}
          onChangeText={(text) => this.setState(state => {
            state.profile.name = text;
            return state;
          })}
        />
        
        <InputText 
          style={styles.inputContainer}
          textContentType="emailAddress" 
          keyboardType="email-address" 
          label="Endereço de e-mail" 
          leftIcon="at"
          placeholder="Informe seu e-mail" 
          value={profile.email}
          onChangeText={(text) => this.setState(state => {
            state.profile.email = text;
            return state;
          })}
        />
        
        <InputText 
          style={styles.inputContainer}
          keyboardType="number-pad" 
          label="CPF" 
          leftIcon="id-card" 
          placeholder="Informe seu CPF" 
          value={profile.cpf}
          onChangeText={(text) => this.setState(state => {
            state.profile.cpf = text;
            return state;
          })}
        />

        <PrimaryButton title="Salvar" onPress={this.save} />
      </ScreenContainer> 
    );
  };
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },

  profilePictureContainer: {
    alignSelf: 'stretch',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputContainer: {
    marginBottom: 24,
  },
});