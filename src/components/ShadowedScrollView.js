// @flow
import React from "react";
import { StyleSheet, ScrollView, View, Animated } from "react-native";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { blackColor } from "../constants/colors";

type Props = {
  children: Array<Object>,
  style: StyleObj
};

type State = {
  topShadowOpacity: number,
  bottomShadowOpacity: number
};

const maxShadowOpacity = 1;

class ShadowedScrollView extends React.PureComponent<Props, State> {
  componentWillMount() {
    this.topShadowAnimatedOpacity = new Animated.Value(0);
    this.bottomShadowAnimatedOpacity = new Animated.Value(1);
  }

  handleScroll = (event: Object) => {
    const maxScrollOffset = this.contentViewHeight - this.scrollViewHeight;
    const currentScrollOffset = event.nativeEvent.contentOffset.y;

    if (
      this.topShadowAnimatedOpacity._value === 1 &&
      currentScrollOffset <= 0
    ) {
      Animated.timing(this.topShadowAnimatedOpacity, {
        toValue: 0,
        duration: 200
      }).start();
    }

    if (this.topShadowAnimatedOpacity._value === 0 && currentScrollOffset > 0) {
      Animated.timing(this.topShadowAnimatedOpacity, {
        toValue: 1,
        duration: 200
      }).start();
    }

    if (
      this.bottomShadowAnimatedOpacity._value === 1 &&
      currentScrollOffset > maxScrollOffset
    ) {
      Animated.timing(this.bottomShadowAnimatedOpacity, {
        toValue: 0,
        duration: 200
      }).start();
    }

    if (
      this.bottomShadowAnimatedOpacity._value === 0 &&
      currentScrollOffset < maxScrollOffset
    ) {
      Animated.timing(this.bottomShadowAnimatedOpacity, {
        toValue: 1,
        duration: 200
      }).start();
    }
  };

  handleScrollViewLayout = (event: Object) => {
    const { height } = event.nativeEvent.layout;
    this.scrollViewHeight = height;
  };

  handleContentViewLayout = (event: Object) => {
    const { height } = event.nativeEvent.layout;
    this.contentViewHeight = height;
  };

  render() {
    const { style, children } = this.props;

    const topShadowStyle = {
      opacity: this.topShadowAnimatedOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
    };

    const bottomShadowStyle = {
      opacity: this.bottomShadowAnimatedOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
    };

    return (
      <View style={[styles.container, style]}>
        <Animated.View style={[styles.topShadow, topShadowStyle]} />
        <ScrollView
          onLayout={this.handleScrollViewLayout}
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
        >
          <View onLayout={this.handleContentViewLayout}>{children}</View>
        </ScrollView>
        <Animated.View style={[styles.bottomShadow, bottomShadowStyle]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden"
  },
  topShadow: {
    width: "100%",
    height: 10,
    position: "absolute",
    left: 0,
    top: -10,
    backgroundColor: blackColor,
    // The below properties are required for ioS shadow
    shadowColor: blackColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: maxShadowOpacity,
    shadowRadius: 5
  },
  bottomShadow: {
    width: "100%",
    height: 10,
    position: "absolute",
    left: 0,
    bottom: -10,
    backgroundColor: blackColor,
    // The below properties are required for ioS shadow
    shadowColor: blackColor,
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: maxShadowOpacity,
    shadowRadius: 5
  }
});

export default ShadowedScrollView;
