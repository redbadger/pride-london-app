// @flow

import formatDate from "date-fns/format";
import type { DateOrDateRange } from "./date-time";

export const formatShortDate = (date: string | Date) =>
  formatDate(date, "D MMM");

export const formatDateRange = (
  dateRange: DateOrDateRange,
  { dateSuffix }: { dateSuffix: string } = { dateSuffix: "" }
) =>
  typeof dateRange === "object"
    ? [
        formatDate(dateRange.startDate, "D MMM"),
        formatDate(dateRange.endDate, "D MMM")
      ].join(" - ")
    : formatShortDate(dateRange) + dateSuffix;
