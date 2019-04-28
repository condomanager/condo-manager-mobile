import React, { Component }           from 'react';

import { createCustomStackNavigator } from 'components/Navigator';

import Login from 'screens/login/';
import Home  from 'screens/home/';

const navigatorRoutes = {
  Login: { screen: Login },
  Home:  { screen: Home },
};

const navigatorConfig = {
  defaultNavigationOptions: { header: null },
};

export default createCustomStackNavigator(navigatorRoutes, navigatorConfig);