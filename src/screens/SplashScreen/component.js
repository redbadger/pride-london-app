// @flow
import React, { Component } from "react";
import type { Node } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";
import SplashScreenControler from "react-native-splash-screen";
import LottieView from "lottie-react-native";

import Text from "../../components/Text";
import { lightNavyBlueColor, whiteColor } from "../../constants/colors";
import heartAnimation from "../../../assets/animations/save-event-light.json";

export type SplashScreenProps = {
  children: Node,
  onAnimationComplete: () => any,
  state: "showing" | "hiding" | "hidden"
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

  componentDidMount() {
    SplashScreenControler.hide();
  }

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

  componentDidUpdate() {
    if (this.props.state !== "hiding" || !this.state.heart || !this.state.slide)
      return;

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
  }

  overlayStyle = (y: number) => ({
    transform: [{ translateY: y }]
  });

  render() {
    const screenHeight = Dimensions.get("window").height;
    const slide = !this.state.slide
      ? 0
      : this.state.slide.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -screenHeight]
        });

    const heart = !this.state.heart
      ? 0
      : this.state.heart.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1]
        });

    return (
      <View style={styles.container}>
        {this.props.children}
        {this.props.state !== "hidden" && (
          <Animated.View style={[styles.overlay, this.overlayStyle(slide)]}>
            <View style={styles.content}>
              <View style={styles.discover}>
                <Text type="h1">Discover</Text>
              </View>
              <View style={styles.plan}>
                <Text type="h1">Plan</Text>
              </View>
              <View style={styles.love}>
                <LottieView
                  progress={heart}
                  source={heartAnimation}
                  loop={false}
                />
              </View>
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
  },
  discover: {
    margin: 2,
    padding: 5,
    backgroundColor: whiteColor
  },
  plan: {
    margin: 2,
    padding: 5,
    backgroundColor: whiteColor
  },
  love: {
    margin: 2,
    width: 150,
    height: 150
  }
});

export default SplashScreen;
