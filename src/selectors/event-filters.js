// @flow
import { DateTime } from "luxon";
import {
  buildDateRangeFilter,
  buildTimeFilter,
  buildPriceFilter,
  buildStringSetFilter,
  buildAreaFilter,
  buildCategoryFilter
} from "./basic-event-filters";
import tags from "../data/tags";
import type { Event } from "../data/event";
import type { Time } from "../data/date-time";
import type {
  Area,
  FilterCollection,
  State as EventFilters
} from "../data/event-filters";

export const selectShowEventsAfter = (eventFilters: EventFilters): DateTime =>
  eventFilters.showEventsAfter;

export const selectStagedFilters = (
  eventFilters: EventFilters
): FilterCollection => eventFilters.stagedFilters;

export const selectSelectedFilters = (
  eventFilters: EventFilters
): FilterCollection => eventFilters.selectedFilters;

export const selectDateFilter = (filters: FilterCollection) => filters.date;

export const selectTimeFilter = (filters: FilterCollection) =>
  filters.timeOfDay;

export const selectTagFilterSelectedCount = (filters: FilterCollection) =>
  Object.keys(tags).reduce(
    (acc, tagName) => acc + (filters[tagName] ? filters[tagName].size : 0),
    0
  );

const buildTimesFilter = (times: Time[]) => {
  const filters = times.map(time => buildTimeFilter(time));
  return (event: Event) => filters.some(filter => filter(event));
};

const buildAreasFilter = (areas: Area[]) => {
  const filters = areas.map(area => buildAreaFilter(area));
  return (event: Event) => filters.some(filter => filter(event));
};

export const eventIsAfter = (date: DateTime) => (event: Event) => {
  const endTime = DateTime.fromISO(event.fields.endTime);
  return DateTime.max(date, endTime) === endTime;
};

export const buildEventFilter = (
  showEventsAfter: DateTime,
  {
    date,
    timeOfDay,
    price,
    audience,
    venueDetails,
    accessibilityOptions,
    area,
    categories
  }: FilterCollection
): (Event => boolean) => {
  const timeArray = Array.from(timeOfDay);
  const areaArray = Array.from(area);
  const isAfter = eventIsAfter(showEventsAfter);
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
    isAfter(event) &&
    dateFilter(event) &&
    timeFilter(event) &&
    priceFilter(event) &&
    audienceFilter(event) &&
    venueDetailsFilter(event) &&
    accessibilityOptionsFilter(event) &&
    areaFilter(event) &&
    categoryFilter(event);
};
