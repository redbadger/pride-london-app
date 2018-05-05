// @flow
import { NativeModules } from "react-native";
import type { InitAction } from "../actions";
import { INIT } from "../actions";
import type { NavigationAction } from "../actions/navigation";
import { NAVIGATION } from "../actions/navigation";
import { HOME } from "../constants/routes";

const { Analytics } = NativeModules;

const trackEvent = (name, data) => {
  if (NativeModules.Analytics) {
    Analytics.trackEvent(name, data);
  }
};

type Action = NavigationAction | InitAction;

const analytics = () => (next: Action => mixed) => (action: Action) => {
  switch (action.type) {
    case INIT:
      trackEvent("Screen Event", { screen: HOME });
      break;
    case NAVIGATION:
      if (action.route) {
        trackEvent("Screen Event", { screen: action.route });
      }
      break;
    default:
      break;
  }
  return next(action);
};

export default analytics;
