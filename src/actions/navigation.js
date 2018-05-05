// @flow
import type { Dispatch } from "redux";
import type { NavigationState } from "react-navigation";

export const NAVIGATION = "NAVIGATION";

type NavigationActionType = "NAVIGATION";

export type NavigationAction = { type: NavigationActionType, route: string };

const getCurrentRouteName = (navigationState: NavigationState): string => {
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
};

export const navigate = (dispatch: Dispatch<NavigationAction>) => (
  prevState: NavigationState,
  currentState: NavigationState
) => {
  const currentScreen = getCurrentRouteName(currentState);
  const prevScreen = getCurrentRouteName(prevState);

  if (typeof currentScreen === "string" && prevScreen !== currentScreen) {
    dispatch({ type: "NAVIGATION", route: currentScreen });
  }
};
