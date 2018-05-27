// @flow

import Config from "react-native-config";
// force contentful SDK to use browser API
import { createClient } from "contentful/dist/contentful.browser.min";
import { saveCmsData, loadCmsData } from "./storage";
import type { Asset } from "../data/asset";
import type { Event, FeaturedEvents } from "../data/event";
import type { Sponsor } from "../data/sponsor";

export type CmsEntry = Event | FeaturedEvents | Sponsor;
export type CmsData = {
  entries: CmsEntry[],
  deletedEntries: CmsEntry[],
  assets: Asset[],
  deletedAssets: Asset[],
  nextSyncToken: string
};
export type SavedData = {
  entries: CmsEntry[],
  assets: Asset[],
  syncToken: string,
  updated: boolean
};

type SyncOpts = {
  initial: boolean,
  nextSyncToken?: string
};
type Client = {
  sync: SyncOpts => Promise<CmsData>
};

const client: Client = createClient({
  space: Config.CONTENTFUL_SPACE_ID,
  accessToken: Config.CONTENTFUL_API_KEY
});

export const getCmsData = async (
  loadCmsDataFn: typeof loadCmsData = loadCmsData,
  updateCmsDataFn: typeof updateCmsData = updateCmsData
): Promise<SavedData> => {
  const localCmsData = await loadCmsDataFn();
  const hasLocalCmsData = !!localCmsData;

  if (hasLocalCmsData) {
    return { ...localCmsData, updated: false };
  }

  return updateCmsDataFn();
};

export const updateCmsData = async (
  loadCmsDataFn: typeof loadCmsData = loadCmsData,
  saveCmsDataFn: typeof saveCmsData = saveCmsData,
  clientObj: Client = client
): Promise<SavedData> => {
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
    return { ...localCmsData, updated: false };
  }

  const savedCmsData = await saveCmsDataFn(cmsData);

  return { ...savedCmsData, updated: true };
};
