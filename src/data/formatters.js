// @flow

import {
  toLondonFormat as formatDate,
  FORMAT_DAY_MONTH,
  FORMAT_TIME_24
} from "../lib/date";
import type { DateRange } from "./date-time";
import text from "../constants/text";
import { isFree } from "../selectors/event";

export const formatDateRange = (dateRange: DateRange) =>
  dateRange.startDate !== dateRange.endDate
    ? [
        formatDate(dateRange.startDate, FORMAT_DAY_MONTH),
        formatDate(dateRange.endDate, FORMAT_DAY_MONTH)
      ].join(" - ")
    : formatDate(dateRange.startDate, FORMAT_DAY_MONTH);

export const formatTime = (value: string) => formatDate(value, FORMAT_TIME_24);

export const formatContentfulDate = (
  year: string,
  month: string,
  day: string,
  time?: string
) => {
  const correctedDay = day.padStart(2, "0");
  const correctedMonth = month.padStart(2, "0");
  const correctedYear = year.padStart(4, "20");
  const correctedTime = time ? `T${time}` : "";
  return `${correctedYear}-${correctedMonth}-${correctedDay}${correctedTime}`;
};

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
