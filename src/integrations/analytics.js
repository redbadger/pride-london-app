// @flow
import { NativeModules } from "react-native";
import type { InitAction } from "../actions";
import { INIT } from "../actions";
import type { NavigationAction } from "../actions/navigation";
import { NAVIGATION } from "../actions/navigation";
import { HOME } from "../constants/routes";

const { Analytics } = NativeModules;

const trackEvent = (action: Action) => {
  switch (action.type) {
    case INIT:
      Analytics.trackEvent("Screen Event", { screen: HOME });
      break;
    case NAVIGATION:
      if (action.route) {
        Analytics.trackEvent("Screen Event", { screen: action.route });
      }
      break;
    default:
      break;
  }
};

type Action = NavigationAction | InitAction;

const analytics = () => (next: Action => mixed) => (action: Action) => {
  trackEvent(action);
  return next(action);
};

export default analytics;
