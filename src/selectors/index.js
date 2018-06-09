// @flow
import { createSelector } from "reselect";
import type { CmsEntry } from "../integrations/cms";
import type { State } from "../reducers";
import type { State as DataState } from "../reducers/data";
import type { State as EventFiltersState } from "../data/event-filters";
import { filterEvents, selectEventsFromEntries } from "./events-deprecated";
import {
  buildEventFilter,
  selectShowEventsAfter,
  selectFilters,
  selectStagedFilters
} from "./event-filters";

export const selectData = (state: State): DataState => state.data;
export const selectEventFilters = (state: State): EventFiltersState =>
  state.eventFilters;

// The selectors below are temporary so that we can memoize across
// multiple components. This will be refactored.
const selectEntries = (data: DataState): CmsEntry[] => data.entries;

const getEntries = createSelector([selectData], selectEntries);
const getEvents = createSelector([getEntries], selectEventsFromEntries);

const getShowEventsAfter = createSelector(
  [selectEventFilters],
  selectShowEventsAfter
);
const getSelectedFilters = createSelector([selectEventFilters], selectFilters);
const getStagedFilters = createSelector(
  [selectEventFilters],
  selectStagedFilters
);

const getSelectedFilter = createSelector(
  [getShowEventsAfter, getSelectedFilters],
  buildEventFilter
);

export const selectFilteredEvents = createSelector(
  [getEvents, getSelectedFilter],
  filterEvents
);

const getStagedFilter = createSelector(
  [getShowEventsAfter, getStagedFilters],
  buildEventFilter
);

export const selectStagedFilteredEvents = createSelector(
  [getEvents, getStagedFilter],
  filterEvents
);
