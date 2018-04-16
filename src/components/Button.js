// @flow
import React from "react";
import { StyleSheet, Linking } from "react-native";
import Touchable from "./Touchable";
import Text from "./Text";
import {
  eventDetailsBuyButtonColor,
  eventDetailsBuyButtonTextColor,
  buttonPrimaryBackground,
  buttonPrimaryTextColor
} from "../constants/colors";

type ButtonType = "primary";

type Props = {
  text: string,
  url?: string,
  type?: ButtonType,
  onPress?: () => void
};

export const handlePress = (onPress: ?() => void, url: ?string) => {
  if (onPress) {
    onPress();
  }

  if (url && url.length > 0) {
    Linking.openURL(url);
  }
};

const Button = ({ text, url, onPress, type = "primary" }: Props) => (
  <Touchable
    style={[styles.button, styles[type]]}
    onPress={() => handlePress(onPress, url)}
  >
    <Text type="h2" style={[styles.text, styles[`${type}Text`]]}>
      {text}
    </Text>
  </Touchable>
);
Button.defaultProps = {
  url: "",
  type: "primary",
  onPress: () => {}
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: eventDetailsBuyButtonColor,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  // eslint-disable-next-line react-native/no-unused-styles
  primary: {
    backgroundColor: buttonPrimaryBackground
  },
  // eslint-disable-next-line react-native/no-unused-styles
  primaryText: {
    color: buttonPrimaryTextColor
  },
  text: {
    color: eventDetailsBuyButtonTextColor
  }
});

export default Button;
