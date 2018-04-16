// @flow
import React from "react";
import { StyleSheet, View } from "react-native";
import ContentPadding from "./ContentPadding";
import Text from "./Text";
import {
  sectionHeaderShadow,
  sectionHeaderBgColor,
  sectionHeaderTextColor,
  eucalyptusGreenColor,
  lightNavyBlueColor
} from "../constants/colors";

type Props = { title: string, hasShadow?: boolean, badgeText?: string };

const SectionHeader = ({ title, hasShadow, badgeText }: Props) => {
  const containerStyles = hasShadow
    ? [styles.sectionHeader, styles.shadow]
    : styles.sectionHeader;
  return (
    <ContentPadding style={containerStyles}>
      <Text type="h2" style={styles.sectionHeaderText}>
        {title}
      </Text>
      {badgeText &&
        badgeText.length > 0 && (
          <View style={styles.pingContainer}>
            <Text type="xSmall" style={styles.badgeText}>
              {badgeText}
            </Text>
          </View>
        )}
    </ContentPadding>
  );
};
SectionHeader.defaultProps = {
  hasShadow: true,
  badgeText: ""
};

const styles = StyleSheet.create({
  sectionHeader: {
    height: 40,
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
  sectionHeaderText: {
    color: sectionHeaderTextColor
  },
  pingContainer: {
    backgroundColor: eucalyptusGreenColor,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginLeft: 6
  },
  badgeText: { color: lightNavyBlueColor }
});

export default SectionHeader;
