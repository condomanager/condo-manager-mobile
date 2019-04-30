import React, { Component }                         from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import ScreenContainer       from 'components/ScreenContainer';
import ProfilePicture        from 'components/ProfilePicture';
import { PrimaryButton }     from 'components/Button';

import ProfileService        from 'services/ProfileService';
import AuthenticationService from 'services/AuthenticationService';

import { FontAwesomeIcon }   from '@fortawesome/react-native-fontawesome';

import Colors                from 'utils/Colors';

const navigate = (navigation, route) => {
  navigation.navigate(route);
  navigation.closeDrawer();
};

class MenuGroup extends React.Component {

  render() {
    const { title, children } = this.props;

    return (
      <View style={styles.groupContainer}>
        <Text style={styles.groupTitle}>{title}</Text>
        { children }
      </View>
    );
  };
};

class MenuOption extends React.Component {

  render() {
    const { navigation, currentRoute, route, icon, label } = this.props;
    const isActive = currentRoute.key == route;

    const containerStyle = isActive ? { ...styles.optionContainer, backgroundColor: Colors.EXTRA_LIGHT_TEXT } : styles.optionContainer;
    const textStyle = isActive ? {...styles.optionText, color: Colors.PRIMARY } : styles.optionText;

    return (
      <TouchableOpacity style={containerStyle} onPress={() => navigate(navigation, route)}>
        <FontAwesomeIcon size={18} icon={icon} color={textStyle.color} style={styles.optionIcon} />
        <Text style={textStyle}>{label}</Text>
        <FontAwesomeIcon size={14} icon="chevron-right" color={textStyle.color} style={styles.optionIconEnd} />
      </TouchableOpacity>
    );
  };
};

export default class Menu extends React.Component {

  state = { profile: {} };

  profileChangeListener = undefined;

  componentDidMount() {
    ProfileService.getInstance().getProfile().then(profile => this.setState({ profile }));

    this.profileChangeListener = ProfileService.getInstance().addListener('change', profile => this.setState({ profile }));
  };

  componentWillUnmount() {
    if (this.profileChangeListener)
      this.profileChangeListener.remove();
  };

  attemptLogout = () => {
    const { navigation } = this.props;

    AuthenticationService.getInstance().logout()
    .then(() => {
      navigation.navigate('Login');
    }).catch((error) => { 
      console.log('LOGOUT ERROR', error);
    });
  };

  render() {
    const { profile }    = this.state;
    const { navigation } = this.props;
    const currentRoute   = navigation.state.routes[navigation.state.index];

    return (
      <ScreenContainer>
        <View style={styles.itemsContainer}>
          <TouchableOpacity  style={styles.profileContainer} onPress={() => navigate(navigation, 'MyProfile')}>
            <ProfilePicture style={styles.profileIcon} size={60} />
            <View style={styles.profileDataContainer}>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profileData}>Morador</Text>
            </View>
            <FontAwesomeIcon size={14} icon="chevron-right" color={styles.profileName.color} style={styles.optionIconEnd} />
          </TouchableOpacity>

          <MenuGroup title="Visitas">
            <MenuOption navigation={navigation} currentRoute={currentRoute} route="Whitelist" icon="clipboard-check" label="Autorizações de visita" />
            <MenuOption navigation={navigation} currentRoute={currentRoute} route="MyVisits" icon="clipboard-list" label="Minhas visitas" />
          </MenuGroup>

          <MenuGroup title="Configurações">
            <MenuOption navigation={navigation} currentRoute={currentRoute} route="" icon="cogs" label="Configurações gerais" />
          </MenuGroup>
        </View>

        <PrimaryButton title="Sair" style={styles.button} onPress={this.attemptLogout} />
      </ScreenContainer>
    );
  };
};

const styles = StyleSheet.create({
  itemsContainer: {
    flex: 1, 
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
    padding: 16,
  },

  profileIcon: {
    marginRight: 16,
  },

  profileDataContainer: {
    flex: 1,
  },

  profileName: {
    fontSize: 18,
    color: Colors.WHITE,
  },

  profileData: {
    color: Colors.WHITE,
  },

  groupContainer: {
    borderColor: Colors.LIGHT_TEXT,
    borderTopWidth: 1,
  },

  groupTitle: {
    margin: 12,
    marginBottom: 4,
    fontSize: 14,
    color: Colors.DEFAULT_TEXT,
    opacity: 0.75,
  },

  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },

  optionIcon: {
    marginRight: 12,
  },

  optionText: {
    flex: 1,
    fontSize: 16,
    color: Colors.DEFAULT_TEXT,
  },

  optionIconEnd: {
    marginLeft: 8,
    opacity: 0.5,
  },

  button: {
    margin: 16,
  },
});