import React, { Component }       from 'react';
import { StyleSheet, ScrollView } from 'react-native'

export default class ScrollableView extends React.Component {  
  state = {
    scrollable:      false,
    containerHeight: null,
    contentHeight:   null,
  };

  _scrollView = null;

  _shouldEnableScroll = (containerHeight, contentHeight) => {
    const enableScroll = containerHeight < contentHeight;

    if ((this.state.scrollable && !enableScroll) && this._scrollView)
      this._scrollView.scrollTo({x: 0, y: 0});

    return enableScroll;
  };

  _handleLayoutEvent = (event) => {
    const { height } = event.nativeEvent.layout;

    if (this.state.containerHeight !== height) {
      const scrollable = this._shouldEnableScroll(height, this.state.contentHeight);
      this.setState({ containerHeight: height, scrollable });
    }
  };

  _handleContentSizeChangeEvent = (width, height) => {
    if (this.state.contentHeight !== height) {
      const scrollable = this._shouldEnableScroll(this.state.containerHeight, height);
      this.setState({ contentHeight: height, scrollable });
    }
  };

  render() {
    const { children, contentContainerStyle, ...scrollViewProps } = this.props;
    const { scrollable } = this.state;

    return (
      <ScrollView 
        {...scrollViewProps}
        ref={ref => this._scrollView = ref}
        horizontal={false}
        scrollEnabled={scrollable}
        onLayout={this._handleLayoutEvent}
        onContentSizeChange={this._handleContentSizeChangeEvent}
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      >
        {children}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
});