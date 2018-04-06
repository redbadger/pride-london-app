// @flow
import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  Image
} from "react-native";
import Text from "../../components/Text";
import { whiteColor } from "../../constants/colors";
import whiteCheck from "../../../assets/images/whiteCheck.png";
import type { EventCategory } from "../../data/event";

type ListItemProps = {
  category: EventCategory,
  onPress: Function,
  selected: boolean
};

class ListItem extends Component<ListItemProps, { textWidth: number }> {
  static defaultProps = {
    onPress: () => {}
  };

  constructor(props: ListItemProps) {
    super(props);

    // No initial animation
    Animated.timing(this.decorationWidth, {
      toValue: Number(props.selected),
      duration: 0,
      useNativeDriver: true
    }).start();

    this.state = {
      textWidth: 16 - Dimensions.get("window").width
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
        onPress={() => onPress(category.label)}
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
        {selected && (
          <Image
            source={whiteCheck}
            width={20}
            height={20}
            style={styles.check}
          />
        )}
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
  check: {
    position: "absolute",
    marginTop: 16,
    marginLeft: 6
  },
  itemText: {
    height: 48,
    paddingLeft: 32,
    paddingTop: 14,
    color: whiteColor,
    textAlign: "left",
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: 0
  }
});

export default ListItem;
