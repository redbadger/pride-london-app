// @flow
import type { Event } from "../data/event";
import type { State as SavedEventsState } from "../reducers/saved-events";
import locale from "../data/locale";

export const selectEventIsFree = (event: Event) =>
  event.fields.eventPriceLow[locale] === 0 &&
  event.fields.eventPriceHigh[locale] === 0;

export const eventIsSaved = (savedEvents: SavedEventsState, event: Event) =>
  savedEvents.has(event.sys.id);
