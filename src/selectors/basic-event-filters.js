// @flow
import areRangesOverlapping from "date-fns/are_ranges_overlapping";
import endOfDay from "date-fns/end_of_day";
import getHours from "date-fns/get_hours";
import startOfDay from "date-fns/start_of_day";
import { selectEventIsFree } from "./event";
import areaBoundaries from "../data/areas";
import type { Event, EventCategoryName } from "../data/event";
import type { DateRange, Time } from "../data/date-time";
import type { Area, StringFilterSet } from "../data/event-filters";

import locale from "../data/locale";

export const buildDateRangeFilter = (date: DateRange) => (event: Event) =>
  areRangesOverlapping(
    startOfDay(date.startDate),
    endOfDay(date.endDate),
    event.fields.startTime[locale],
    event.fields.endTime[locale]
  );

function* range(num, end, step = 1): Array<number> {
  while (num < end) {
    yield num;
    num += step;
  }
}

const morningHours = Array.from(range(0, 11));
const afternoonHours = Array.from(range(12, 17));
const eveningHours = Array.from(range(18, 23));

type TimeFilter = (timeFilter: Time) => (event: Event) => any;
/* eslint-disable consistent-return */
export const buildTimeFilter: TimeFilter = timeFilter => event => {
  const start = getHours(event.fields.startTime[locale]);
  const end = getHours(event.fields.endTime[locale]);
  switch (timeFilter) {
    case "morning":
      return morningHours.some(x => x === start);
    case "afternoon":
      return afternoonHours.some(x => {
        const updateEnd = end <= start ? 24 : end;
        return Array.from(range(start, updateEnd)).some(
          eventHour => eventHour === x
        );
      });
    case "evening":
      return eveningHours.some(x => {
        const updateEnd = end <= start ? 24 : end;
        return Array.from(range(start, updateEnd)).some(
          eventHour => eventHour === x
        );
      });
    default:
      return false;
  }
};

export const buildCategoryFilter = (categories: Set<EventCategoryName>) => {
  if (categories.size === 0) {
    /* eslint-disable no-unused-vars */
    return (_: any) => true;
  }
  return (event: Event) =>
    event.fields.eventCategories[locale].some(value =>
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
      ? event.fields[fieldName][locale].some(value => set.has(value))
      : false;
};

export const buildAreaFilter = (area: Area) => {
  switch (area) {
    case "North":
      return (event: Event) =>
        event.fields.location[locale].lat >= areaBoundaries.northLatBoundary;
    case "East":
      return (event: Event) =>
        event.fields.location[locale].lon >= areaBoundaries.eastLonBoundary;
    case "South":
      return (event: Event) =>
        event.fields.location[locale].lat <= areaBoundaries.southLatBoundary;
    case "West":
      return (event: Event) =>
        event.fields.location[locale].lon <= areaBoundaries.westLonBoundary;
    case "Central":
      return (event: Event) => {
        const { lat, lon } = event.fields.location[locale];
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
