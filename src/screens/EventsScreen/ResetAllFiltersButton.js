// @flow
import React from "react";
import { Animated, StyleSheet, Easing, InteractionManager } from "react-native";
import type { ViewLayoutEvent } from "react-native/Libraries/Components/View/ViewPropTypes";
import FilterHeaderButton from "./FilterHeaderButton";
import text from "../../constants/text";

type Props = {
  visible: boolean,
  onPress: () => void,
  animationTime: number,
  animationDelay: number
};

type State = {
  isAnimating: boolean
};

const DEFAULT_HEIGHT = 120;
const DEFAULT_FADE_VALUE = 1;
const DEFAULT_TOP_OFFSET_VALUE = 0;

class ResetAllFiltersButton extends React.PureComponent<Props, State> {
  static defaultProps = {
    animationTime: 300,
    animationDelay: 0
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isAnimating: false
    };
  }

  componentWillUnmount() {
    this.animationFinished();
  }

  setButtonHeight = (e: ViewLayoutEvent): void => {
    const { height } = e.nativeEvent.layout;
    this.height = height;
  };

  fadeOut = (): void => {
    const { animationTime, animationDelay } = this.props;

    Animated.parallel([
      Animated.timing(this.fadeValue, {
        toValue: 0,
        duration: animationTime / 2,
        delay: animationDelay
      }),
      Animated.timing(this.topOffset, {
        toValue: -this.height,
        duration: animationTime,
        easing: Easing.out(Easing.quad),
        delay: animationDelay
      })
    ]).start(this.animationFinished);
  };

  resetAllFilters = (): void => {
    this.props.onPress();
    InteractionManager.runAfterInteractions(() => {
      this.setState({ isAnimating: true });
      this.fadeOut();
    });
  };

  resetAnimation = (): void => {
    this.topOffset = new Animated.Value(DEFAULT_TOP_OFFSET_VALUE);
    this.fadeValue = new Animated.Value(DEFAULT_FADE_VALUE);
  };

  animationFinished = (): void => {
    if (this.state.isAnimating) {
      this.setState({ isAnimating: false });
      this.resetAnimation();
    }
  };

  topOffset: Animated.Value = new Animated.Value(DEFAULT_TOP_OFFSET_VALUE);
  fadeValue: Animated.Value = new Animated.Value(DEFAULT_FADE_VALUE);
  height: number = DEFAULT_HEIGHT;

  render() {
    const isVisible: boolean = this.state.isAnimating || this.props.visible;
    return (
      isVisible && (
        <Animated.View
          onLayout={this.setButtonHeight}
          style={[
            styles.clearAllWrapper,
            { opacity: this.fadeValue, marginTop: this.topOffset }
          ]}
        >
          <FilterHeaderButton
            active={false}
            text={text.resetAllFilters}
            label={text.resetAllFilters}
            style={styles.clearAll}
            onPress={this.resetAllFilters}
          />
        </Animated.View>
      )
    );
  }
}

const styles = StyleSheet.create({
  clearAll: {
    minHeight: 0,
    paddingTop: 16
  },
  clearAllWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});

export default ResetAllFiltersButton;
