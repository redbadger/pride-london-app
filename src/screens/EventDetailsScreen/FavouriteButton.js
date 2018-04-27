// @flow
import React from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import Touchable from "../../components/Touchable";
import heartAnimation from "../../../assets/animations/favourite-detail.json";

type Props = {
  active: boolean,
  onPress: Function
};

type State = {
  progress: Object
};

export default class FavouriteButton extends React.Component<Props, State> {
  defaultProps = {
    active: false
  };

  state = {
    progress: new Animated.Value(0)
  };

  componentDidUpdate(prevProps: Props) {
    const value = this.props.active ? 1 : 0;
    if (this.props.active === true && prevProps.active === false) {
      Animated.timing(this.state.progress, {
        toValue: value,
        duration: 1800,
        easing: Easing.linear,
        useNativeDriver: true
      }).start();
      return;
    }
    Animated.timing(this.state.progress, {
      toValue: value,
      duration: 0,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  }

  handlePress = () => {
    this.props.onPress(!this.props.active);
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
