// @flow
import React from "react";
import { StyleSheet, View } from "react-native";
import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import Text from "../../components/Text";
import Touchable from "../../components/Touchable";
import { filterButtonTextColor, whiteColor } from "../../constants/colors";
import NumberBadge from "../../components/NumberBadge";

type Props = {
  text: string,
  label: string,
  onPress: Function,
  onRef?: Function,
  style?: ViewStyleProp,
  badgeValue?: ?number,
  active: boolean,
  testID?: string
};

const FilterHeaderButton = ({
  text,
  onPress,
  onRef,
  style,
  badgeValue,
  active,
  label,
  testID
}: Props) => (
  <Touchable
    style={[styles.button, style]}
    onPress={onPress}
    ref={onRef}
    accessibilityLabel={label}
    testID={testID}
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
  badgeValue: null,
  testID: undefined
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
