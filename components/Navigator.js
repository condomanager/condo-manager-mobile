import React, { Component }                                                             from 'react';
import { StyleSheet, View }                                                             from 'react-native';
import { createAppContainer, createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';

import Menu                  from 'components/Menu';
import AuthenticationService from 'services/AuthenticationService';

export function createCustomStackNavigator (navigatorRoutes, navigatorConfig) {
  const Navigator = createStackNavigator(navigatorRoutes, navigatorConfig);
  return createAppContainer(Navigator);
};

export function createCustomDrawerNavigator (navigatorRoutes, navigatorConfig = {}) {

  const contentComponent = (props) => <Menu navigation={props.navigation} />;

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