import React, { Component }                                                     from 'react';
import { StyleSheet, View, KeyboardAvoidingView, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView }                                                         from 'react-navigation';

import ScrollableView from './ScrollableView';

import Colors from 'utils/Colors';

export default class ScreenContainer extends React.Component {
  static defaultProps = {
    scrollable: true,
    loading:    false,
  };

  render() {
    const { style, scrollable, contentContainerStyle, loading, ...containerViewProps } = this.props;
    let contentStyle = contentContainerStyle;
    
    return (
      <KeyboardAvoidingView behavior="padding" style={[styles.flexContainer, style, styles.mainContainer]}>
        <StatusBar barStyle="light-content" />

        {scrollable && (
          <ScrollableView contentContainerStyle={[styles.contentContainer, contentStyle]} {...containerViewProps}>
            {this.props.children}
          </ScrollableView>
        )}

        {!scrollable && (
          <View style={[styles.flexContainer, styles.contentContainer, contentStyle]} {...containerViewProps}>
            {this.props.children}
          </View>
        )}

        {loading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingOverlayBackground} />
            <ActivityIndicator size="large" color={Colors.WHITE} />
          </View>
        )}
      </KeyboardAvoidingView>
    );
  };
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },

  mainContainer: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#66F',
  },

  contentContainer: {
    backgroundColor: '#FFF',
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingOverlayBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.PRIMARY,
    opacity: 0.85,
  },
});