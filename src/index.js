import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import App from "./App";

const store = createStore(reducers, applyMiddleware(thunk));

const Application = (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Application;
