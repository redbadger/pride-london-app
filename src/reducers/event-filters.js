// @flow
import { DateTime } from "luxon";
import type { EventFiltersAction } from "../actions/event-filters";
import type { State } from "../data/event-filters";
import type { NavigationAction } from "../actions/navigation";
import type { InitAction } from "../actions";
import { NAVIGATION } from "../actions/navigation";
import { routesWithoutEvents } from "../constants/routes";

type Action = EventFiltersAction | NavigationAction | InitAction;

export const createEventFiltersState = (now: DateTime): State => ({
  showEventsAfter: now,
  selectedFilters: {
    categories: new Set(), // When this is empty it signifies no category filter.
    date: null,
    timeOfDay: new Set(),
    price: new Set(),
    audience: new Set(),
    venueDetails: new Set(),
    accessibilityOptions: new Set(),
    area: new Set()
  },
  stagedFilters: {
    categories: new Set(), // When this is empty it signifies no category filter.
    date: null,
    timeOfDay: new Set(),
    price: new Set(),
    audience: new Set(),
    venueDetails: new Set(),
    accessibilityOptions: new Set(),
    area: new Set()
  }
});

const EventFilters = (now: void => DateTime) => {
  const defaultState: State = createEventFiltersState(now());
  return (state: State = defaultState, action: Action): State => {
    let filters;
    switch (action.type) {
      case "SET_EVENT_FILTERS":
        filters = {
          ...state.stagedFilters,
          ...action.payload
        };
        return {
          ...state,
          stagedFilters: filters,
          selectedFilters: filters
        };
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
      case "CLEAR_EVENT_FILTERS":
        return {
          ...defaultState,
          showEventsAfter: state.showEventsAfter
        };
      case NAVIGATION:
        if (routesWithoutEvents.includes(action.route)) {
          const newTime = now();
          const diff = newTime
            .diff(state.showEventsAfter, "minutes")
            .as("minutes");
          if (diff >= 30) {
            return {
              ...state,
              showEventsAfter: newTime
            };
          }
          return state;
        }
        return state;
      default:
        return state;
    }
  };
};

export default EventFilters;
