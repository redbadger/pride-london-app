// @flow
import React from "react";
import type { Node } from "react";
import { View } from "react-native";
import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

type Props = {
  children: Node,
  style: ViewStyleProp
};

/**
 * On Android this view has no functionality because it is provided by the OS
 * already. We enabled this by setting android:windowSoftInputMode="adjustResize"
 * in AndroidManifest.xml.
 */
const KeyboardAvoidingView = ({ children, style }: Props) => (
  <View style={style}>{children}</View>
);

export default KeyboardAvoidingView;
