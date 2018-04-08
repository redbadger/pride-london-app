// @flow
import areRangesOverlapping from "date-fns/are_ranges_overlapping";
import endOfDay from "date-fns/end_of_day";
import getHours from "date-fns/get_hours";
import startOfDay from "date-fns/start_of_day";
import type { Event } from "../data/event";
import type { DateRange, Time } from "../data/date-time";

const locale = "en-GB";

export const buildDateFilter = (date: string) => (event: Event) =>
  areRangesOverlapping(
    startOfDay(date),
    endOfDay(date),
    event.fields.startTime[locale],
    event.fields.endTime[locale]
  );

export const buildDateRangeFilter = (date: DateRange) => (event: Event) =>
  areRangesOverlapping(
    startOfDay(date.startDate),
    endOfDay(date.endDate),
    event.fields.startTime[locale],
    event.fields.endTime[locale]
  );

export const buildTimeFilter = (time: Time) => {
  if (time === "morning") {
    return (event: Event) => getHours(event.fields.startTime[locale]) < 12;
  } else if (time === "afternoon") {
    return (event: Event) =>
      getHours(event.fields.startTime[locale]) < 18 &&
      getHours(event.fields.endTime[locale]) > 12;
  }

  // time === "evening"
  return (event: Event) => getHours(event.fields.endTime[locale]) >= 18;
};

export const buildCategoryFilter = (categories: Set<string>) => {
  if (categories.size === 0) {
    /* eslint-disable no-unused-vars */
    return (_: any) => true;
  }
  return (event: Event) =>
    event.fields.eventCategories[locale].some(value => categories.has(value));
};

export const buildPriceFilter = () => (event: Event) =>
  event.fields.eventPriceLow[locale] === 0 &&
  event.fields.eventPriceHigh[locale] === 0;
