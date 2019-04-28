import React, { Component }                         from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import Colors from 'utils/Colors';

class BasicLink extends React.Component {
  static defaultProps = {
    size: 100,
    borderWidth: 2,
  };

  render() {
    const { text, style, containerStyle, ...otherProps } = this.props;

    return (
      <TouchableOpacity style={[styles.basicLinkContainer, containerStyle]} {...otherProps}>
        <Text style={[styles.linkText, style]}>{text}</Text>
      </TouchableOpacity> 
    );
  };
};

export class PrimaryLink extends React.Component {
  render() {
    const { style, ...otherProps } = this.props;

    return(
      <BasicLink style={[styles.primaryText, style]} {...otherProps} />
    );
  };
};

export class SecondaryLink extends React.Component {
  render() {
    const { style, ...otherProps } = this.props;

    return(
      <BasicLink style={[styles.secondaryText, style]} {...otherProps} />
    );
  };
};

const styles = StyleSheet.create({
  basicLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  linkText: {
    paddingHorizontal: 4,
    fontSize: 16,
    textAlign: 'center',
  },

  primaryText: {
    color: Colors.PRIMARY, 
  },

  secondaryText: {
    color: Colors.WHITE, 
  },
});