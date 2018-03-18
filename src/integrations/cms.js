// @flow

import Config from "react-native-config";
// force contentful SDK to use browser API
import { createClient } from "contentful/dist/contentful.browser.min";
import { saveCmsData, loadCmsData } from "./storage";
import type { SavedData } from "./storage";
import type { Event, FeaturedEvents, Asset } from "../data/event";

export type CmsEntry = Event | FeaturedEvents;
export type CmsData = {
  entries: CmsEntry[],
  deletedEntries: CmsEntry[],
  assets: Asset[],
  deletedAssets: Asset[],
  nextSyncToken: string
};

type SyncOpts = {
  initial: boolean,
  nextSyncToken?: string
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
