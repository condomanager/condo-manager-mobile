import React, { Component }           from 'react';
import {Platform}                     from 'react-native'
import { createCustomStackNavigator } from 'components/Navigator';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab }     from '@fortawesome/free-brands-svg-icons';
import { fas }     from '@fortawesome/free-solid-svg-icons';
import { far }     from '@fortawesome/free-regular-svg-icons';

import Login from 'screens/login/';
import Home  from 'screens/home/';

// Config Intl Polyfill https://github.com/andyearnshaw/Intl.js
if(Platform.OS === 'android') { // only android needs polyfill
  require('intl'); // import intl object
  require('intl/locale-data/jsonp/pt-BR'); // load the required locale details
  Intl.__disableRegExpRestore(); // for syntaxerror invalid regular expression unmatched parentheses
}

library.add(fas, fab, far);

const navigatorRoutes = {
  Login: { screen: Login },
  Home:  { screen: Home },
};

const navigatorConfig = {
  defaultNavigationOptions: { header: null },
};

export default createCustomStackNavigator(navigatorRoutes, navigatorConfig);