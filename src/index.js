// @flow
import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import { getEvents } from "./actions";
import App from "./App";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

class AppWrapper extends Component<{}> {
  componentDidMount() {
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
