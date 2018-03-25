// @flow
import type { Reducer } from "redux";
import type { DateOrDateRange, Time } from "../data/date-time";
import type { EventFiltersAction } from "../actions/event-filters";

export type State = {
  date: ?DateOrDateRange,
  time: Set<Time>,
  categories: Set<String>
};

const defaultState = {
  categories: new Set(), // When this is empty it signifies no category filter.
  date: null,
  time: new Set()
};

const eventFilters: Reducer<State, EventFiltersAction> = (
  state: State = defaultState,
  action: EventFiltersAction
) => {
  switch (action.type) {
    case "UPDATE_EVENT_FILTERS":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default eventFilters;
