import React, { Component }       from 'react';
import { StyleSheet, View, ActivityIndicator, Button } from 'react-native';
import { Header } from 'react-navigation';

import ScreenContainer from 'components/ScreenContainer';
import MainHeader      from 'components/MainHeader';
import ProfilePicture  from 'components/ProfilePicture';
import InputText       from 'components/InputText';

import HTTPService     from 'services/HTTPService';
import ProfileService  from 'services/ProfileService';

export default class MyProfile extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Meus dados',
  };

  constructor(props){
    super(props);

    this.state ={ 
      isLoading: true,
      profile:   false,
    };
  };

  componentDidMount() {
    ProfileService.getInstance().getProfile().then(response => {
      this.setState({
        isLoading: false,
        profile: response,
      });
    }).catch((error) =>{
      console.error('ERROR:', error);
    });
  };

  save = () => {
    const { profile } = this.state;

    this.setState({
      isLoading: true,
    });

    HTTPService.saveProfile(profile).then((responseJson) => {
      this.setState({
        isLoading: false,
        profile: responseJson,
      });
    }).catch((error) =>{
      console.error('ERROR:', error);
    });
  };

  render() {
    const { isLoading, profile } = this.state;

    if (isLoading)
      return (
        <ScreenContainer>
          <MainHeader navigation={this.props.navigation} />
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator/>
          </View>
        </ScreenContainer>
      );
    else
      return (
        <ScreenContainer>
          <MainHeader navigation={this.props.navigation} />
          
          <View style={styles.profilePictureContainer}>
            <ProfilePicture size={200} />
          </View>

          <InputText 
            textContentType="name" 
            label="Nome" 
            placeholder="Informe seu nome" 
            value={profile.name}
            onChangeText={(text) => this.setState(state => {
              state.profile.name = text;
              return state;
            })}
          />
          
          <InputText 
            textContentType="emailAddress" 
            keyboardType="email-address" 
            label="Endereço de e-mail" 
            placeholder="Informe seu e-mail" 
            value={profile.email}
            onChangeText={(text) => this.setState(state => {
              state.profile.email = text;
              return state;
            })}
          />
          
          <InputText 
            keyboardType="number-pad" 
            label="CPF" 
            placeholder="Informe seu CPF" 
            value={profile.cpf}
            onChangeText={(text) => this.setState(state => {
              state.profile.cpf = text;
              return state;
            })}
          />

          <Button title="Salvar" onPress={this.save} />
        </ScreenContainer> 
      );
  };
};

const styles = StyleSheet.create({
  profilePictureContainer: {
    alignSelf: 'stretch',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});