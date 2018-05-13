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

export const formatContentfulDate = (
  year: string,
  month: string,
  day: string,
  time?: string
) => {
  const correctedDay = day.length < 2 ? `0${day}` : day;
  const correctedMonth = month.length < 2 ? `0${month}` : month;
  const correctedYear = year.length < 4 ? `20${year}` : year;
  const correctedTime = time ? `T${time}` : "";
  return `${correctedYear}-${correctedMonth}-${correctedDay}${correctedTime}`;
};

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
