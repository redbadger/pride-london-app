// @flow
import React, { PureComponent } from "react";
import { View, StyleSheet, Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import type { Node } from "react";
import type { LayoutEvent } from "react-native/Libraries/Types/CoreEventTypes";

import { whiteZeroColor, whiteColor } from "../constants/colors";
import text from "../constants/text";

import Touchable from "../components/Touchable";
import TextLink from "./TextLink";

type Props = {
  children: Node,
  maxHeight: number,
  showMoreLabel: string,
  showLessLabel: string
};

type State = {
  collapsed: boolean,
  contentHeight: number,
  contentContainerHeight: Object,
  gradientOpacity: Object
};

class Collapsible extends PureComponent<Props, State> {
  static defaultProps = {
    maxHeight: 140,
    showMoreLabel: text.collapsibleShowMore,
    showLessLabel: text.collapsibleShowLess
  };

  state = {
    collapsed: true,
    contentHeight: 0,
    contentContainerHeight: new Animated.Value(0),
    gradientOpacity: new Animated.Value(1)
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.collapsed === this.state.collapsed) return;

    const toValue = this.state.collapsed ? 0 : 1;
    const { contentContainerHeight, gradientOpacity } = this.state;

    Animated.timing(contentContainerHeight, {
      toValue,
      duration: this.state.contentHeight * 0.8
    }).start();

    Animated.timing(gradientOpacity, {
      toValue: 1 - toValue,
      duration: this.state.contentHeight * 0.8,
      useNativeDriver: true
    }).start();
  }

  toggleCollapsed = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  measureContentHeight = (event: LayoutEvent) => {
    this.setState({ contentHeight: event.nativeEvent.layout.height });
  };

  render() {
    const { children, showMoreLabel, maxHeight, showLessLabel } = this.props;
    const { contentHeight, collapsed } = this.state;
    const collapsible = contentHeight > maxHeight;

    const { contentContainerHeight, gradientOpacity } = this.state;
    const textContainerHeightStyle = {
      height: contentContainerHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [collapsible ? maxHeight : contentHeight, contentHeight]
      })
    };
    const gradientOpacityStyle = {
      opacity: gradientOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
    };

    return (
      <View>
        <View>
          <Animated.ScrollView
            scrollEnabled={false}
            style={textContainerHeightStyle}
          >
            <View testID="children" onLayout={this.measureContentHeight}>
              {children}
            </View>
          </Animated.ScrollView>
          {collapsible && (
            <Animated.View style={[styles.gradient, gradientOpacityStyle]}>
              <LinearGradient
                colors={[whiteZeroColor, whiteColor]}
                style={styles.gradient}
              />
            </Animated.View>
          )}
        </View>
        {collapsible && (
          <Touchable
            onPress={this.toggleCollapsed}
            style={styles.toggleContainer}
          >
            <TextLink testID="showmore">
              {collapsed ? showMoreLabel : showLessLabel}
            </TextLink>
          </Touchable>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gradient: {
    width: "100%",
    height: 30,
    position: "absolute",
    bottom: 0
  },
  toggleContainer: {
    alignSelf: "flex-end"
  }
});

export default Collapsible;
