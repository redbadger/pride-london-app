// @flow
import React from "react";
import { Animated, StyleSheet, Easing } from "react-native";
import type { ViewLayoutEvent } from "react-native/Libraries/Components/View/ViewPropTypes";
import FilterHeaderButton from "./FilterHeaderButton";
import text from "../../constants/text";

type Props = {
  visible: boolean,
  onPress: () => void
};

type State = {
  isAnimating: boolean
};

const DEFAULT_HEIGHT = 120;
const DEFAULT_FADE_VALUE = 1;
const DEFAULT_TOP_OFFSET_VALUE = 1;
const FADE_ANIMATION_TIME = 200;
const TOP_OFFSET_ANIMATION_TIME = 400;
const TOP_OSSET_ANIMATION_DELAY = 50;

class ResetAllFiltersButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isAnimating: false
    };
  }

  setButtonHeight = (e: ViewLayoutEvent): void => {
    const { height } = e.nativeEvent.layout;
    this.height = height;
  };

  fadeOut = (): void => {
    this.props.onPress();
    this.setState({ isAnimating: true });

    Animated.parallel([
      Animated.timing(this.fadeValue, {
        toValue: 0,
        duration: FADE_ANIMATION_TIME
      }),
      Animated.timing(this.topOffset, {
        toValue: -this.height,
        duration: TOP_OFFSET_ANIMATION_TIME,
        easing: Easing.out(Easing.quad),
        delay: TOP_OSSET_ANIMATION_DELAY
      })
    ]).start(this.animationFinished);
  };

  reset = (): void => {
    this.topOffset = new Animated.Value(DEFAULT_TOP_OFFSET_VALUE);
    this.fadeValue = new Animated.Value(DEFAULT_FADE_VALUE);
  };

  animationFinished = (): void => {
    this.setState({ isAnimating: false });
    this.reset();
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
            onPress={() => this.fadeOut()}
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
