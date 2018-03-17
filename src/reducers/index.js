// @flow
import { combineReducers } from "redux";
import events from "./events";
import type { State as EventsState } from "./events";
import eventFilters from "./event-filters";
import type { State as EventFiltersState } from "./event-filters";

export type State = {
  events: EventsState,
  eventFilters: EventFiltersState
};

export default combineReducers({
  events,
  eventFilters
});
