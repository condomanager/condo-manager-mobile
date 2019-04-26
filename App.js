import React, { Component }                          from 'react';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';

import ScreenContainer from './components/ScreenContainer';
import MyProfile       from './screens/MyProfile';
import MyVisits        from './screens/MyVisits';
import Whitelist       from './screens/Whitelist';

const MainDrawerNavigator = createDrawerNavigator({  
  MyProfile: {
    screen: MyProfile,
  },
  MyVisits: {
    screen: MyVisits,
  },
  Whitelist: {
    screen: Whitelist,
  },
});
const MainDrawerNavigatorContainer = createAppContainer(MainDrawerNavigator);

export default MainDrawerNavigatorContainer;
/*
export default class App extends React.Component {
  render() {
    return (
      <ScreenContainer>
        <MainDrawerNavigatorContainer />
      </ScreenContainer>
    );
  }
};
*/