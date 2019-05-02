import React, { Component }       from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Colors from 'utils/Colors';

export default class Separator extends React.Component {
  render() {
    const { style, textStyle, text } = this.props;

    return (
      <View style={[styles.container, style]}>
        <View style={styles.line} />
        {text && text.length && <Text style={[styles.text, textStyle]}>{text}</Text>}
        <View style={styles.line} />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.LIGHT_TEXT,
  },

  text: {
    marginHorizontal: 12,
    fontSize: 14,
    color: Colors.LIGHT_TEXT,
  },
});