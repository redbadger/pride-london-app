// @flow
import {
  buildDateRangeFilter,
  buildTimeFilter,
  buildPriceFilter,
  buildStringSetFilter
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
) => getEventFiltersState(state, selectStagedFilters).timeOfDay;

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
  const {
    date,
    timeOfDay,
    price,
    audience,
    venueDetails
  } = getEventFiltersState(state, selectStagedFilters);
  const timeArray = Array.from(timeOfDay);
  const dateFilter: (event: Event) => boolean = date
    ? buildDateRangeFilter(date)
    : () => true;
  const timeFilter: (event: Event) => boolean =
    timeArray.length > 0 && timeArray.length < 3
      ? buildTimesFilter(timeArray)
      : () => true;
  const priceFilter: (event: Event) => boolean = price.has("free")
    ? buildPriceFilter()
    : () => true;
  const audienceFilter: (event: Event) => boolean =
    audience.size > 0 ? buildStringSetFilter("audience", audience) : () => true;
  const venueDetailsFilter: (event: Event) => boolean =
    venueDetails.size > 0
      ? buildStringSetFilter("venueDetails", venueDetails)
      : () => true;

  return (event: Event) =>
    dateFilter(event) &&
    timeFilter(event) &&
    priceFilter(event) &&
    audienceFilter(event) &&
    venueDetailsFilter(event);
};
