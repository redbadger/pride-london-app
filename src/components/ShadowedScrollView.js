// @flow
import React from "react";
import { StyleSheet, ScrollView, View, Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type Props = {
  children: Array<Object>,
  style: StyleObj
};

const shadowFadeDuration: number = 100;
const maxScrollEventThrottle: number = 16;

const LinearGrad: any = props => <LinearGradient {...props} />;
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGrad);

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
    // eslint-disable-next-line no-underscore-dangle
    if (currentScrollOffset <= 0) this.fadeTopShadow(0);

    // eslint-disable-next-line no-underscore-dangle
    if (currentScrollOffset > 0) this.fadeTopShadow(1);

    // eslint-disable-next-line no-underscore-dangle
    if (currentScrollOffset > maxScrollOffset) this.fadeBottomShadow(0);

    // eslint-disable-next-line no-underscore-dangle
    if (currentScrollOffset < maxScrollOffset) this.fadeBottomShadow(1);
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
      <View style={style}>
        <AnimatedLinearGradient
          colors={["rgba(0, 0, 0, 0.3)", "rgba(255, 255, 255, 0)"]}
          style={[styles.topShadow, topShadowOpacityStyle]}
        />
        <ScrollView
          onLayout={this.handleScrollViewLayout}
          onScroll={this.handleScroll}
          scrollEventThrottle={maxScrollEventThrottle}
        >
          <View onLayout={this.handleContentViewLayout}>{children}</View>
        </ScrollView>
        <AnimatedLinearGradient
          colors={["rgba(255, 255, 255, 0)", "rgba(0, 0, 0, 0.3)"]}
          style={[styles.bottomShadow, bottomShadowOpacityStyle]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topShadow: {
    width: "100%",
    height: 20,
    position: "absolute",
    left: 0,
    top: 0
  },
  bottomShadow: {
    width: "100%",
    height: 10,
    position: "absolute",
    left: 0,
    bottom: 0
  }
});

export default ShadowedScrollView;
