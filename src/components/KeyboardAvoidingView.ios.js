// @flow
import React from "react";
import type { Node } from "react";
import { KeyboardAvoidingView as RnKeyboardAvoidingView } from "react-native";
import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

type Props = {
  children: Node,
  style: ViewStyleProp
};

const KeyboardAvoidingView = ({ children, style }: Props) => (
  <RnKeyboardAvoidingView behavior="padding" enabled style={style}>
    {children}
  </RnKeyboardAvoidingView>
);

export default KeyboardAvoidingView;
