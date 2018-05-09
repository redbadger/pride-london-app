// @flow

import formatDate from "date-fns/format";
import type { DateRange } from "./date-time";
import text from "../constants/text";
import { isFree } from "../selectors/event";

/* eslint-disable import/prefer-default-export */
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

export const formattedShortEventPrice = (
  eventPriceLow: number,
  eventPriceHigh: number
) => {
  let displayPrice;
  if (isFree(eventPriceLow, eventPriceHigh)) {
    displayPrice = `${text.isFreePrice}`;
  } else if (eventPriceLow === eventPriceHigh) {
    displayPrice = `£${formatPrice(eventPriceLow)}`;
  } else {
    displayPrice = `${text.eventFromPrice} £${formatPrice(eventPriceLow)}`;
  }
  return displayPrice;
};

export const formattedLongEventPrice = (
  eventPriceLow: number,
  eventPriceHigh: number
) => {
  if (isFree(eventPriceLow, eventPriceHigh)) return text.isFreePrice;
  if (eventPriceHigh && eventPriceHigh > eventPriceLow)
    return `£${formatPrice(eventPriceLow)} - £${formatPrice(eventPriceHigh)}`;
  return `£${formatPrice(eventPriceLow)}`;
};
