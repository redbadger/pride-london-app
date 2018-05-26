// @flow
import "core-js/modules/es7.string.pad-start";
import React, { Component } from "react";
import { YellowBox, AppState } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import Config from "react-native-config";
import { Client, Configuration } from "bugsnag-react-native";

import analytics from "./integrations/analytics";
import reducers from "./reducers";
import { init } from "./actions";
import { getEvents, backgroundRefreshEvents } from "./actions/events";
import { loadSavedEvents } from "./actions/saved-events";
import { navigate } from "./actions/navigation";
import App from "./App";

const bugsnagConfiguration = new Configuration();
bugsnagConfiguration.releaseStage = Config.RELEASE_STAGE
  ? Config.RELEASE_STAGE
  : "dev";
// Only send reports for releases from master branch
bugsnagConfiguration.notifyReleaseStages = ["beta", "release"];
const bugsnag = new Client(bugsnagConfiguration); // eslint-disable-line no-unused-vars

// https://github.com/react-navigation/react-navigation/issues/3956#issuecomment-380648083
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk, analytics))
);

const handleNavigationChange = navigate(store.dispatch);

const handleAppStateChange = () => {
  if (AppState.currentState === "active")
    store.dispatch(backgroundRefreshEvents());
};

class AppWrapper extends Component<{}> {
  componentDidMount() {
    store.dispatch(init());
    store.dispatch(getEvents(SplashScreen.hide));
    store.dispatch(loadSavedEvents());
    AppState.addEventListener("change", handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", handleAppStateChange);
  }

  render() {
    return (
      <Provider store={store}>
        <App onNavigationStateChange={handleNavigationChange} />
      </Provider>
    );
  }
}

export default AppWrapper;
