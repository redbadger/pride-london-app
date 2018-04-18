// @flow
import React from "react";
import { StyleSheet } from "react-native";
import Touchable from "./Touchable";
import Text from "./Text";
import { eucalyptusGreenColor, lightNavyBlueColor } from "../constants/colors";

type Props = {
  children?: string,
  disabled?: boolean,
  onPress?: Function
};

const Button = ({ children, disabled, onPress }: Props) => (
  <Touchable style={styles.button} onPress={onPress} disabled={disabled}>
    <Text type="h2" style={styles.text}>
      {children}
    </Text>
  </Touchable>
);

Button.defaultProps = {
  children: "",
  disabled: false,
  onPress: () => {}
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: eucalyptusGreenColor,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: lightNavyBlueColor
  }
});

export default Button;
