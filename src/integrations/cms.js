// @flow

import Config from "react-native-config";
// force contentful SDK to use browser API
import { createClient } from "contentful/dist/contentful.browser.min";
import { saveCmsData, loadCmsData } from "./storage";
import type { SavedData } from "./storage";

export type CmsEntry<Fields> = {
  fields: Fields,
  sys: {
    id: string,
    type: string,
    contentType: {
      sys: {
        id: string
      }
    },
    revision: number
  }
};

export type Event = {
  fields: {
    name: { [string]: string },
    eventCategories: { [string]: string[] },
    startTime: { [string]: string },
    endTime: { [string]: string },
    location: { [string]: { lat: number, lon: number } },
    locationName: { [string]: string },
    eventPriceLow: { [string]: number },
    eventPriceHigh: { [string]: number },
    accessibilityOptions: { [string]: string[] },
    eventDescription: { [string]: string },
    accessibilityDetails: { [string]: string },
    email: { [string]: string },
    phone: { [string]: string },
    ticketingUrl: { [string]: string },
    venueDetails: { [string]: string[] },
    individualEventPicture: { [string]: { sys: { id: string } } }
  },
  sys: {
    id: string,
    type: string,
    contentType: {
      sys: {
        id: "event"
      }
    },
    revision: number
  }
};

export type FeaturedEvents = {
  fields: {
    title: { [string]: string },
    events: { [string]: Event[] }
  },
  sys: {
    id: string,
    type: string,
    contentType: {
      sys: {
        id: "featuredEvents"
      }
    },
    revision: number
  }
};

export type CmsAsset = {
  fields: {
    title: { [string]: string },
    file: {
      [string]: {
        contentType: string,
        fileName: string,
        url: string,
        details: {
          size: number,
          image: {
            height: number,
            width: number
          }
        }
      }
    }
  },
  sys: {
    id: string,
    type: "Asset",
    revision: number
  }
};

export type CmsEvent = Event;
export type CmsFeaturedEvents = FeaturedEvents;
export type CmsEntries = CmsEvent | CmsFeaturedEvents;

type SyncOpts = {
  initial: boolean,
  nextSyncToken?: string
};
export type CmsData = {
  entries: CmsEntries[],
  deletedEntries: CmsEntries[],
  assets: CmsAsset[],
  deletedAssets: CmsAsset[],
  nextSyncToken: string
};
type Client = {
  sync: SyncOpts => Promise<CmsData>
};

type UpdateCmsData = (
  loadCmsDataFn?: loadCmsData,
  saveCmsDataFn: saveCmsData,
  clientObj?: Client
) => Promise<SavedData>;

type GetCmsData = (
  loadCmsDataFn?: loadCmsData,
  updateCmsDataFn?: UpdateCmsData
) => Promise<SavedData>;

const client: Client = createClient({
  space: Config.CONTENTFUL_SPACE_ID,
  accessToken: Config.CONTENTFUL_API_KEY
});

export const getCmsData: GetCmsData = async (
  loadCmsDataFn = loadCmsData,
  updateCmsDataFn = updateCmsData
) => {
  const localCmsData = await loadCmsDataFn();
  const hasLocalCmsData = !!localCmsData;

  if (hasLocalCmsData) {
    return localCmsData;
  }

  return updateCmsDataFn();
};

export const updateCmsData: UpdateCmsData = async (
  loadCmsDataFn = loadCmsData,
  saveCmsDataFn = saveCmsData,
  clientObj = client
) => {
  const localCmsData = await loadCmsDataFn();
  const hasLocalCmsData = !!localCmsData;

  const syncOpts = hasLocalCmsData
    ? {
        initial: false,
        nextSyncToken: localCmsData.syncToken,
        resolveLinks: false
      }
    : {
        initial: true,
        resolveLinks: false
      };

  const cmsData = await clientObj.sync(syncOpts);

  if (hasLocalCmsData && localCmsData.syncToken === cmsData.nextSyncToken) {
    return localCmsData;
  }

  const savedCmsData = await saveCmsDataFn(cmsData);

  return savedCmsData;
};
