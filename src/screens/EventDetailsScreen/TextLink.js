// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../../components/Text";
import Touchable from "../../components/Touchable";
import { eucalyptusGreenColor } from "../../constants/colors";

type Props = {
  children: string,
  onPress: Function
};

const TextLink = ({ children, onPress }: Props) => (
  <Touchable onPress={onPress} style={styles.touchable}>
    <View style={styles.detailTitleLink}>
      <Text type="h4" color="lightNavyBlueColor">
        {children}
      </Text>
    </View>
  </Touchable>
);

// Note: Touchable expects children to be at least 44px high. This is
// rarely the case for text hence why we overwrite it. This may need
// to be addressed for accessibility.
const styles = StyleSheet.create({
  touchable: {
    minHeight: 26
  },
  detailTitleLink: {
    borderBottomColor: eucalyptusGreenColor,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    alignSelf: "flex-start",
    marginBottom: 2
  }
});

export default TextLink;
