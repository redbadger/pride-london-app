// @flow
import React from "react";
import { StyleSheet, ScrollView, View, Animated, Platform } from "react-native";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { blackColor } from "../constants/colors";

type Props = {
  children: Array<Object>,
  style: StyleObj
};

const maxShadowOpacity: number = 1;
const shadowFadeDuration: number = 200;
const maxScrollEventThrottle: number = 16;

class ShadowedScrollView extends React.PureComponent<Props> {
  static defaultProps = {
    children: [],
    style: {}
  };

  // eslint-disable-next-line react/sort-comp
  topShadowOpacity: Object;
  bottomShadowOpacity: Object;
  contentViewHeight: number;
  scrollViewHeight: number;

  fadeShadow = (shadowAnimation: Object, toValue: number) => {
    Animated.timing(shadowAnimation, {
      toValue,
      duration: shadowFadeDuration
    }).start();
  };

  fadeTopShadow = (toValue: number) =>
    this.fadeShadow(this.topShadowOpacity, toValue);

  fadeBottomShadow = (toValue: number) =>
    this.fadeShadow(this.bottomShadowOpacity, toValue);

  componentWillMount() {
    this.topShadowOpacity = new Animated.Value(0);
    this.bottomShadowOpacity = new Animated.Value(1);
  }

  handleScroll = (event: { nativeEvent: { contentOffset: { y: number } } }) => {
    const maxScrollOffset = this.contentViewHeight - this.scrollViewHeight;
    const currentScrollOffset = event.nativeEvent.contentOffset.y;
    // eslint-disable-next-line no-underscore-dangle
    if (this.topShadowOpacity._value === 1 && currentScrollOffset <= 0) {
      this.fadeTopShadow(0);
    }

    // eslint-disable-next-line no-underscore-dangle
    if (this.topShadowOpacity._value === 0 && currentScrollOffset > 0) {
      this.fadeTopShadow(1);
    }

    if (
      // eslint-disable-next-line no-underscore-dangle
      this.bottomShadowOpacity._value === 1 &&
      currentScrollOffset > maxScrollOffset
    ) {
      this.fadeBottomShadow(0);
    }

    if (
      // eslint-disable-next-line no-underscore-dangle
      this.bottomShadowOpacity._value === 0 &&
      currentScrollOffset < maxScrollOffset
    ) {
      this.fadeBottomShadow(1);
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

    const topShadowOpacityStyle = {
      opacity: this.topShadowOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
    };

    const bottomShadowOpacityStyle = {
      opacity: this.bottomShadowOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
    };

    return (
      <View style={[styles.container, style]}>
        <Animated.View style={[styles.topShadow, topShadowOpacityStyle]} />
        <ScrollView
          onLayout={this.handleScrollViewLayout}
          onScroll={this.handleScroll}
          scrollEventThrottle={maxScrollEventThrottle}
        >
          <View onLayout={this.handleContentViewLayout}>{children}</View>
        </ScrollView>
        <Animated.View
          style={[styles.bottomShadow, bottomShadowOpacityStyle]}
        />
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
    ...Platform.select({
      ios: {
        shadowColor: blackColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: maxShadowOpacity,
        shadowRadius: 5
      },
      android: {
        elevation: 15
      }
    })
  },
  bottomShadow: {
    width: "100%",
    height: 10,
    position: "absolute",
    left: 0,
    bottom: -10,
    backgroundColor: blackColor,
    ...Platform.select({
      ios: {
        shadowColor: blackColor,
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: maxShadowOpacity,
        shadowRadius: 5
      },
      android: {
        elevation: 30
      }
    })
  }
});

export default ShadowedScrollView;
