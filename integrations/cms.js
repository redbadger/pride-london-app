// @flow

import Config from "react-native-config";
// force contentful SDK to use browser API
import { createClient } from "contentful/dist/contentful.browser.min";
import { saveEvents, loadEvents } from "./storage";

const client = createClient({
  space: Config.CONTENTFUL_SPACE_ID,
  accessToken: Config.CONTENTFUL_API_KEY
});

export const getEvents = async () => {
  const localEventsData = await loadEvents();
  const hasLocalEventsData =
    !!localEventsData && localEventsData.events.length > 0;

  if (hasLocalEventsData) {
    return localEventsData.events;
  }

  return updateEvents();
};

export const updateEvents = async () => {
  console.log(">>> updating events");
  const localEventsData = await loadEvents();
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

  const eventData = await client.sync({
    ...defaultSyncOpts,
    ...syncOpts
  });

  const savedEventsData = await saveEvents(
    eventData.entries,
    eventData.nextSyncToken
  );

  return savedEventsData.events;
};
