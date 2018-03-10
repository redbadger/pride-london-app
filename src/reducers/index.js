// @flow
import { combineReducers } from "redux";
import events from "./events";
import type { State as EventsState } from "./events";

export type State = {
  events: EventsState
};

export default combineReducers({
  events
});
