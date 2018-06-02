// @flow
import type { Reducer } from "redux";
import SplashScreen from "react-native-splash-screen";
import type { DataAction } from "../actions/data";

type State = void;

const splashScreen: Reducer<State, DataAction> = (
  state: State = undefined,
  action: DataAction
) => {
  // We want to hide the splash screen on "INIT"
  // eventually and give a nice indication that data
  // is still loading.
  if (action.type === "RECEIVE_CMS_DATA") {
    SplashScreen.hide();
  }

  return state;
};

export default splashScreen;
