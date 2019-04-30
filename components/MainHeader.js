import React, { Component }                         from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Header }                                   from 'react-navigation';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Colors from 'utils/Colors';

export default class MyProfile extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Minhas visitas',
  };

  render() {
    const { navigation, title, subtitle, rightIcon, onPressRightIcon } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.lateralIconContainer} onPress={() => navigation && navigation.openDrawer()}>
          <FontAwesomeIcon size={22} icon="bars" color={Colors.WHITE} />
        </TouchableOpacity>

        <View style={styles.centerSpace}>
          {title && title.trim() && <Text style={styles.title}>{title}</Text>}
          {subtitle && subtitle.trim() && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        <TouchableOpacity style={styles.lateralIconContainer} onPress={onPressRightIcon}>
          {rightIcon && rightIcon.trim() && <FontAwesomeIcon size={22} icon={rightIcon} color={Colors.WHITE} />}
        </TouchableOpacity>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: Header.HEIGHT, 
    backgroundColor: Colors.PRIMARY,
    padding: 8,
  },

  lateralIconContainer: {
    width: (Header.HEIGHT - 16),
    height: (Header.HEIGHT - 16),
    alignItems: 'center',
    justifyContent: 'center',
  },

  centerSpace: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: Colors.WHITE,
    fontSize: 16,
  },

  subtitle: {
    color: Colors.WHITE,
    fontSize: 10,
  },
});