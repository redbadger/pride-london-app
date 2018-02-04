// @flow

import { AsyncStorage } from "react-native";
import type { Event, Deletion } from "./cms";

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

export const saveEvents: SaveEvents = async (
  newEvents,
  deletedEvents,
  syncToken,
  loadEventsFn = loadEvents,
  AsyncStorageObj = AsyncStorage
) => {
  const localEventsData = await loadEventsFn();
  const deletedEventIds = deletedEvents.map(
    deletedEvent => deletedEvent.sys.id
  );
  const modifiedLocalEvents = localEventsData
    ? localEventsData.events.filter(
        localEvent => !deletedEventIds.includes(localEvent.sys.id)
      )
    : [];

  const events = localEventsData
    ? [...newEvents, ...modifiedLocalEvents]
    : newEvents;
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
