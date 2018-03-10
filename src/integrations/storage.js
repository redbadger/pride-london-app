// @flow

import { AsyncStorage } from "react-native";
import type { CmsData } from "./cms";

export type SavedData = {
  entries: Object[],
  syncToken: string
};

type LoadCmsData = (AsyncStorageObj?: AsyncStorage) => Promise<SavedData>;
type SaveCmsData = (
  cmsData: CmsData,
  loadCmsDataFn?: LoadCmsData,
  AsyncStorageObj: AsyncStorage
) => Promise<SavedData>;

const DATA_KEY = "@CmsStore:data";

const addOrUpdateEntry = (entries, newEntry) => {
  const indexToUpdate = entries.findIndex(
    localEvent => localEvent.sys.id === newEntry.sys.id
  );
  if (indexToUpdate > -1) {
    entries.splice(indexToUpdate, 1, newEntry);
    return entries;
  }
  return entries.concat(newEntry);
};

const entryNotDeleted = (entry, deletedEntryIds) =>
  !deletedEntryIds.includes(entry.sys.id);

export const saveCmsData: SaveCmsData = async (
  cmsData: CmsData,
  loadCmsDataFn = loadCmsData,
  AsyncStorageObj = AsyncStorage
) => {
  const localCmsData = await loadCmsDataFn();
  const localEntries = localCmsData ? localCmsData.entries : [];

  const syncToken = cmsData.nextSyncToken;
  const newEntries = cmsData.entries;
  const deletedEntryIds = cmsData.deletedEntries.map(
    deletedEntry => deletedEntry.sys.id
  );

  const entries = newEntries
    .reduce(addOrUpdateEntry, localEntries)
    .filter(entry => entryNotDeleted(entry, deletedEntryIds));

  const newCmsData = { entries, syncToken };

  await AsyncStorageObj.setItem(DATA_KEY, JSON.stringify(newCmsData));

  return newCmsData;
};

export const loadCmsData: LoadCmsData = async (
  AsyncStorageObj: AsyncStorage = AsyncStorage
): Promise<SavedData> => {
  const stringData: string = await AsyncStorageObj.getItem(DATA_KEY);
  return JSON.parse(stringData);
};
