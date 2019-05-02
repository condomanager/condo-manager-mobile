import React, { Component }       from 'react';
import { StyleSheet, View, Text } from 'react-native';

import ScreenContainer   from 'components/ScreenContainer';
import MainHeader        from 'components/MainHeader';
import { PrimaryButton } from 'components/Button';

export default class MyWhitelist extends React.Component {
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

  addWhitelisted = () => {};

  render() {
    const { loading, visits }  = this.state;
    const { navigation }       = this.props;

    return (
      <ScreenContainer loading={loading} stickyHeaderIndices={[0]}>
        <MainHeader navigation={navigation} title="Visitantes autorizados" rightIcon="plus-circle" onPressRightIcon={this.addWhitelisted} />

        <View style={styles.container}>
          <Text>Montar lista de vistantes autorizados, podendo adicionar novos, editar e remover cada um</Text>
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