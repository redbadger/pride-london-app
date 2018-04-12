// @flow
import React from "react";
import { StyleSheet, Linking } from "react-native";
import Touchable from "./Touchable";
import Text from "./Text";
import {
  eventDetailsBuyButtonColor,
  eventDetailsBuyButtonTextColor
} from "../constants/colors";

type Props = {
  text: string,
  url?: string
};

export const onPress = url => {
  if (url && url.length > 0) {
    Linking.openURL(url);
  }
};

const Button = ({ text, url }: Props) => (
  <Touchable style={styles.button} onPress={() => onPress(url)}>
    <Text style={styles.text}>{text}</Text>
  </Touchable>
);
Button.defaultProps = {
  url: ""
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: eventDetailsBuyButtonColor,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: eventDetailsBuyButtonTextColor
  }
});

export default Button;
