// @flow
import type { Event } from "../data/event";
import locale from "../data/locale";

export const isFree = (priceLow: number, priceHigh: number) =>
  priceLow === 0 && priceHigh === 0;

// eslint-disable-next-line import/prefer-default-export
export const selectEventIsFree = (event: Event) =>
  isFree(
    event.fields.eventPriceLow[locale],
    event.fields.eventPriceHigh[locale]
  );
