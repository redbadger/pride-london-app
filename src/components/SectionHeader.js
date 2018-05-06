// @flow
import React from "react";
import { StyleSheet, View } from "react-native";
import ContentPadding from "./ContentPadding";
import Text from "./Text";
import NumberBadge from "./NumberBadge";
import { sectionHeaderShadow, sectionHeaderBgColor } from "../constants/colors";

type Props = { title: string, hasShadow?: boolean, badgeValue?: ?number };

const SectionHeader = ({ title, hasShadow, badgeValue }: Props) => {
  const containerStyles = hasShadow
    ? [styles.sectionHeader, styles.shadow]
    : styles.sectionHeader;
  const showBadge = badgeValue != null;
  return (
    <ContentPadding style={containerStyles}>
      <Text
        type="h2"
        color="lightNavyBlueColor"
        accessible
        accessibilityTraits={["header"]}
      >
        {title}
      </Text>
      {showBadge ? (
        <View style={styles.badgeWrapper}>
          <NumberBadge value={((badgeValue: any): number)} />
        </View>
      ) : (
        <View />
      )}
    </ContentPadding>
  );
};
SectionHeader.defaultProps = {
  hasShadow: true,
  badgeValue: undefined
};

const styles = StyleSheet.create({
  sectionHeader: {
    minHeight: 40,
    alignItems: "center",
    backgroundColor: sectionHeaderBgColor,
    flexDirection: "row"
  },
  shadow: {
    marginBottom: 6,
    // The below properties are required for ioS shadow
    shadowColor: sectionHeaderShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    // The below properties are required for android shadow
    borderWidth: 0,
    elevation: 3
  },
  badgeWrapper: {
    marginLeft: 6
  }
});

export default SectionHeader;
