// @flow

import Config from "react-native-config";
// force contentful SDK to use browser API
import { createClient } from "contentful/dist/contentful.browser.min";
import { saveEvents, loadEvents } from "./storage";

export type Event = {
  sys: {
    id: string
  },
  fields: {
    name: {
      [string]: string
    }
  }
};
type EventData = {
  entries: Event[],
  nextSyncToken: string
};
type SyncOpts = {
  type: string,
  content_type: string,
  initial: boolean,
  nextSyncToken: string
};
type Client = {
  sync: SyncOpts => Promise<EventData>
};

type UpdateEvents = () => Promise<Event[]>;
type GetEvents = (
  loadEvents?: loadEvents,
  updateEvents?: updateEvents
) => Promise<Event[]>;

const client: Client = createClient({
  space: Config.CONTENTFUL_SPACE_ID,
  accessToken: Config.CONTENTFUL_API_KEY
});

export const getEvents: GetEvents = async (
  loadEventsFn = loadEvents,
  updateEventsFn = updateEvents
) => {
  const localEventsData = await loadEventsFn();
  const hasLocalEventsData =
    !!localEventsData && localEventsData.events.length > 0;

  if (hasLocalEventsData) {
    return localEventsData.events;
  }

  return updateEventsFn();
};

export const updateEvents: UpdateEvents = async (
  loadEventsFn = loadEvents,
  saveEventsFn = saveEvents,
  clientObj = client
) => {
  const localEventsData = await loadEventsFn();
  const hasLocalEventsData =
    !!localEventsData && localEventsData.events.length > 0;
  const defaultSyncOpts = {
    type: "Entry",
    content_type: "event"
  };

  const syncOpts = hasLocalEventsData
    ? {
        initial: false,
        nextSyncToken: localEventsData.syncToken
      }
    : {
        initial: true
      };

  const eventData = await clientObj.sync({
    ...defaultSyncOpts,
    ...syncOpts
  });

  const savedEventsData = await saveEventsFn(
    eventData.entries,
    eventData.nextSyncToken
  );

  return savedEventsData.events;
};
