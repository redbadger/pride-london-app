// @flow
import type { ComponentType } from "react";
import { withNavigationFocus as rnWithNavigationFocus } from "react-navigation";
import type { NavigationScreenProp, NavigationState } from "react-navigation";

export type NavigationProps = {
  navigation: NavigationScreenProp<NavigationState>,
  isFocused: boolean
};

/* eslint-disable import/prefer-default-export */
export function withNavigationFocus<T>(
  Component: ComponentType<T & NavigationProps>
): ComponentType<$Diff<T, NavigationProps>> {
  return rnWithNavigationFocus(Component);
}
