// @flow
import {
  areRangesOverlapping,
  startOfDay,
  endOfDay,
  getHours,
  diff as dateDiff
} from "../lib/date";
import { selectEventIsFree } from "./event";
import areaBoundaries from "../data/areas";
import type { Event, EventCategoryName } from "../data/event";
import type { DateRange, Time } from "../data/date-time";
import type { Area, StringFilterSet } from "../data/event-filters";

export const buildDateRangeFilter = (date: DateRange) => (event: Event) =>
  areRangesOverlapping(
    startOfDay(date.startDate),
    endOfDay(date.endDate),
    event.fields.startTime,
    event.fields.endTime
  );

type TimeFilter = (timeFilter: Time) => (event: Event) => boolean;

const rangeFromTime = (timeFilter: Time) => {
  switch (timeFilter) {
    case "morning":
      return [6, 12];
    case "afternoon":
      return [12, 18];
    case "evening":
      return [18, 30];
    default:
      return [0, 0];
  }
};

export const buildTimeFilter: TimeFilter = (timeFilter: Time) => event => {
  const [rangeMin, rangeMax] = rangeFromTime(timeFilter);
  const relativeRangeMax = rangeMax - rangeMin;
  const eventStartHour = getHours(event.fields.startTime);
  const eventDuration = dateDiff(
    event.fields.endTime,
    event.fields.startTime,
    "hours"
  ).hours;
  const relativeStartHour = (eventStartHour - rangeMin) % 24;
  const relativeEndHour = (relativeStartHour + eventDuration) % 24;
  return (
    (relativeStartHour >= 0 && relativeStartHour < relativeRangeMax) ||
    (relativeEndHour >= 0 && relativeEndHour < relativeRangeMax) ||
    (relativeEndHour >= 0 && relativeStartHour < 0) ||
    relativeEndHour < relativeStartHour
  );
};

export const buildCategoryFilter = (categories: Set<EventCategoryName>) => {
  if (categories.size === 0) {
    /* eslint-disable no-unused-vars */
    return (_: any) => true;
  }
  return (event: Event) =>
    event.fields.eventCategories.some(value =>
      categories.has(((value: any): EventCategoryName))
    );
};

export const buildPriceFilter = () => (event: Event) =>
  selectEventIsFree(event);

export const buildStringSetFilter = (
  fieldName: string,
  set: StringFilterSet
) => {
  if (set.size === 0) {
    /* eslint-disable no-unused-vars */
    return (_: any) => true;
  }
  return (event: Event) =>
    event.fields[fieldName]
      ? event.fields[fieldName].some(value => set.has(value))
      : false;
};

export const buildAreaFilter = (area: Area) => {
  switch (area) {
    case "North":
      return (event: Event) =>
        event.fields.location.lat >= areaBoundaries.northLatBoundary;
    case "East":
      return (event: Event) =>
        event.fields.location.lon >= areaBoundaries.eastLonBoundary;
    case "South":
      return (event: Event) =>
        event.fields.location.lat <= areaBoundaries.southLatBoundary;
    case "West":
      return (event: Event) =>
        event.fields.location.lon <= areaBoundaries.westLonBoundary;
    case "Central":
      return (event: Event) => {
        const { lat, lon } = event.fields.location;
        return (
          lat < areaBoundaries.northLatBoundary &&
          lon < areaBoundaries.eastLonBoundary &&
          lat > areaBoundaries.southLatBoundary &&
          lon > areaBoundaries.westLonBoundary
        );
      };
    default:
      /* eslint-disable no-unused-vars */
      return (_: any) => true;
  }
};
