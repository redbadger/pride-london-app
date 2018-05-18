// @flow
import { DateTime, Interval } from "luxon";

export const FORMAT_DAY_MONTH = "d LLL";
export const FORMAT_WEEKDAY_MONTH_DAY = "cccc, LLLL d";
export const FORMAT_SHORT_WEEKDAY_DATE = "ccc, dd LLL yyyy";
export const FORMAT_SHORT_WEEKDAY_DAY_MONTH = "ccc, d LLLL";
export const FORMAT_WEEKDAY_DAY_MONTH = "cccc d LLLL";
export const FORMAT_YEAR_MONTH_DAY = "yyyy-LL-dd";
export const FORMAT_TIME_24 = "T";

const contentfulISOFormatOptions = {
  suppressMilliseconds: true,
  suppressSeconds: true
};

const parseDateString = (date: string) =>
  DateTime.fromISO(date, { setZone: true });

export const toFormat = (date: string, format: string) =>
  parseDateString(date).toFormat(format);

export const isBefore = (d1: string, d2: string) =>
  +parseDateString(d1) < +parseDateString(d2);

export const addDays = (date: string, days: number) =>
  parseDateString(date)
    .plus({ days })
    .toISO(contentfulISOFormatOptions);

export const isSameDay = (d1: string, d2: string) =>
  parseDateString(d1).hasSame(parseDateString(d2), "day");

export const parse = (date: string) => parseDateString(date).toJSDate();

export const compareAsc = (d1: string, d2: string) => {
  const coercedD1 = +parseDateString(d1);
  const coercedD2 = +parseDateString(d2);
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
    parseDateString(d1Start),
    parseDateString(d1End)
  );
  const range2 = Interval.fromDateTimes(
    parseDateString(d2Start),
    parseDateString(d2End)
  );

  return range1.overlaps(range2);
};

export const startOfDay = (date: string) =>
  parseDateString(date)
    .startOf("day")
    .toISO(contentfulISOFormatOptions);

export const endOfDay = (date: string) =>
  parseDateString(date)
    .endOf("day")
    .toISO(contentfulISOFormatOptions);

export const getHours = (date: string) => parseDateString(date).hour;

export const differenceInCalendarDays = (d1: string, d2: string) => {
  const D1 = parseDateString(d1);
  const D2 = parseDateString(d2);
  const diff = D1.diff(D2, "days").toObject().days || 0;
  return Math.round(diff);
};
