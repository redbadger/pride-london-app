// @flow
import {
  buildDateRangeFilter,
  buildTimeFilter,
  buildPriceFilter,
  buildStringSetFilter,
  buildAreaFilter,
  buildCategoryFilter
} from "./basic-event-filters";
import type { Event } from "../data/event";
import type { Time } from "../data/date-time";
import type { State } from "../reducers";
import type { Area } from "../data/event-filters";

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

const buildAreasFilter = (areas: Area[]) => {
  const filters = areas.map(area => buildAreaFilter(area));
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
    venueDetails,
    accessibilityOptions,
    area,
    categories
  } = getEventFiltersState(state, selectStagedFilters);
  const timeArray = Array.from(timeOfDay);
  const areaArray = Array.from(area);
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
  const accessibilityOptionsFilter: (event: Event) => boolean =
    accessibilityOptions.size > 0
      ? buildStringSetFilter("accessibilityOptions", accessibilityOptions)
      : () => true;
  const areaFilter: (event: Event) => boolean =
    areaArray.length > 0 ? buildAreasFilter(areaArray) : () => true;
  const categoryFilter: (event: Event) => boolean =
    categories.size > 0 ? buildCategoryFilter(categories) : () => true;

  return (event: Event) =>
    dateFilter(event) &&
    timeFilter(event) &&
    priceFilter(event) &&
    audienceFilter(event) &&
    venueDetailsFilter(event) &&
    accessibilityOptionsFilter(event) &&
    areaFilter(event) &&
    categoryFilter(event);
};
