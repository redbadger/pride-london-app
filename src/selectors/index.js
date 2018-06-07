// @flow
import { createSelector } from "reselect";
import type { FilterCollection } from "../data/event-filters";
import type { CmsEntry } from "../integrations/cms";
import type { State } from "../reducers";
import type { State as DataState } from "../reducers/data";
import { filterEvents, selectEventsFromEntries } from "./events-deprecated";
import { buildEventFilter } from "./event-filters";

export const selectData = (state: State): DataState => state.data;

// The selectors below are temporary so that we can memoize across
// multiple components. This will be refactored.
const selectEntries = (data: DataState): CmsEntry[] => data.entries;

const getEntries = createSelector([selectData], selectEntries);
const getEvents = createSelector([getEntries], selectEventsFromEntries);
const selectFilterCollection = (state: State): FilterCollection =>
  state.eventFilters.selectedFilters;
const getFilter = createSelector([selectFilterCollection], buildEventFilter);

export const selectFilteredEvents = createSelector(
  [getEvents, getFilter],
  filterEvents
);

const selectStagedFilterCollection = (state: State): FilterCollection =>
  state.eventFilters.selectedFilters;
const getStagedFilter = createSelector(
  [selectStagedFilterCollection],
  buildEventFilter
);

export const selectStagedFilteredEvents = createSelector(
  [getEvents, getStagedFilter],
  filterEvents
);
