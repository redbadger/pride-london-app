// @flow
import type { Event } from "../data/event";

const selectSavedEventsHelp = (events: { [string]: Event }) => (
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
export const selectSavedEvents = (
  savedEvents: Set<string>,
  events: { [string]: Event }
): Event[] =>
  Array.from(savedEvents.values()).reduce(selectSavedEventsHelp(events), []);
