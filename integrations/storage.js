import { AsyncStorage } from "react-native";

const EVENTS_KEY = "@EventsStore:events";

export const saveEvents = async (newEvents, syncToken) => {
  const localEventsData = await loadEvents();
  const events = localEventsData
    ? [...newEvents, ...localEventsData.events]
    : newEvents;
  const eventsData = { events, syncToken };
  await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(eventsData));
  return eventsData;
};

export const loadEvents = async () => {
  const stringData = await AsyncStorage.getItem(EVENTS_KEY);
  return JSON.parse(stringData);
};
