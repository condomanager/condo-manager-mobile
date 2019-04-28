import React, { Component }                                                             from 'react';
import { StyleSheet, View }                                                             from 'react-native';
import { createAppContainer, createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';

import ScreenContainer       from 'components/ScreenContainer';
import { PrimaryButton }     from 'components/Button';
import AuthenticationService from 'services/AuthenticationService';

export function createCustomStackNavigator (navigatorRoutes, navigatorConfig) {
  const Navigator = createStackNavigator(navigatorRoutes, navigatorConfig);
  return createAppContainer(Navigator);
};

export function createCustomDrawerNavigator (navigatorRoutes, navigatorConfig = {}) {

  const contentComponent = (props) => {
    attemptLogout = () => {
      AuthenticationService.logout().then(() => {
        props.navigation.navigate('Login');
        console.log('LOGOUT SUCCESS');
      }).catch((error) => { 
        console.log('LOGOUT ERROR', error);
        props.navigation.navigate('Login');
      });
    };

    return (
      <ScreenContainer>
        <View style={styles.itemsContainer}>
          <DrawerItems {...props} />
        </View>
        <PrimaryButton title="Sair" style={styles.button} onPress={attemptLogout} />
      </ScreenContainer>
    );
  };

  const Navigator = createDrawerNavigator(navigatorRoutes, { contentComponent, ...navigatorConfig });
  return createAppContainer(Navigator);
};

const styles = StyleSheet.create({
  itemsContainer: {
    flex: 1, 
  },

  button: {
    margin: 16,
  },
});