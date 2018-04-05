// @flow
import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Dimensions
} from "react-native";
import Text from "./Text";
import { whiteColor } from "../constants/colors";

import type { EventCategory } from "../data/event";

type CategoriesFilterProps = {
  category: EventCategory,
  onPress: Function,
  selected: boolean
};

class CategoriesFilter extends Component<
  CategoriesFilterProps,
  { textWidth: number }
> {
  static defaultProps = {
    onPress: () => {}
  };

  state = {
    textWidth: 0
  };

  decorationWidth = new Animated.Value(0);

  handleOnLayout = (event: { nativeEvent: { layout: { width: number } } }) =>
    this.setState({ textWidth: event.nativeEvent.layout.width });

  render() {
    const { category, onPress, selected } = this.props;
    const { textWidth } = this.state;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        accessibilityTraits={["button"]}
        accessibilityComponentType="button"
        onPress={() => {
          Animated.timing(this.decorationWidth, {
            toValue: Number(!selected),
            duration: 300,
            useNativeDriver: true
          }).start();
          onPress(category.label);
        }}
      >
        <Animated.View
          style={[
            styles.itemDecoration,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor: category.color,
              transform: [
                {
                  translateX: this.decorationWidth.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      16 - Dimensions.get("window").width,
                      16 - Dimensions.get("window").width + textWidth
                    ]
                  })
                }
              ]
            }
          ]}
        />
        <View onLayout={this.handleOnLayout}>
          <Text style={styles.itemText}>{category.label}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    position: "relative",
    marginBottom: 8,
    paddingBottom: 12,
    height: 48
  },
  itemDecoration: {
    position: "absolute",
    height: 48,
    width: Dimensions.get("window").width
  },
  itemText: {
    height: 48,
    paddingLeft: 28,
    paddingTop: 12,
    color: whiteColor,
    textAlign: "left",
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: 0
  }
});

export default CategoriesFilter;
