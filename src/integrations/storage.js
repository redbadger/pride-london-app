// @flow
import { AsyncStorage } from "react-native";
import { isBefore } from "../lib/date";
import type { CmsEntry } from "./cms";
import locale from "../data/locale";

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

const CMS_DATA_KEY = "@CmsStore:data";

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

const correctDates = (entry: Object) => {
  if (!entry.fields) {
    return entry;
  }

  const { startTime, endTime } = entry.fields;
  if (startTime === undefined || endTime === undefined) {
    return entry;
  }

  if (isBefore(startTime[locale], endTime[locale])) {
    return entry;
  }

  return {
    ...entry,
    fields: {
      ...entry.fields,
      startTime: endTime,
      endTime: startTime
    }
  };
};

const orderHighLowPrice = (entry: Object) => {
  if (!entry.fields) {
    return entry;
  }

  const priceLow =
    entry.fields.eventPriceLow && entry.fields.eventPriceLow[locale];
  const priceHigh =
    entry.fields.eventPriceHigh && entry.fields.eventPriceHigh[locale];

  if (priceLow < priceHigh) return entry;

  return {
    ...entry,
    fields: {
      ...entry.fields,
      eventPriceLow: {
        [locale]: priceHigh || 0
      },
      eventPriceHigh: {
        [locale]: priceLow || 0
      }
    }
  };
};

const updateCmsEntryList = (newList, deletedList, localList) => {
  const deletedEntryIds = deletedList.map(deletedEntry => deletedEntry.sys.id);

  return newList
    .reduce(addOrUpdateEntry, localList)
    .filter(entry => entryNotDeleted(entry, deletedEntryIds))
    .map(correctDates)
    .map(orderHighLowPrice);
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

  await AsyncStorageObj.setItem(CMS_DATA_KEY, JSON.stringify(newCmsData));

  return newCmsData;
};

export const loadCmsData = async (
  AsyncStorageObj: AsyncStorage = AsyncStorage
): Promise<SavedData> => {
  const stringData = await AsyncStorageObj.getItem(CMS_DATA_KEY);
  return JSON.parse(stringData);
};

export const SAVED_EVENTS_DATA_KEY = "@SavedEvents:data";

const onlyStrings = (acc: Set<string>, value: mixed) => {
  if (typeof value === "string") {
    return acc.add(value);
  }
  return acc;
};

export const fetchSavedEvents = async (
  AsyncStorageObj: AsyncStorage = AsyncStorage
): Promise<Set<string>> => {
  const stringData = await AsyncStorageObj.getItem(SAVED_EVENTS_DATA_KEY);
  const data: mixed = JSON.parse(stringData);
  const events = new Set();
  if (Array.isArray(data)) {
    return data.reduce(onlyStrings, events);
  }
  return events;
};

export const storeSavedEvents = async (
  events: Set<string>,
  AsyncStorageObj: AsyncStorage = AsyncStorage
): Promise<Set<string>> => {
  const data = JSON.stringify(Array.from(events.values()));
  await AsyncStorageObj.setItem(SAVED_EVENTS_DATA_KEY, data);
  return events;
};
