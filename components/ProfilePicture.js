import React, { Component }        from 'react';
import { StyleSheet, View, Image } from 'react-native';

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
        <Image source={require('./generic-profile-picture.png')} style={sizeStyle} />
      </View> 
    );
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFEF',
    borderColor: '#CCC',
    overflow: 'hidden',
  },
});