// @flow
import React from "react";
import type { Node } from "react";
import { StatusBar } from "react-native";
import SafeAreaView from "react-native-safe-area-view";

type Props = {
  backgroundColor: string,
  children: Node
};

const Header = ({ backgroundColor, children }: Props) => (
  <SafeAreaView accessibilityTraits={["header"]} style={{ backgroundColor }}>
    <StatusBar
      barStyle="light-content"
      animated
      backgroundColor={backgroundColor}
    />
    {children}
  </SafeAreaView>
);

export default Header;
