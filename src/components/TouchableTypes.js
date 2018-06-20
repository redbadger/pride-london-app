// @flow
import type { Node } from "react";
import type {
  AccessibilityComponentType,
  AccessibilityTrait
} from "react-native/Libraries/Components/View/ViewAccessibility";
import type { EdgeInsetsProp } from "react-native/Libraries/StyleSheet/EdgeInsetsPropType";
import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

export type TouchableProps = {
  children: Node,
  style?: ViewStyleProp,
  accessible?: boolean,
  accessibilityComponentType?: AccessibilityComponentType,
  accessibilityTraits?: AccessibilityTrait[],
  disabled?: boolean,
  onPress?: Function,
  onPressIn?: Function,
  onPressOut?: Function,
  onLongPress?: Function,
  delayPressIn?: number,
  delayPressOut?: number,
  delayLongPress?: number,
  pressRetentionOffset?: EdgeInsetsProp,
  hitSlop?: EdgeInsetsProp,
  testID?: string
};

/* eslint-disable import/prefer-default-export */
export const TouchableDefaultProps = {
  style: undefined,
  accessible: undefined,
  accessibilityComponentType: "button",
  accessibilityTraits: ["button"],
  disabled: undefined,
  onPress: undefined,
  onPressIn: undefined,
  onPressOut: undefined,
  onLongPress: undefined,
  delayPressIn: undefined,
  delayPressOut: undefined,
  delayLongPress: undefined,
  pressRetentionOffset: undefined,
  hitSlop: undefined,
  testID: undefined
};
