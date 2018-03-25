// @flow
import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import SplashScreen from "react-native-splash-screen";
import reducers from "./reducers";
import { getEvents } from "./actions/events";
import App from "./App";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

class AppWrapper extends Component<{}> {
  componentDidMount() {
    SplashScreen.hide();
    store.dispatch(getEvents());
  }
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default AppWrapper;
