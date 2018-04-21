// @flow
import React from "react";
import { StyleSheet, View } from "react-native";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import Text from "./Text";
import Touchable from "./Touchable";
import { filterButtonTextColor } from "../constants/colors";
import NumberBadge from "./NumberBadge";

type Props = {
  text: string,
  onPress: Function,
  onRef?: Function,
  style?: StyleObj,
  badgeValue?: ?number
};

const FilterHeaderButton = ({
  text,
  onPress,
  onRef,
  style,
  badgeValue
}: Props) => (
  <Touchable style={[styles.button, style]} onPress={onPress} ref={onRef}>
    <Text style={styles.buttonText}>{text}</Text>
    {badgeValue != null && (
      <View style={styles.badgeContainer}>
        <NumberBadge value={badgeValue} />
      </View>
    )}
  </Touchable>
);

FilterHeaderButton.defaultProps = {
  onRef: undefined,
  style: {},
  badgeValue: null
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  buttonText: {
    color: filterButtonTextColor,
    fontFamily: "Roboto-Medium"
  },
  badgeContainer: {
    marginLeft: 6
  }
});

export default FilterHeaderButton;
