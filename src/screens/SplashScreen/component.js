// @flow
import React, { Component } from "react";
import type { Node } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";
import SplashScreenControler from "react-native-splash-screen";

import Text from "../../components/Text";
import { lightNavyBlueColor } from "../../constants/colors";

export type SplashScreenProps = {
  children: Node,
  onAnimationComplete: () => any,
  state: "showing" | "hiding" | "hidden"
};

type State = {
  progress: ?Object
};

class SplashScreen extends Component<SplashScreenProps, State> {
  state = {
    progress: null
  };

  componentDidMount() {
    SplashScreenControler.hide();
  }

  static getDerivedStateFromProps(
    nextProps: SplashScreenProps,
    prevState: State
  ) {
    if (!prevState.progress) {
      const progress = new Animated.Value(0);
      return { progress };
    }

    return null;
  }

  componentDidUpdate() {
    if (this.props.state !== "hiding") return;

    if (this.state.progress) {
      Animated.timing(this.state.progress, {
        toValue: 1,
        easing: Easing.in(Easing.back(2)),
        duration: 600
      }).start(this.props.onAnimationComplete);
    }
  }

  overlayStyle = (y: number) => ({
    transform: [{ translateY: y }]
  });

  render() {
    const screenHeight = Dimensions.get("window").height;
    const y = !this.state.progress
      ? 0
      : this.state.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -screenHeight]
        });

    return (
      <View style={styles.container}>
        {this.props.children}
        {this.props.state !== "hidden" && (
          <Animated.View style={[styles.overlay, this.overlayStyle(y)]}>
            <View style={styles.content}>
              <Text style={styles.text} color="whiteColor">
                Ni!
              </Text>
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
  text: {
    textAlign: "center"
  }
});

export default SplashScreen;
