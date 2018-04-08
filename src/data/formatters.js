// @flow

import formatDate from "date-fns/format";
import type { DateRange } from "./date-time";

export const formatShortDate = (date: string | Date) =>
  formatDate(date, "D MMM");

export const formatDateRange = (dateRange: DateRange) =>
  dateRange.startDate !== dateRange.endDate
    ? [
        formatDate(dateRange.startDate, "D MMM"),
        formatDate(dateRange.endDate, "D MMM")
      ].join(" - ")
    : formatShortDate(dateRange.startDate);
