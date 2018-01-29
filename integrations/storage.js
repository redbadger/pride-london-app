// @flow

import { AsyncStorage } from "react-native";
import type { Event } from "./cms";

type EventsData = {
  events: Event[],
  syncToken: string
};

const EVENTS_KEY = "@EventsStore:events";

export const saveEvents = async (
  newEvents: Event[],
  syncToken: string
): Promise<EventsData> => {
  const localEventsData = await loadEvents();
  const events = localEventsData
    ? [...newEvents, ...localEventsData.events]
    : newEvents;
  const eventsData = { events, syncToken };
  await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(eventsData));
  return eventsData;
};

export const loadEvents = async (): Promise<EventsData> => {
  const stringData = await AsyncStorage.getItem(EVENTS_KEY);
  return JSON.parse(stringData);
};
