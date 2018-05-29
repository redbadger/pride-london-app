// @flow
import { combineReducers } from "redux";
import { DateTime } from "luxon";
import events from "./events";
import type { State as EventsState } from "./events";
import EventFilters from "./event-filters";
import type { State as EventFiltersState } from "../data/event-filters";
import savedEvents from "./saved-events";
import type { SavedEvents as SavedEventsState } from "../data/event";

export type State = {
  events: EventsState,
  eventFilters: EventFiltersState,
  savedEvents: SavedEventsState
};

export default combineReducers({
  events,
  eventFilters: EventFilters(DateTime.local),
  savedEvents
});
