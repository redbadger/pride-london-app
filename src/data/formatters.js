// @flow

import formatDate from "date-fns/format";
import type { DateRange } from "./date-time";

/* eslint-disable import/prefer-default-export */
export const formatDateRange = (dateRange: DateRange) =>
  dateRange.startDate !== dateRange.endDate
    ? [
        formatDate(dateRange.startDate, "D MMM"),
        formatDate(dateRange.endDate, "D MMM")
      ].join(" - ")
    : formatDate(dateRange.startDate, "D MMM");

export const formatPrice = price => {
  if (price === Math.trunc(price)) {
    return price;
  }
  return price.toFixed(2);
};

export const formattedEventPrice = (isFree, eventPriceLow, eventPriceHigh) => {
  let displayPrice;
  if (isFree) {
    displayPrice = "Free";
  } else if (eventPriceLow === eventPriceHigh) {
    displayPrice = `£${formatPrice(eventPriceLow)}`;
  } else {
    displayPrice = `From £${formatPrice(eventPriceLow)}`;
  }
  return displayPrice;
};
