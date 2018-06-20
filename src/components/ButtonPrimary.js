// @flow
import React from "react";
import { StyleSheet } from "react-native";
import Touchable from "./Touchable";
import Text from "./Text";
import {
  eucalyptusGreenColor,
  lightNavyBlueColor,
  mediumGreyColor,
  greyishBrownColor
} from "../constants/colors";

type Props = {
  children?: string,
  disabled?: boolean,
  onPress?: Function,
  testID?: string
};

const Button = ({ children, disabled, onPress, testID }: Props) => (
  <Touchable
    style={[styles.button, disabled ? styles.disabledButton : {}]}
    onPress={onPress}
    disabled={disabled}
    testID={testID}
  >
    <Text type="h2" style={[styles.text, disabled ? styles.disabledText : {}]}>
      {children}
    </Text>
  </Touchable>
);

Button.defaultProps = {
  children: "",
  disabled: false,
  onPress: () => {},
  testID: undefined
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: eucalyptusGreenColor,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48
  },
  text: {
    color: lightNavyBlueColor
  },
  disabledButton: {
    backgroundColor: mediumGreyColor
  },
  disabledText: {
    color: greyishBrownColor
  }
});

export default Button;
