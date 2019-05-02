import React, { Component }                         from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Colors from 'utils/Colors';

class RoundedButton extends React.Component {
  render() {
    const { title, style, titleStyle, ...otherProps } = this.props;

    return (
      <TouchableOpacity style={[styles.roundedButtonContainer, style]} {...otherProps}>
        <Text style={[styles.roundedButtonTitle, titleStyle]}>{title}</Text>
      </TouchableOpacity> 
    );
  };
};

class IconButton extends React.Component {
  render() {
    const { icon, iconColor, iconStyle, style, ...otherProps } = this.props;

    return (
      <TouchableOpacity style={[styles.iconButtonContainer, style]} {...otherProps}>
        <FontAwesomeIcon size={20} icon={icon} color={iconColor} style={iconStyle} />
      </TouchableOpacity> 
    );
  };
};

export class PrimaryButton extends React.Component {
  render() {
    const { style, titleStyle, ...otherProps } = this.props;

    return(
      <RoundedButton style={[styles.primaryContainer, style]} titleStyle={[styles.primaryTitle, titleStyle]} {...otherProps} />
    );
  };
};

export class SecondaryButton extends React.Component {
  render() {
    const { style, titleStyle, ...otherProps } = this.props;

    return(
      <RoundedButton style={[styles.secondaryContainer, style]} titleStyle={[styles.secondaryTitle, titleStyle]} {...otherProps} />
    );
  };
};

export class PrimaryIconButton extends React.Component {
  render() {
    const { style, ...otherProps } = this.props;

    return(
      <IconButton style={[styles.primaryContainer, style]} iconColor={styles.primaryTitle.color} {...otherProps} />
    );
  };
};

export class SecondaryIconButton extends React.Component {
  render() {
    const { style, ...otherProps } = this.props;

    return(
      <IconButton style={[styles.secondaryContainer, style]} iconColor={styles.secondaryTitle.color} {...otherProps} />
    );
  };
};

const BUTTON_HEIGHT = 50;

const shadow = {  
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

const styles = StyleSheet.create({
  roundedButtonContainer: {
    height: BUTTON_HEIGHT,
    alignSelf: 'stretch',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //borderWidth: 1,
    borderRadius: (BUTTON_HEIGHT / 2),
    ...shadow,
  },

  iconButtonContainer: {
    height: 44,
    width: 44,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },

  roundedButtonTitle: {
    paddingHorizontal: (BUTTON_HEIGHT / 2),
    fontSize: 20,
    textAlign: 'center',
    color: Colors.WHITE,
  },

  primaryContainer: {
    backgroundColor: Colors.PRIMARY,
    borderColor:     Colors.WHITE, 
  },  

  primaryTitle: {
    color: Colors.WHITE, 
  },

  secondaryContainer: {
    backgroundColor: Colors.WHITE,
    borderColor:     Colors.PRIMARY, 
  },  

  secondaryTitle: {
    color: Colors.PRIMARY, 
  },
});