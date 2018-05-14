// @flow
// import { DateTime } from "luxon";

import DfFormat from "date-fns/format";
import DfIsBefore from "date-fns/is_before";
import DfAddDays from "date-fns/add_days";
import DFParse from "date-fns/parse";
import DfIsSameDay from "date-fns/is_same_day";
import DfDateComparator from "date-fns/compare_asc";
import DfAreRangesOverlapping from "date-fns/are_ranges_overlapping";
import DfStartOfDay from "date-fns/start_of_day";
import DfEndOfDay from "date-fns/end_of_day";
import DfGetHours from "date-fns/get_hours";
import DfDifferenceInCalendarDays from "date-fns/difference_in_calendar_days";

// export const toFormat = (date: string, format: string) =>
//   DateTime.fromISO(date).toFormat(format);

// export const isBefore = (d1: string, d2: string) =>
//   DateTime.fromISO(d1) < DateTime.fromISO(d2);

// export const addDays = (date: string, days: number) =>
//   DateTime.fromISO(date).add({ days });

// export const isSameDay = (d1: string, d2: string) => DateTime.fromISO(d1).hasSame(d2, 'day');

export const toFormat = (date: string, format: string) =>
  DfFormat(date, format);

export const isBefore = (d1: string, d2: string) => DfIsBefore(d1, d2);

export const isSameDay = (d1: string, d2: string) => DfIsSameDay(d1, d2);

export const addDays = (date: string, days: number) => DfAddDays(date, days);

export const parse = (date: string | Date) => DFParse(date);

export const compareAsc = (d1: string, d2: string) => DfDateComparator(d1, d2);

export const areRangesOverlapping = (
  d1Start: string | Date,
  d1End: string | Date,
  d2Start: string | Date,
  d2End: string | Date
) => DfAreRangesOverlapping(d1Start, d1End, d2Start, d2End);

export const startOfDay = (date: string) => DfStartOfDay(date);

export const endOfDay = (date: string) => DfEndOfDay(date);

export const getHours = (date: string | Date) => DfGetHours(date);

export const differenceInCalendarDays = (d1: string, d2: string) =>
  DfDifferenceInCalendarDays(d1, d2);
