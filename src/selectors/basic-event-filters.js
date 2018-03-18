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

export const buildTimeFilter = (time: Time[]) => (event: Event) =>
  (time.includes("morning") && getHours(event.fields.startTime[locale]) < 12) ||
  (time.includes("afternoon") &&
    (getHours(event.fields.startTime[locale]) < 18 &&
      getHours(event.fields.endTime[locale]) > 12)) ||
  (time.includes("evening") && getHours(event.fields.endTime[locale]) >= 18);
