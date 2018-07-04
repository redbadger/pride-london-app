// @flow
import React, { Component } from "react";
import type { Node } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";
import SplashScreenController from "react-native-splash-screen";

import { lightNavyBlueColor } from "../../constants/colors";
import Welcome from "./Welcome";

export type SplashScreenProps = {
  children: Node,
  onAnimationComplete: () => any,
  state: "showing" | "hiding" | "hidden",
  noDataReceived: boolean,
  loading: boolean,
  getData: () => void
};

type State = {
  heart: ?Object,
  slide: ?Object
};

class SplashScreen extends Component<SplashScreenProps, State> {
  state = {
    heart: null,
    slide: null
  };

  static getDerivedStateFromProps(
    nextProps: SplashScreenProps,
    prevState: State
  ) {
    if (!prevState.slide || !prevState.heart) {
      return {
        heart: new Animated.Value(0),
        slide: new Animated.Value(0)
      };
    }

    return null;
  }

  componentDidMount() {
    SplashScreenController.hide();
  }

  componentDidUpdate() {
    if (this.props.state !== "hiding") return;
    if (!this.props.noDataReceived) {
      this.animateOut();
    }
  }

  animateOut = () => {
    if (!this.state.heart || !this.state.slide) return;
    const heart = Animated.timing(this.state.heart, {
      toValue: 1,
      easing: Easing.linear,
      duration: 800,
      useNativeDriver: true
    });

    // $FlowFixMe - wtf.
    const slide = Animated.timing(this.state.slide, {
      toValue: 1,
      easing: Easing.in(Easing.back(2)),
      duration: 600,
      useNativeDriver: true
    });

    Animated.stagger(500, [heart, slide]).start(this.props.onAnimationComplete);
  };

  overlayStyle = (y: number) => ({
    transform: [{ translateY: y }]
  });

  render() {
    const screenHeight = Dimensions.get("window").height;
    const { noDataReceived, loading, getData } = this.props;
    const slide = !this.state.slide
      ? 0
      : this.state.slide.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -screenHeight]
        });

    return (
      <View style={styles.container}>
        {this.props.children}
        {this.props.state !== "hidden" && (
          <Animated.View style={[styles.overlay, this.overlayStyle(slide)]}>
            <View style={styles.content}>
              <Welcome
                animationProgress={this.state.heart}
                noDataReceived={noDataReceived}
                loading={loading}
                getData={getData}
              />
            </View>
          </Animated.View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  overlay: {
    position: "absolute",
    height: "160%", // to cover the bounce down
    width: "100%",
    bottom: 0,
    backgroundColor: lightNavyBlueColor
  },
  content: {
    position: "absolute",
    bottom: 0,
    height: "62.5%", // 100% of the screen
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default SplashScreen;
