// @flow
import React from "react";
import { StyleSheet, View } from "react-native";
import type { Node } from "react";
import ContentPadding from "./ContentPadding";
import IconButton from "./IconButton";
import Text from "./Text";
import chevronLeftWhite from "../../assets/images/chevron-left-white.png";
import { lightNavyBlueColor } from "../constants/colors";
import text from "../constants/text";

type Props = {
  leftElement?: Node,
  title?: string,
  rightElement?: Node,
  testID?: string,
  titleLabel?: string
};

const Header = ({
  leftElement,
  title,
  rightElement,
  testID,
  titleLabel
}: Props) => (
  <View style={styles.container}>
    <ContentPadding style={styles.headerContent}>
      <View style={styles.first}>{leftElement}</View>
      <View style={styles.title}>
        <Text
          type="h2"
          color="whiteColor"
          testID={testID}
          accessible
          accessibilityLabel={titleLabel || title}
          accessibilityTraits={["header"]}
          accessibilityLiveRegion="polite"
        >
          {title}
        </Text>
      </View>
      <View style={styles.last}>{rightElement}</View>
    </ContentPadding>
  </View>
);

Header.defaultProps = {
  leftElement: undefined,
  title: undefined,
  rightElement: undefined,
  testID: undefined,
  titleLabel: undefined
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightNavyBlueColor
  },
  headerContent: {
    height: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    maxWidth: 440,
    width: "100%"
  },
  title: {
    flex: 0,
    alignItems: "center",
    paddingTop: 4
  },
  first: {
    flex: 1,
    alignItems: "flex-start",
    marginRight: "auto"
  },
  last: {
    flex: 1,
    alignItems: "flex-end",
    marginLeft: "auto"
  }
});

type BackButtonProps = {
  onPress: () => void
};

Header.BackButton = ({ onPress }: BackButtonProps) => (
  <IconButton
    accessibilityLabel={text.backButtonAccessibilityLabel}
    onPress={onPress}
    source={chevronLeftWhite}
  />
);

export default Header;
