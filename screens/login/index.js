import React, { Component }           from 'react';

import { createCustomStackNavigator } from 'components/Navigator';

import LoadingScreen         from './LoadingScreen';
import LoginScreen         from './LoginScreen';
import CreateProfileScreen from './CreateProfileScreen';

const navigatorRoutes = {
  LoadingScreen: {
    screen: LoadingScreen,
  },
  LoginScreen: {
    screen: LoginScreen,
  },
  CreateProfileScreen: {
    screen: CreateProfileScreen,
  },
};

const navigatorConfig = {
  defaultNavigationOptions: { header: null },
};

export default createCustomStackNavigator(navigatorRoutes, navigatorConfig);