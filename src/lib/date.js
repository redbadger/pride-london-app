// @flow
import { DateTime, Interval } from "luxon";

import DfFormat from "date-fns/format";
import DFParse from "date-fns/parse";
import DfDifferenceInCalendarDays from "date-fns/difference_in_calendar_days";

const contentfulISOFormatOptions = {
  suppressMilliseconds: true,
  suppressSeconds: true
};

// export const toFormat = (date: string, format: string) =>
//   DateTime.fromISO(date).toFormat(format);

export const isBefore = (d1: string, d2: string) =>
  +DateTime.fromISO(d1) < +DateTime.fromISO(d2);

export const addDays = (date: string, days: number) =>
  DateTime.fromISO(date)
    .plus({ days })
    .toISO(contentfulISOFormatOptions);

export const isSameDay = (d1: string, d2: string) =>
  DateTime.fromISO(d1).hasSame(DateTime.fromISO(d2), "day");

export const toFormat = (date: string | Date, format: string) =>
  DfFormat(date, format);

export const parse = (date: string | Date) => DFParse(date);

export const compareAsc = (d1: string, d2: string) => {
  const coercedD1 = +DateTime.fromISO(d1);
  const coercedD2 = +DateTime.fromISO(d2);
  if (coercedD1 < coercedD2) {
    return -1;
  }
  if (coercedD1 > coercedD2) {
    return 1;
  }
  return 0;
};

export const areRangesOverlapping = (
  d1Start: string,
  d1End: string,
  d2Start: string,
  d2End: string
) => {
  const range1 = Interval.fromDateTimes(
    DateTime.fromISO(d1Start),
    DateTime.fromISO(d1End)
  );
  const range2 = Interval.fromDateTimes(
    DateTime.fromISO(d2Start),
    DateTime.fromISO(d2End)
  );

  return range1.overlaps(range2);
};

export const startOfDay = (date: string) =>
  DateTime.fromISO(date)
    .startOf("day")
    .toISO(contentfulISOFormatOptions);

export const endOfDay = (date: string) =>
  DateTime.fromISO(date)
    .endOf("day")
    .toISO(contentfulISOFormatOptions);

export const getHours = (date: string) => DateTime.fromISO(date).hour;

export const differenceInCalendarDays = (
  d1: string | Date,
  d2: string | Date
) => DfDifferenceInCalendarDays(d1, d2);
