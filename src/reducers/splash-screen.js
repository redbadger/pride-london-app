// @flow
import type { Reducer } from "redux";
import type { DataAction } from "../actions/data";
import type { SplashScreenAction } from "../actions/splash-screen";

export type State = "showing" | "hiding" | "hidden";
const defaultState = "showing";

type SupportedAction = DataAction | SplashScreenAction;

const splashScreen: Reducer<State, SupportedAction> = (
  state: State = defaultState,
  action: SupportedAction
) => {
  if (action.type === "RECEIVE_CMS_DATA" && state === "showing") {
    return "hiding";
  }

  if (action.type === "HIDE_SPLASH_SCREEN") {
    return "hidden";
  }

  return state;
};

export default splashScreen;
