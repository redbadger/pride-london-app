// @flow
import { DateTime as LuxonDateTime, Interval } from "luxon";
import type { DateTimeUnit } from "luxon";

export type DateTime = LuxonDateTime;

export const FORMAT_DAY_MONTH = "d LLL";
export const FORMAT_WEEKDAY_MONTH_DAY = "cccc, LLLL d";
export const FORMAT_SHORT_WEEKDAY_DATE = "ccc, dd LLL yyyy";
export const FORMAT_SHORT_WEEKDAY_DAY_MONTH = "ccc, d LLLL";
export const FORMAT_WEEKDAY_DAY_MONTH = "cccc d LLLL";
export const FORMAT_YEAR_MONTH_DAY = "yyyy-LL-dd";
export const FORMAT_EUROPEAN_DATE = "dd/LL/y";
export const FORMAT_CONTENTFUL_ISO = "yyyy-LL-dd'T'HH:mmZZ";
export const FORMAT_TIME_24 = "T";

const contentfulISOFormatOptions = {
  suppressMilliseconds: true,
  suppressSeconds: true
};

const parse = (date: string) => LuxonDateTime.fromISO(date, { setZone: true });

export const toFormat = (date: string, format: string) =>
  parse(date).toFormat(format);

export const toLondonFormat = (date: string, format: string) =>
  // Note setZone transforms the timezone and time but retains
  // the epoch time. Essentially it keeps the same value
  parse(date)
    .setZone("utc+1")
    .toFormat(format);

export const isBefore = (d1: string, d2: string) => +parse(d1) < +parse(d2);

export const now = () =>
  LuxonDateTime.local().toISO(contentfulISOFormatOptions);

export const addDays = (date: string, days: number) => add(date, { days });

export const isSameDay = (d1: string, d2: string) =>
  parse(d1).hasSame(parse(d2), "day");

export const compareAsc = (d1: string, d2: string) => {
  const coercedD1 = +parse(d1);
  const coercedD2 = +parse(d2);
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
  const range1 = Interval.fromDateTimes(parse(d1Start), parse(d1End));
  const range2 = Interval.fromDateTimes(parse(d2Start), parse(d2End));

  return range1.overlaps(range2);
};

export const startOfDay = (date: string) =>
  parse(date)
    .startOf("day")
    .toISO(contentfulISOFormatOptions);

export const endOfDay = (date: string) =>
  parse(date)
    .endOf("day")
    .toISO(contentfulISOFormatOptions);

export const getHours = (date: string) => parse(date).hour;

export const set = (date: string, values: Object) =>
  parse(date)
    .set(values)
    .toISO(contentfulISOFormatOptions);

export const diff = (
  d1: string,
  d2: string,
  unit?: DateTimeUnit | DateTimeUnit[] = "milliseconds"
) =>
  parse(d1)
    .diff(parse(d2), unit)
    .toObject();

export const add = (date: string, values: Object) =>
  parse(date)
    .plus(values)
    .toISO(contentfulISOFormatOptions);
