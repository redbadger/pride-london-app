// @flow
import React from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import Touchable from "./Touchable";
import heartAnimationLight from "../../assets/animations/save-event-light.json";
import heartAnimationDark from "../../assets/animations/save-event-dark.json";
import text from "../constants/text";

type Props = {
  active: boolean,
  onDark: boolean,
  onPress: boolean => void
};

type State = {
  progress?: Object
};

export default class SaveEventButton extends React.Component<Props, State> {
  static defaultProps = {
    active: false,
    onDark: false
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (!prevState.progress) {
      const value = nextProps.active ? 1 : 0;
      return {
        progress: new Animated.Value(value)
      };
    }
    return null;
  }

  state = {};

  componentDidUpdate(prevProps: Props) {
    // Only animate if props.active has changed,
    // Animates heart when change from inactive -> active
    // Snaps to start when change from active -> inactive
    if (this.state.progress && this.props.active !== prevProps.active) {
      const value = this.props.active ? 1 : 0;
      Animated.timing(this.state.progress, {
        toValue: value,
        duration: value * 1920,
        easing: Easing.linear,
        useNativeDriver: true
      }).start();
    }
  }

  handlePress = () => {
    this.props.onPress(!this.props.active);
  };

  render() {
    const source = this.props.onDark ? heartAnimationLight : heartAnimationDark;
    return (
      <Touchable
        accessibilityLabel={
          this.props.active ? text.unSaveEvent : text.saveEvent
        }
        onPress={this.handlePress}
        style={styles.button}
      >
        <LottieView
          progress={this.state.progress}
          source={source}
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
