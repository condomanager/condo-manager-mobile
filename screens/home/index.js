import React, { Component }            from 'react';

import { createCustomDrawerNavigator } from 'components/Navigator';

import MyVisits        from './MyVisits';
import Whitelist       from './Whitelist';
import MyProfile       from './MyProfile';

const navigatorRoutes = {
  MyVisits:  { screen: MyVisits },
  Whitelist: { screen: Whitelist },
  MyProfile: { screen: MyProfile },
};

export default createCustomDrawerNavigator(navigatorRoutes);