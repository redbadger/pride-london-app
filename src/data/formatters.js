// @flow

import { toFormat as formatDate } from "../lib/date";
import type { DateRange } from "./date-time";
import text from "../constants/text";
import { isFree } from "../selectors/event";

export const formatDateRange = (dateRange: DateRange) =>
  dateRange.startDate !== dateRange.endDate
    ? [
        formatDate(dateRange.startDate, "D MMM"),
        formatDate(dateRange.endDate, "D MMM")
      ].join(" - ")
    : formatDate(dateRange.startDate, "D MMM");

export const formatTime = (value: string) => formatDate(value, "HH:mm");

export const removeTimezoneFromCmsDateString = (isoString: string) =>
  isoString.slice(0, -6);

export const formatPrice = (price: number) => {
  if (price === Math.trunc(price)) {
    return String(price);
  }
  return price.toFixed(2);
};

export const formatShortEventPrice = (
  eventPriceLow: number,
  eventPriceHigh: number
) => {
  if (isFree(eventPriceLow, eventPriceHigh)) {
    return `${text.isFreePrice}`;
  }
  if (eventPriceLow === eventPriceHigh) {
    return `£${formatPrice(eventPriceLow)}`;
  }
  return `${text.eventFromPrice} £${formatPrice(eventPriceLow)}`;
};

export const formatLongEventPrice = (
  eventPriceLow: number,
  eventPriceHigh: number
) => {
  if (isFree(eventPriceLow, eventPriceHigh)) return text.isFreePrice;
  if (eventPriceHigh && eventPriceHigh > eventPriceLow)
    return `£${formatPrice(eventPriceLow)} — £${formatPrice(eventPriceHigh)}`;
  return `£${formatPrice(eventPriceLow)}`;
};
