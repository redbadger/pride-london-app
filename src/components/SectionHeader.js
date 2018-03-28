// @flow
import React from "react";
import { StyleSheet } from "react-native";
import ContentPadding from "./ContentPadding";
import Text from "./Text";
import {
  sectionHeaderShadow,
  sectionHeaderBgColor,
  sectionHeaderTextColor
} from "../constants/colors";

type Props = { title: string, hasShadow?: boolean };

const SectionHeader = ({ title, hasShadow }: Props) => {
  const containerStyles = hasShadow
    ? [styles.sectionHeader, styles.shadow]
    : styles.sectionHeader;
  return (
    <ContentPadding style={containerStyles}>
      <Text type="h2" style={styles.sectionHeaderText}>
        {title}
      </Text>
    </ContentPadding>
  );
};
SectionHeader.defaultProps = {
  hasShadow: true
};

const styles = StyleSheet.create({
  sectionHeader: {
    height: 40,
    justifyContent: "center",
    backgroundColor: sectionHeaderBgColor,

    marginBottom: 6
  },
  shadow: {
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
  }
});

export default SectionHeader;
