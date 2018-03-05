// @flow
import React from "react";
import { StyleSheet, TouchableOpacity, Linking } from "react-native";
import Text from "./Text";
import {
  eventDetailsBuyButtonColor,
  eventDetailsBuyButtonTextColor
} from "../constants/colors";

type Props = {
  text: string,
  url?: string
};

const onPress = url => {
  if (url && url.length > 0) {
    Linking.openURL(url);
  }
};

const Button = ({ text, url }: Props) => (
  <TouchableOpacity style={styles.button} onPress={() => onPress(url)}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);
Button.defaultProps = {
  url: ""
};

const styles = StyleSheet.create({
  button: {
    height: 40,
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
