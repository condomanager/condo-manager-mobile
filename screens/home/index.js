import React, { Component }            from 'react';

import { createCustomDrawerNavigator } from 'components/Navigator';

import MyProfile       from './MyProfile';
import MyVisits        from './MyVisits';
import Whitelist       from './Whitelist';

const navigatorRoutes = {
  MyProfile: { screen: MyProfile },
  MyVisits:  { screen: MyVisits },
  Whitelist: { screen: Whitelist },
};

export default createCustomDrawerNavigator(navigatorRoutes);