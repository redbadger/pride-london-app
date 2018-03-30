// @flow
import type { Reducer } from "redux";
import type { DateOrDateRange, Time } from "../data/date-time";
import type { EventFiltersAction } from "../actions/event-filters";

type FilterCollection = {
  date: ?DateOrDateRange,
  time: Set<Time>,
  categories: Set<string>
};

export type State = {
  selectedFilters: FilterCollection
};

const defaultState = {
  selectedFilters: {
    categories: new Set(), // When this is empty it signifies no category filter.
    date: null,
    time: new Set()
  }
};

const eventFilters: Reducer<State, EventFiltersAction> = (
  state: State = defaultState,
  action: EventFiltersAction
) => {
  switch (action.type) {
    case "UPDATE_EVENT_FILTERS":
      return {
        ...state,
        selectedFilters: {
          ...state.selectedFilters,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default eventFilters;
