import React, { Component }                  from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Colors from 'utils/Colors';

export default class InputText extends React.Component {
  render() {
    const { label, leftIcon, rightIcon, style, labelStyle, inputStyle, ...inputProps } = this.props;

    return (
      <View style={[styles.container, style]}>
        {label && label.trim() && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        <View style={[styles.inputContainer, inputStyle]}>
          {leftIcon && <FontAwesomeIcon size={16} icon={leftIcon} color={styles.input.color} style={styles.leftIcon} />}
          <TextInput style={styles.input} {...inputProps} />
          {rightIcon && <FontAwesomeIcon size={16} icon={rightIcon} color={styles.input.color} style={styles.rightIcon} />}
        </View>
      </View> 
    );
  };
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },

  label: {
    fontSize: 14,
    color: '#CCC',
  },

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 4,
    backgroundColor: Colors.WHITE,
    overflow: 'hidden',
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },

  leftIcon: {
    marginRight: 8,
  },

  rightIcon: {
    marginLeft: 8,
  },
});