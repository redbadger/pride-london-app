// @flow
import type { Reducer } from "redux";
import SplashScreen from "react-native-splash-screen";
import type { DataAction } from "../actions/data";

export type State = boolean;
const defaultState = true;

const splashScreen: Reducer<State, DataAction> = (
  state: State = defaultState,
  action: DataAction
) => {
  // We want to hide the splash screen on "INIT"
  // eventually and give a nice indication that data
  // is still loading.
  if (action.type === "RECEIVE_CMS_DATA") {
    SplashScreen.hide();
    return false;
  }

  return state;
};

export default splashScreen;
