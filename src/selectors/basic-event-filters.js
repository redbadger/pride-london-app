// @flow
import areRangesOverlapping from "date-fns/are_ranges_overlapping";
import endOfDay from "date-fns/end_of_day";
import getHours from "date-fns/get_hours";
import startOfDay from "date-fns/start_of_day";
import getDate from "date-fns/get_date";
import isAfter from "date-fns/is_after";
import { range } from "ramda";
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

const morningHours = range(6, 12);
const afternoonHours = range(12, 18);
const eveningHours = [...range(18, 24), ...range(0, 6)];

type TimeFilter = (timeFilter: Time) => (event: Event) => boolean;
/* eslint-disable consistent-return */
export const buildTimeFilter: TimeFilter = timeFilter => event => {
  const start = getHours(event.fields.startTime[locale]);
  const end = getHours(event.fields.endTime[locale]);
  const multiDayEvent = isAfter(
    getDate(event.fields.endTime[locale]),
    getDate(event.fields.startTime[locale])
  );
  switch (timeFilter) {
    case "morning":
      return morningHours.some(morningHour => {
        if (multiDayEvent) {
          return [...range(start, 24), ...range(0, end)].some(
            eventHour => eventHour === morningHour
          );
        }
        return range(start, end).some(eventHour => eventHour === morningHour);
      });
    case "afternoon":
      return afternoonHours.some(afternoonHour => {
        if (multiDayEvent) {
          return [...range(start, 24), ...range(0, end)].some(
            eventHour => eventHour === afternoonHour
          );
        }
        return range(start, end).some(eventHour => eventHour === afternoonHour);
      });
    case "evening":
      return eveningHours.some(eveningHour => {
        if (multiDayEvent) {
          return [...range(start, 24), ...range(0, end)].some(
            eventHour => eventHour === eveningHour
          );
        }
        return range(start, end).some(eventHour => eventHour === eveningHour);
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
