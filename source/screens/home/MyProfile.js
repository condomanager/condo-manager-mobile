import React, { Component }       from 'react';
import { StyleSheet, View, Text } from 'react-native';

import ScreenContainer                        from 'components/ScreenContainer';
import MainHeader                             from 'components/MainHeader';
import ProfilePicture                         from 'components/ProfilePicture';
import Separator                              from 'components/Separator';
import InputText                              from 'components/InputText';
import { PrimaryButton, SecondaryIconButton } from 'components/Button';
import { PrimaryLink }                        from 'components/Link';

import ProfileService from 'services/ProfileService';

import Colors from 'utils/Colors';

export default class MyProfile extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Meus dados',
  };

  constructor(props){
    super(props);

    this.state ={ 
      loading: true,
      profile: {
        phones: [{}],
      },
    };
  };

  componentDidMount() {
    ProfileService.getInstance().get()
    .then(this.setProfile)
    .catch((error) =>{
      console.error('ERROR:', error);
    });
  };

  setProfile = (profile) => {
    if (profile && !profile.phones)
      profile.phones = [{}];

    this.setState({
      loading: false,
      profile: profile,
    });
  };

  addPhone = () => {
    this.setState(state => {
      state.profile.phones.push({});
      return state;
    });
  };

  removePhone = (index) => {
    this.setState(state => {
      state.profile.phones.splice(index, 1);
      if (!state.profile.phones.length)
        state.profile.phones.push({});
      return state;
    });
  };

  save = () => {
    const { profile } = this.state;

    this.setState({
      loading: true,
    });

    ProfileService.getInstance().update(profile)
    .then(this.setProfile)
    .catch((error) =>{
      console.error('ERROR:', error);
    });
  };

  render() {
    const { loading, profile } = this.state;
    const { navigation }       = this.props;

    return (
      <ScreenContainer loading={loading} stickyHeaderIndices={[0]}>
        <MainHeader navigation={navigation} title="Meus dados" />

        <View style={styles.container}>
          <View style={styles.profilePictureContainer}>
            <ProfilePicture />
          </View>

          <InputText 
            style={styles.input}
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
            style={styles.input}
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

          <Separator text="DADOS DE CONTATO" style={styles.input} />

          <InputText 
            style={styles.input}
            textContentType="emailAddress" 
            keyboardType="email-address" 
            label="Endereço de e-mail" 
            leftIcon="at"
            placeholder="Informe o seu e-mail" 
            value={profile.email}
            onChangeText={(text) => this.setState(state => {
              state.profile.email = text;
              return state;
            })}
          />

          {profile.phones.map((phone, index) => {
            return <View style={[styles.phoneContainer, styles.input]} key={index}>
              <InputText 
                style={styles.phoneInput}
                textContentType="telephoneNumber" 
                keyboardType="number-pad" 
                label={'Telefone para contato ' + (index + 1)} 
                leftIcon="phone"
                placeholder="Informe o número do telefone" 
                value={phone.number}
                onChangeText={(text) => this.setState(state => {
                  phone.number = text;
                  return state;
                })}
              />
              <SecondaryIconButton icon="trash-alt" style={styles.deleteButton} onPress={() => this.removePhone(index)} /> 
            </View>
          })}

          <PrimaryLink text="Adicionar outro telefone" style={styles.input} onPress={() => this.addPhone()} /> 

          <PrimaryButton title="Salvar" onPress={this.save} />
        </View>
      </ScreenContainer> 
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  profilePictureContainer: {
    alignSelf: 'stretch',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
  },

  input: {
    marginBottom: 24,
  },

  phoneInput: {
    flex: 1,
    marginRight: 12
  },

  phoneContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  deleteButton: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
});