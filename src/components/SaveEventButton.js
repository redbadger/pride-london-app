// @flow
import React from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import LottieView from "lottie-react-native";
import Touchable from "./Touchable";
import heartAnimationLight from "../../assets/animations/save-event-light.json";
import heartAnimationDark from "../../assets/animations/save-event-dark.json";
import text from "../constants/text";

type Props = {
  active: boolean,
  onDark: boolean,
  onPress: boolean => void,
  testID?: string
};

type State = {
  animating: boolean,
  progress: ?Object
};

export default class SaveEventButton extends React.Component<Props, State> {
  static defaultProps = {
    active: false,
    onDark: false,
    testID: undefined
  };

  state = {
    animating: false,
    progress: null
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (!prevState.animating || !prevState.progress) {
      const value = nextProps.active ? 1 : 0;
      return {
        progress: new Animated.Value(value),
        animating: false
      };
    }
    return null;
  }

  shouldComponentUpdate(nextProps: Props) {
    return (
      this.props.active !== nextProps.active ||
      this.props.onDark !== nextProps.onDark ||
      this.props.onPress !== nextProps.onPress
    );
  }

  componentWillUnmount() {
    this.completeAnimation();
  }

  startAnimation = (value: number) => {
    if (this.state.progress) {
      Animated.timing(this.state.progress, {
        toValue: value,
        duration: value * 800,
        easing: Easing.linear,
        useNativeDriver: true
      }).start(this.completeAnimation);
      this.setState({ animating: true });
      if (value) {
        ReactNativeHapticFeedback.trigger("impactHeavy");
      }
    }
  };

  completeAnimation = () => {
    if (this.state.animating) {
      this.setState({ animating: false });
    }
  };

  handlePress = () => {
    this.startAnimation(!this.props.active ? 1 : 0);
    this.props.onPress(!this.props.active);
  };

  render() {
    const source = this.props.onDark ? heartAnimationLight : heartAnimationDark;
    return (
      <Touchable
        accessibilityLabel={
          this.props.active
            ? text.saveEventButtonUnSaveEvent
            : text.saveEventButtonSaveEvent
        }
        onPress={this.handlePress}
        style={styles.button}
        testID={this.props.testID}
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
