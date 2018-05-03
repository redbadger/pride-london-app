// @flow
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import type { Node } from "react";
import SafeAreaView from "react-native-safe-area-view";
import ContentPadding from "./ContentPadding";
import IconButton from "./IconButton";
import Text from "./Text";
import chevronLeftWhite from "../../assets/images/chevron-left-white.png";
import { lightNavyBlueColor } from "../constants/colors";
import text from "../constants/text";

type Props = {
  onBack?: () => void,
  title?: string,
  rightElement?: Node
};

const renderBackButton = onBack => (
  <IconButton
    accessibilityLabel={text.backButtonAccessibilityLabel}
    onPress={onBack}
    source={chevronLeftWhite}
  />
);

const renderTitle = (title: string) => (
  <Text type="h2" color="whiteColor">
    {title}
  </Text>
);

const Header = ({ onBack, title, rightElement }: Props) => {
  const leftElement = onBack ? (
    renderBackButton(onBack)
  ) : (
    <View style={styles.phantomIcon} />
  );
  const titleElement = title ? renderTitle(title) : null;
  return (
    <SafeAreaView
      accessibilityTraits={["header"]}
      style={{ backgroundColor: lightNavyBlueColor }}
    >
      <StatusBar
        barStyle="light-content"
        animated
        backgroundColor={lightNavyBlueColor}
      />
      <ContentPadding style={styles.headerContent}>
        {leftElement}
        {titleElement}
        {rightElement || <View style={styles.phantomIcon} />}
      </ContentPadding>
    </SafeAreaView>
  );
};

Header.defaultProps = {
  title: undefined,
  onBack: undefined,
  rightElement: undefined
};

const styles = StyleSheet.create({
  headerContent: {
    height: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  phantomIcon: {
    width: 48,
    height: 48
  }
});

export default Header;
