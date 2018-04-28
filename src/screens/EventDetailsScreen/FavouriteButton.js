// @flow
import React from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import Touchable from "../../components/Touchable";
import heartAnimation from "../../../assets/animations/favourite-detail.json";

type Props = {};

type State = {
  progress: Object
};

export default class FavouriteButton extends React.Component<Props, State> {
  state = {
    progress: new Animated.Value(0)
  };

  handlePress = () => {
    Animated.sequence([
      Animated.timing(this.state.progress, {
        toValue: 0,
        duration: 0,
        easing: Easing.linear,
        useNativeDriver: true
      }),
      Animated.timing(this.state.progress, {
        toValue: 1,
        duration: 1800,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ]).start();
  };

  render() {
    return (
      <Touchable
        accessibilityLabel="Favourite"
        onPress={this.handlePress}
        style={styles.button}
      >
        <LottieView
          progress={this.state.progress}
          source={heartAnimation}
          loop={false}
        />
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48
  }
});
