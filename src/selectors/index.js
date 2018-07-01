// @flow
import { createSelector } from "reselect";
import type { State } from "../reducers";
import type { State as DataState } from "../reducers/data";
import type { SavedEvents } from "../data/event";
import type { State as EventFiltersState } from "../data/event-filters";
import {
  selectEvents,
  selectEventsMap,
  selectFeaturedEvents,
  selectFeaturedEventsByTitle,
  selectAmenities,
  resolveEvents
} from "./data";
import { filterEvents, getStages } from "./event";
import {
  buildEventFilter,
  selectShowEventsAfter,
  selectSelectedFilters,
  selectStagedFilters,
  eventIsAfter
} from "./event-filters";

export const selectData = (state: State): DataState => state.data;
export const selectEventFilters = (state: State): EventFiltersState =>
  state.eventFilters;
export const selectSavedEvents = (state: State): SavedEvents =>
  state.savedEvents;

const getEvents = createSelector([selectData], selectEvents);

const getShowEventsAfter = createSelector(
  [selectEventFilters],
  selectShowEventsAfter
);

export const getSelectedFilters = createSelector(
  [selectEventFilters],
  selectSelectedFilters
);

export const getStagedFilters = createSelector(
  [selectEventFilters],
  selectStagedFilters
);

export const getSelectedFilter = createSelector(
  [getShowEventsAfter, getSelectedFilters],
  buildEventFilter
);

export const selectFilteredEvents = createSelector(
  [getEvents, getSelectedFilter],
  filterEvents
);

export const getEventsMap = createSelector([getEvents], selectEventsMap);

const getStagedFilter = createSelector(
  [getShowEventsAfter, getStagedFilters],
  buildEventFilter
);

export const selectStagedFilteredEvents = createSelector(
  [getEvents, getStagedFilter],
  filterEvents
);

const getShowEventsAfterFilter = createSelector(
  [getShowEventsAfter],
  eventIsAfter
);

const selectFutureEvents = createSelector(
  [getEvents, getShowEventsAfterFilter],
  filterEvents
);

export const getFutureEventsMap = createSelector(
  [selectFutureEvents],
  selectEventsMap
);

const getFeaturedEvents = createSelector([selectData], selectFeaturedEvents);
const second = (a, b) => b;
const getFeaturedEventsByTitle = createSelector(
  [getFeaturedEvents, second],
  selectFeaturedEventsByTitle
);
const getFeaturedEventsEvents = createSelector(
  [getFeaturedEventsByTitle],
  featuredEvents => {
    if (featuredEvents) {
      return featuredEvents.fields.events;
    }
    return [];
  }
);
export const getFeaturedEventsResolvedEvents = createSelector(
  [getFutureEventsMap, getFeaturedEventsEvents],
  resolveEvents
);

export const selectStages = createSelector([getEvents], getStages);

export const getAmenities = createSelector([selectData], selectAmenities);
