// @flow
import type { Dispatch } from "redux";

type HideSplashScreenAction = { type: "HIDE_SPLASH_SCREEN" };

export type SplashScreenAction = HideSplashScreenAction;

const hideSplashScreen = () => async (
  dispatch: Dispatch<SplashScreenAction>
) => {
  dispatch({ type: "HIDE_SPLASH_SCREEN" });
};

export default hideSplashScreen;
