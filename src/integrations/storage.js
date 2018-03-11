// @flow

import { AsyncStorage } from "react-native";
import type { CmsData, CmsEntries, CmsEntry, Asset } from "./cms";

export type SavedData = {
  entries: CmsEntries[],
  assets: CmsEntry<Asset>[],
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

const updateCmsEntryList = (newList, deletedList, localList) => {
  const deletedEntryIds = deletedList.map(deletedEntry => deletedEntry.sys.id);

  return newList
    .reduce(addOrUpdateEntry, localList)
    .filter(entry => entryNotDeleted(entry, deletedEntryIds));
};

export const saveCmsData: SaveCmsData = async (
  cmsData: CmsData,
  loadCmsDataFn = loadCmsData,
  AsyncStorageObj = AsyncStorage
) => {
  const localCmsData = await loadCmsDataFn();
  const localEntries = localCmsData ? localCmsData.entries : [];
  const localAssets = localCmsData ? localCmsData.assets : [];

  const entries = updateCmsEntryList(
    cmsData.entries,
    cmsData.deletedEntries,
    localEntries
  );
  const assets = updateCmsEntryList(
    cmsData.assets,
    cmsData.deletedAssets,
    localAssets
  );

  const syncToken = cmsData.nextSyncToken;
  const newCmsData = { entries, assets, syncToken };

  await AsyncStorageObj.setItem(DATA_KEY, JSON.stringify(newCmsData));

  return newCmsData;
};

export const loadCmsData: LoadCmsData = async (
  AsyncStorageObj: AsyncStorage = AsyncStorage
): Promise<SavedData> => {
  const stringData: string = await AsyncStorageObj.getItem(DATA_KEY);
  return JSON.parse(stringData);
};
