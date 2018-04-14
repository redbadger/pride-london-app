// @flow

import formatDate from "date-fns/format";
import type { DateRange } from "./date-time";
import text from "../constants/text";

/* eslint-disable import/prefer-default-export */
export const formatDateRange = (dateRange: DateRange) =>
  dateRange.startDate !== dateRange.endDate
    ? [
        formatDate(dateRange.startDate, "D MMM"),
        formatDate(dateRange.endDate, "D MMM")
      ].join(" - ")
    : formatDate(dateRange.startDate, "D MMM");

export const formatPrice = (price: number) => {
  if (price === Math.trunc(price)) {
    return String(price);
  }
  return price.toFixed(2);
};

export const formattedEventPrice = (
  isFree: boolean,
  eventPriceLow: number,
  eventPriceHigh: number
) => {
  let displayPrice;
  if (isFree) {
    displayPrice = `${text.isFreePrice}`;
  } else if (eventPriceLow === eventPriceHigh) {
    displayPrice = `£${formatPrice(eventPriceLow)}`;
  } else {
    displayPrice = `${text.eventFromPrice} £${formatPrice(eventPriceLow)}`;
  }
  return displayPrice;
};
