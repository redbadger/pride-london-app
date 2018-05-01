// @flow
import React from "react";
import { StyleSheet } from "react-native";
import Header from "./Header";
import ContentPadding from "./ContentPadding";
import Text from "./Text";
import { whiteColor, lightNavyBlueColor } from "../constants/colors";

export type Props = {
  title: string
};

const StandaloneHeader = ({ title }: Props) => (
  <Header backgroundColor={lightNavyBlueColor}>
    <ContentPadding style={styles.headerContent}>
      <Text type="h2" style={styles.headerTitle}>
        {title}
      </Text>
    </ContentPadding>
  </Header>
);

const styles = StyleSheet.create({
  headerContent: {
    height: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  headerTitle: {
    color: whiteColor
  }
});

export default StandaloneHeader;
