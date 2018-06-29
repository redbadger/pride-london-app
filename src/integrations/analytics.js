// @flow
import { NativeModules } from "react-native";
import type { MiddlewareActions } from "../actions";
import { INIT } from "../actions";
import { NAVIGATION } from "../actions/navigation";
import { HOME } from "../constants/routes";

const { Analytics } = NativeModules;

const trackEvent = (action: MiddlewareActions) => {
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

const analytics = () => (next: MiddlewareActions => mixed) => (
  action: MiddlewareActions
) => {
  trackEvent(action);
  return next(action);
};

export default analytics;
