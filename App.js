import React, { Component }           from 'react';
import { createCustomStackNavigator } from 'components/Navigator';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab }     from '@fortawesome/free-brands-svg-icons';
import { fas }     from '@fortawesome/free-solid-svg-icons';
import { far }     from '@fortawesome/free-regular-svg-icons';

import Login from 'screens/login/';
import Home  from 'screens/home/';

library.add(fas, fab, far);

const navigatorRoutes = {
  Login: { screen: Login },
  Home:  { screen: Home },
};

const navigatorConfig = {
  defaultNavigationOptions: { header: null },
};

export default createCustomStackNavigator(navigatorRoutes, navigatorConfig);