// @flow

export type DateRange = {
  startDate: string,
  endDate: string
};

export type DateOrDateRange = string | DateRange;

export type Time = "morning" | "afternoon" | "evening";
