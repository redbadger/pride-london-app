// @flow
import type { Event } from "../data/event";
import locale from "../data/locale";

// eslint-disable-next-line import/prefer-default-export
export const selectEventIsFree = (event: Event) =>
  event.fields.eventPriceLow[locale] === 0 &&
  event.fields.eventPriceHigh[locale] === 0;
