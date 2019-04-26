import React, { Component }                            from 'react';
import { StyleSheet, KeyboardAvoidingView, StatusBar } from 'react-native';
import { SafeAreaView }                                from 'react-navigation';

import ScrollableView from './ScrollableView';

export default class ScreenContainer extends React.Component {
  static defaultProps = {
    scrollable: true,
    background: true,
  };

  render() {
    const { style, forceInset, scrollable, contentContainerStyle, ...containerViewProps } = this.props;
    let contentStyle = contentContainerStyle;

    const defaultInset = { bottom: 'never' };
    
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
});