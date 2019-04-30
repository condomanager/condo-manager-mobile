import React, { Component }       from 'react';
import { StyleSheet, View, Text } from 'react-native';

import ScreenContainer   from 'components/ScreenContainer';
import MainHeader        from 'components/MainHeader';
import { PrimaryButton } from 'components/Button';

export default class MyVisits extends React.Component {
  constructor(props){
    super(props);

    this.state ={ 
      loading: true,
      visits:  [],
    };
  };

  componentDidMount() {
    this.setState({
      loading: false,
    });
  };

  render() {
    const { loading, visits }  = this.state;
    const { navigation }       = this.props;

    return (
      <ScreenContainer loading={loading} stickyHeaderIndices={[0]}>
        <MainHeader navigation={navigation} title="Minhas visitas" />

        <View style={styles.container}>
          <Text>Lista de visitas</Text>
        </View>
      </ScreenContainer> 
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});