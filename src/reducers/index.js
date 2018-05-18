// @flow
import { combineReducers } from "redux";
import { DateTime } from "luxon";
import events from "./events";
import type { State as EventsState } from "./events";
import eventFilters from "./event-filters";
import type { State as EventFiltersState } from "../data/event-filters";
import savedEvents from "./saved-events";
import type { SavedEvents as SavedEventsState } from "../data/event";
import globalFilters from "./global-filters";
import type { State as GlobalFiltersState } from "./global-filters";

export type State = {
  events: EventsState,
  eventFilters: EventFiltersState,
  globalFilters: GlobalFiltersState,
  savedEvents: SavedEventsState
};

export default combineReducers({
  events,
  eventFilters,
  globalFilters: globalFilters(DateTime.local),
  savedEvents
});
