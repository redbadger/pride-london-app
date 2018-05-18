import { Platform } from "react-native";

export const checkboxAccessibilityLabel = (label: string, checked: boolean) =>
  Platform.select({
    ios: checked ? `${label}, checkbox, selected` : `${label}, checkbox, empty`,
    android: checked
      ? `checked checkbox, ${label}`
      : `not checked checkbox, ${label}`
  });
