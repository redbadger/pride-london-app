// @flow
/* eslint-disable import/prefer-default-export */

import type { ComponentType } from "react";
import { withNavigationFocus as rnWithNavigationFocus } from "react-navigation";
import type { NavigationScreenProp, NavigationState } from "react-navigation";

export type NavigationProps = {
  navigation: NavigationScreenProp<NavigationState>,
  isFocused: boolean
};

// React Navigation has types for this function, but they don't work properly
// https://github.com/react-navigation/react-navigation/blob/05cbd85d5ce2f9775a2cc7c76a206c7e6d224508/flow/react-navigation.js#L1120

// Do you get a flow error?
// Your connector props most likely don't match the component props.
export const withNavigationFocus = <Props>(
  Component: ComponentType<Props & NavigationProps>
): ComponentType<$Diff<Props, NavigationProps>> => // HELLO: If flow error, read comment above
  rnWithNavigationFocus(Component);
