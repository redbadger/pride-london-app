// @flow
import { AsyncStorage } from "react-native";
import type { CmsEntry } from "./cms";

type SavedData = {
  entries: CmsEntry[],
  assets: Object[],
  syncToken: string
};

type CmsData = {
  entries: CmsEntry[],
  deletedEntries: CmsEntry[],
  assets: Object[],
  deletedAssets: Object[],
  nextSyncToken: string
};

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

export const saveCmsData = async (
  cmsData: CmsData,
  loadCmsDataFn: typeof loadCmsData = loadCmsData,
  AsyncStorageObj: AsyncStorage = AsyncStorage
): Promise<SavedData> => {
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

export const loadCmsData = async (
  AsyncStorageObj: AsyncStorage = AsyncStorage
): Promise<SavedData> => {
  const stringData = await AsyncStorageObj.getItem(DATA_KEY);
  return JSON.parse(stringData);
};
