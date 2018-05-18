// @flow
import { Platform } from "react-native";

const checkboxAccessibilityLabel = (label: string, checked: boolean) =>
  Platform.select({
    ios: checked ? `${label}, checkbox, selected` : `${label}, checkbox, empty`,
    android: checked
      ? `checked checkbox, ${label}`
      : `not checked checkbox, ${label}`
  });

export default checkboxAccessibilityLabel;
