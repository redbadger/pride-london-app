// @flow

import { AsyncStorage } from "react-native";
import type { Deletion } from "./cms";
import type { Event } from "../data/event";

type EventsData = {
  events: Event[],
  syncToken: string
};

type SaveEvents = (
  newEvents: Event[],
  deletedEvents: Deletion[],
  syncToken: string
) => Promise<EventsData>;
type LoadEvents = () => Promise<EventsData>;

const EVENTS_KEY = "@EventsStore:events";

const addOrUpdateEvent = (events, newEvent) => {
  const indexToUpdate = events.findIndex(
    localEvent => localEvent.sys.id === newEvent.sys.id
  );
  if (indexToUpdate > -1) {
    events.splice(indexToUpdate, 1, newEvent);
    return events;
  }
  return events.concat(newEvent);
};

const eventNotDeleted = (event, deletedEventIds) =>
  !deletedEventIds.includes(event.sys.id);

export const saveEvents: SaveEvents = async (
  newEvents,
  deletedEvents,
  syncToken,
  loadEventsFn = loadEvents,
  AsyncStorageObj = AsyncStorage
) => {
  const localEventsData = await loadEventsFn();
  const localEvents = localEventsData ? localEventsData.events : [];
  const deletedEventIds = deletedEvents.map(
    deletedEvent => deletedEvent.sys.id
  );

  const events = newEvents
    .reduce(addOrUpdateEvent, localEvents)
    .filter(event => eventNotDeleted(event, deletedEventIds));

  const eventsData = { events, syncToken };

  await AsyncStorageObj.setItem(EVENTS_KEY, JSON.stringify(eventsData));

  return eventsData;
};

export const loadEvents: LoadEvents = async (
  AsyncStorageObj = AsyncStorage
) => {
  const stringData: string = await AsyncStorageObj.getItem(EVENTS_KEY);
  return JSON.parse(stringData);
};
