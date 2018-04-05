// @flow
import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
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

const maxShadowOpacity = 0.7;

class ShadowedScrollView extends React.PureComponent<Props, State> {
  constructor() {
    super();

    this.state = { topShadowOpacity: 0, bottomShadowOpacity: maxShadowOpacity };
  }

  handleScroll = (event: Object) => {
    const maxScrollOffset = this.contentViewHeight - this.scrollViewHeight;
    const currentScrollOffset = event.nativeEvent.contentOffset.y;
    const rawOpacity = currentScrollOffset * maxShadowOpacity / maxScrollOffset;

    const precision = 2;
    const factor = Math.pow(10, precision);
    const opacity = Math.round(rawOpacity * factor) / factor;
    const toppedOpacity =
      rawOpacity > maxShadowOpacity
        ? maxShadowOpacity
        : opacity <= 0 ? 0 : opacity;

    this.setState({
      topShadowOpacity: toppedOpacity,
      bottomShadowOpacity: maxShadowOpacity - toppedOpacity
    });
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
    const { topShadowOpacity, bottomShadowOpacity } = this.state;

    return (
      <View style={[styles.container, style]}>
        <View style={[styles.topShadow, { shadowOpacity: topShadowOpacity }]} />
        <ScrollView
          onLayout={this.handleScrollViewLayout}
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
        >
          <View onLayout={this.handleContentViewLayout}>{children}</View>
        </ScrollView>
        <View
          style={[styles.bottomShadow, { shadowOpacity: bottomShadowOpacity }]}
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
    // The below properties are required for ioS shadow
    shadowColor: blackColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
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
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.7,
    shadowRadius: 5
  }
});

export default ShadowedScrollView;
