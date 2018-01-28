// @flow

import Config from "react-native-config";
// force contentful SDK to use browser API
import { createClient } from "contentful/dist/contentful.browser.min";

const client = createClient({
  space: Config.CONTENTFUL_SPACE_ID,
  accessToken: Config.CONTENTFUL_API_KEY
});

// eslint-disable-next-line import/prefer-default-export
export const getEvents = async () => {
  const eventData = await client.getEntries({
    content_type: "event"
  });

  return eventData.items;
};
