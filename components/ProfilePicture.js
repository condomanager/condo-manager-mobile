import React, { Component }        from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Colors from 'utils/Colors';

export default class InputText extends React.Component {
  static defaultProps = {
    size: 100,
    borderWidth: 2,
  };

  render() {
    const { size, borderWidth, style, ...otherProps } = this.props;

    const optimalSize = size - borderWidth;
    const sizeStyle   = {width: optimalSize, height: optimalSize};
    const borderStyle = {borderRadius: (optimalSize / 2), borderWidth};

    return (
      <View style={[styles.container, style, sizeStyle, borderStyle]} {...otherProps}>
        {/*<Image source={require('./generic-profile-picture.png')} style={sizeStyle} />*/}
        <FontAwesomeIcon size={optimalSize} icon="user" color={Colors.LIGHT_TEXT} />
      </View> 
    );
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.LIGHT_TEXT,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});