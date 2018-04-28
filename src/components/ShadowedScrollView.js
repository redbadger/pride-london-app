// @flow
import * as React from "react";
import { StyleSheet, ScrollView, View, Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { blackZeroColor, blackFifteenColor } from "../constants/colors";

type Props = {
  topShadow?: boolean,
  bottomShadow?: boolean,
  children: React.Node,
  shadowOpacity?: number,
  style: ViewStyleProp
};

const shadowFadeDuration: number = 100;
const maxScrollEventThrottle: number = 16;
const shadowHeight: number = 8;

class ShadowedScrollView extends React.PureComponent<Props> {
  static defaultProps = {
    topShadow: true,
    bottomShadow: true,
    children: [],
    style: {},
    shadowOpacity: 1
  };

  // eslint-disable-next-line react/sort-comp
  topShadowOpacity: Object;
  bottomShadowOpacity: Object;
  isTopShadowPresent: boolean = false;
  isBottomShadowPresent: boolean = true;
  contentViewHeight: number;
  scrollViewHeight: number;

  fadeTopShadow = (toValue: number) =>
    Animated.timing(this.topShadowOpacity, {
      toValue,
      duration: shadowFadeDuration,
      useNativeDriver: true
    }).start();

  fadeBottomShadow = (toValue: number) =>
    Animated.timing(this.bottomShadowOpacity, {
      toValue,
      duration: shadowFadeDuration,
      useNativeDriver: true
    }).start();

  componentWillMount() {
    this.topShadowOpacity = new Animated.Value(0);
    this.bottomShadowOpacity = new Animated.Value(1);
  }

  handleScroll = (event: { nativeEvent: { contentOffset: { y: number } } }) => {
    const maxScrollOffset = this.contentViewHeight - this.scrollViewHeight - 10;
    const currentScrollOffset = event.nativeEvent.contentOffset.y;

    if (this.isTopShadowPresent && currentScrollOffset <= 0) {
      this.isTopShadowPresent = false;
      this.fadeTopShadow(0);
    }

    if (!this.isTopShadowPresent && currentScrollOffset > 0) {
      this.isTopShadowPresent = true;
      this.fadeTopShadow(1);
    }

    if (this.isBottomShadowPresent && currentScrollOffset > maxScrollOffset) {
      this.isBottomShadowPresent = false;
      this.fadeBottomShadow(0);
    }

    if (!this.isBottomShadowPresent && currentScrollOffset < maxScrollOffset) {
      this.isBottomShadowPresent = true;
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
    const {
      style,
      children,
      topShadow,
      bottomShadow,
      shadowOpacity
    } = this.props;

    const topShadowOpacityStyle = {
      opacity: this.topShadowOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, topShadow ? 1 : 0]
      })
    };

    const bottomShadowOpacityStyle = {
      opacity: this.bottomShadowOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, bottomShadow ? 1 : 0]
      })
    };

    const gradientStyles = [styles.gradient, { opacity: shadowOpacity }];

    return (
      <View style={[styles.container, style]}>
        <Animated.View style={[styles.topShadow, topShadowOpacityStyle]}>
          <LinearGradient
            colors={[blackFifteenColor, blackZeroColor]}
            style={gradientStyles}
          />
        </Animated.View>
        <ScrollView
          onLayout={this.handleScrollViewLayout}
          onScroll={this.handleScroll}
          scrollEventThrottle={maxScrollEventThrottle}
        >
          <View onLayout={this.handleContentViewLayout}>{children}</View>
        </ScrollView>
        <Animated.View style={[styles.bottomShadow, bottomShadowOpacityStyle]}>
          <LinearGradient
            colors={[blackZeroColor, blackFifteenColor]}
            style={gradientStyles}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topShadow: {
    width: "100%",
    height: shadowHeight,
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 1
  },
  bottomShadow: {
    width: "100%",
    height: shadowHeight,
    position: "absolute",
    left: 0,
    bottom: 0
  },
  gradient: {
    width: "100%",
    height: shadowHeight
  }
});

export default ShadowedScrollView;
