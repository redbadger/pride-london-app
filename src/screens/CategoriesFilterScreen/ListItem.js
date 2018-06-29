// @flow
import React, { Component } from "react";
import { StyleSheet, View, Animated, Dimensions, Image } from "react-native";
import { hyphenate } from "../../lib/string";
import Text from "../../components/Text";
import { SelectableTouchable } from "../../components/Touchable";
import { whiteColor, blackColor } from "../../constants/colors";
import whiteCheck from "../../../assets/images/whiteCheck.png";
import blackCheck from "../../../assets/images/blackCheck.png";
import type { EventCategory } from "../../data/event";

type ListItemProps = {
  category: EventCategory,
  onPress: Function,
  selected: boolean
};

class ListItem extends Component<
  ListItemProps,
  { textWidth: number, textHeight: number }
> {
  static defaultProps = {
    onPress: () => {}
  };

  constructor(props: ListItemProps) {
    super(props);

    // Only animate when selecting new categories
    // do not animate the pre-selected ones
    Animated.timing(this.decorationWidth, {
      toValue: Number(props.selected),
      duration: 0,
      useNativeDriver: true
    }).start();

    this.state = {
      textWidth: 16 - Dimensions.get("window").width,
      textHeight: 48
    };
  }

  componentWillReceiveProps(props: ListItemProps) {
    Animated.timing(this.decorationWidth, {
      toValue: Number(props.selected),
      duration: 100,
      useNativeDriver: true
    }).start();
  }

  decorationWidth = new Animated.Value(0);

  // Measuring text width on initial render
  handleOnLayout = (event: {
    nativeEvent: { layout: { width: number, height: number } }
  }) =>
    this.setState({
      textWidth: event.nativeEvent.layout.width,
      textHeight: event.nativeEvent.layout.height
    });

  render() {
    const { category, onPress, selected } = this.props;
    const { textWidth, textHeight } = this.state;
    const textColor = selected && category.contrast ? blackColor : whiteColor;

    return (
      <SelectableTouchable
        style={styles.itemContainer}
        onPress={() => onPress(category.label)}
        accessibilityComponentType={
          selected ? "radiobutton_checked" : "radiobutton_unchecked"
        }
        accessibilityTraits={selected ? ["button", "selected"] : ["button"]}
        testID={`categories-filter-list-item-${hyphenate(category.label)}`}
      >
        <Animated.View
          style={[
            styles.itemDecoration,
            {
              backgroundColor: category.color,
              height: textHeight + 8,
              transform: [
                {
                  translateX: this.decorationWidth.interpolate(
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      inputRange: [0, 1],
                      outputRange: [
                        -Dimensions.get("window").width,
                        -Dimensions.get("window").width + textWidth
                      ]
                    }
                  )
                }
              ]
            }
          ]}
        />
        {selected && (
          <Image
            source={category.contrast ? blackCheck : whiteCheck}
            width={20}
            height={20}
            style={styles.check}
          />
        )}
        <View onLayout={this.handleOnLayout}>
          <Text type="h1" style={[styles.itemText, { color: textColor }]}>
            {category.label}
          </Text>
        </View>
      </SelectableTouchable>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: "flex-start",
    position: "relative",
    paddingTop: 8,
    paddingBottom: 8,
    minHeight: 48
  },
  itemDecoration: {
    position: "absolute",
    width: Dimensions.get("window").width + 16
  },
  check: {
    position: "absolute",
    marginLeft: 6
  },
  itemText: {
    paddingLeft: 32,
    paddingTop: 10,
    color: whiteColor,
    letterSpacing: 0
  }
});

export default ListItem;
