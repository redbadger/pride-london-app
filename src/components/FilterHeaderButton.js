// @flow
import React from "react";
import { StyleSheet, View } from "react-native";
import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import Text from "./Text";
import Touchable from "./Touchable";
import { filterButtonTextColor, whiteColor } from "../constants/colors";
import NumberBadge from "./NumberBadge";

type Props = {
  text: string,
  label: string,
  onPress: Function,
  onRef?: Function,
  style?: ViewStyleProp,
  badgeValue?: ?number,
  active: boolean
};

const FilterHeaderButton = ({
  text,
  onPress,
  onRef,
  style,
  badgeValue,
  active,
  label
}: Props) => (
  <Touchable
    style={[styles.button, style]}
    onPress={onPress}
    ref={onRef}
    accessibilityLabel={label}
  >
    <Text
      type="small"
      style={[
        styles.buttonText,
        active ? styles.activeColor : styles.inactiveColor
      ]}
    >
      {text}
    </Text>
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
    fontFamily: "Roboto-Medium",
    textAlign: "center"
  },
  activeColor: {
    color: filterButtonTextColor
  },
  inactiveColor: {
    color: whiteColor
  },
  badgeContainer: {
    marginLeft: 6
  }
});

export default FilterHeaderButton;
