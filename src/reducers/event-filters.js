// @flow
import type { Reducer } from "redux";
import type { DateOrDateRange, Time } from "../data/date-time";
import type { EventFiltersAction } from "../actions/event-filters";

export type FilterCollection = {
  date: ?DateOrDateRange,
  timeOfDay: Set<Time>,
  categories: Set<string>,
  price: Set<string>,
  audience: Set<string>,
  venueDetails: Set<string>
};

export type State = {
  selectedFilters: FilterCollection,
  stagedFilters: FilterCollection
};

const defaultState = {
  selectedFilters: {
    categories: new Set(), // When this is empty it signifies no category filter.
    date: null,
    timeOfDay: new Set(),
    price: new Set(),
    audience: new Set(),
    venueDetails: new Set()
  },
  stagedFilters: {
    categories: new Set(), // When this is empty it signifies no category filter.
    date: null,
    timeOfDay: new Set(),
    price: new Set(),
    audience: new Set(),
    venueDetails: new Set()
  }
};

const eventFilters: Reducer<State, EventFiltersAction> = (
  state: State = defaultState,
  action: EventFiltersAction
) => {
  switch (action.type) {
    case "STAGE_EVENT_FILTERS":
      return {
        ...state,
        stagedFilters: {
          ...state.stagedFilters,
          ...action.payload
        }
      };
    case "COMMIT_EVENT_FILTERS":
      return {
        ...state,
        selectedFilters: state.stagedFilters
      };
    case "CLEAR_STAGED_EVENT_FILTERS":
      return {
        ...state,
        stagedFilters: state.selectedFilters
      };
    default:
      return state;
  }
};

export default eventFilters;
