// @flow
import { combineReducers } from "redux";
import events from "./events";
import type { State as EventsState } from "./events";
import eventFilters from "./event-filters";
import type { State as EventFiltersState } from "../data/event-filters";
import savedEvents from "./saved-events";
import type { State as SavedEventsState } from "./saved-events";

export type State = {
  events: EventsState,
  eventFilters: EventFiltersState,
  savedEvents: SavedEventsState
};

export default combineReducers({
  events,
  eventFilters,
  savedEvents
});
