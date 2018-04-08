// @flow
import {
  buildDateRangeFilter,
  buildTimeFilter,
  buildCategoryFilter
} from "./basic-event-filters";
import type { Event } from "../data/event";
import type { Time } from "../data/date-time";
import type { State } from "../reducers";

const getEventFiltersState = (state: State, selectStagedFilters: boolean) =>
  selectStagedFilters
    ? state.eventFilters.stagedFilters
    : state.eventFilters.selectedFilters;

export const selectDateFilter = (
  state: State,
  selectStagedFilters?: boolean = false
) => getEventFiltersState(state, selectStagedFilters).date;
export const selectTimeFilter = (
  state: State,
  selectStagedFilters?: boolean = false
) => getEventFiltersState(state, selectStagedFilters).time;

export const selectIsStagingFilters = (state: State): boolean =>
  state.eventFilters.stagedFilters !== state.eventFilters.selectedFilters;

const buildTimesFilter = (times: Time[]) => {
  const filters = times.map(time => buildTimeFilter(time));
  return (event: Event) => filters.some(filter => filter(event));
};

export const buildEventFilter = (
  state: State,
  selectStagedFilters?: boolean = false
) => {
  const { date, time, categories } = getEventFiltersState(
    state,
    selectStagedFilters
  );
  const timeArray = Array.from(time);
  const dateFilter: (event: Event) => boolean = date
    ? buildDateRangeFilter(date)
    : () => true;
  const timeFilter: (event: Event) => boolean =
    timeArray.length > 0 && timeArray.length < 3
      ? buildTimesFilter(timeArray)
      : () => true;
  const categoryFilter: (event: Event) => boolean =
    categories.size > 0 ? buildCategoryFilter(categories) : () => true;

  return (event: Event) =>
    dateFilter(event) && timeFilter(event) && categoryFilter(event);
};
