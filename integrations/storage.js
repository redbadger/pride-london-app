// @flow

import { AsyncStorage } from "react-native";
import type { Event } from "./cms";

type EventsData = {
  events: Event[],
  syncToken: string
};

type SaveEvents = (
  newEvents: Event[],
  syncToken: string
) => Promise<EventsData>;
type LoadEvents = () => Promise<EventsData>;

const EVENTS_KEY = "@EventsStore:events";

export const saveEvents: SaveEvents = async (
  newEvents,
  syncToken,
  loadEventsFn = loadEvents,
  AsyncStorageObj = AsyncStorage
) => {
  const localEventsData = await loadEventsFn();
  const events = localEventsData
    ? [...newEvents, ...localEventsData.events]
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
