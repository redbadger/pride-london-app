// @flow
import type { Event, Events, SavedEvents } from "../data/event";

const resolveSavedEventsHelp = (events: Events) => (
  acc: Event[],
  id: string
): Event[] => {
  const event = events[id];
  if (event) {
    acc.push(event); // deliberate mutation to avoid allocation
  }
  return acc;
};

/* eslint-disable import/prefer-default-export */
export const resolveSavedEvents = (
  savedEvents: SavedEvents,
  events: Events
): Event[] =>
  Array.from(savedEvents.values()).reduce(resolveSavedEventsHelp(events), []);
