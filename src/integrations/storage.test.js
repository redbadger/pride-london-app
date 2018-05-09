import {
  loadCmsData,
  saveCmsData,
  fetchSavedEvents,
  storeSavedEvents,
  SAVED_EVENTS_DATA_KEY
} from "./storage";

describe("saveCmsData", () => {
  it("appends entries to list found in local storage", async () => {
    const cmsData = {
      entries: [{ sys: { id: "1" } }, { sys: { id: "2" } }],
      assets: [{ sys: { id: "1" } }, { sys: { id: "2" } }],
      deletedEntries: [],
      deletedAssets: [],
      nextSyncToken: "abc"
    };
    const mockLoadCmsData = async () => ({
      entries: [{ sys: { id: "3" } }, { sys: { id: "4" } }],
      assets: [{ sys: { id: "3" } }, { sys: { id: "4" } }],
      syncToken: "123"
    });
    const mockAsyncStorage = { setItem: jest.fn() };
    const expectedCmsData = {
      entries: [
        { sys: { id: "1" } },
        { sys: { id: "2" } },
        { sys: { id: "3" } },
        { sys: { id: "4" } }
      ],
      assets: [
        { sys: { id: "1" } },
        { sys: { id: "2" } },
        { sys: { id: "3" } },
        { sys: { id: "4" } }
      ],
      syncToken: "abc"
    };
    const expectedStringifiedEntries = '{"sys":{"id":"1"}},{"sys":{"id":"2"}}';

    const savedEntries = await saveCmsData(
      cmsData,
      mockLoadCmsData,
      mockAsyncStorage
    );

    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
      expect.any(String),
      expect.stringContaining(expectedStringifiedEntries)
    );
    expect(savedEntries.entries).toEqual(
      expect.arrayContaining(expectedCmsData.entries)
    );
    expect(savedEntries.assets).toEqual(
      expect.arrayContaining(expectedCmsData.assets)
    );
    expect(savedEntries.syncToken).toEqual(expectedCmsData.syncToken);
  });

  it("adds entries to local storage if local entries are empty", async () => {
    const cmsData = {
      entries: [{ sys: { id: "1" } }, { sys: { id: "2" } }],
      assets: [{ sys: { id: "1" } }, { sys: { id: "2" } }],
      deletedEntries: [],
      deletedAssets: [],
      nextSyncToken: "abc"
    };
    const mockLoadCmsData = async () => ({
      entries: [],
      assets: [],
      syncToken: "123"
    });
    const mockAsyncStorage = { setItem: jest.fn() };
    const expectedCmsData = {
      entries: [{ sys: { id: "1" } }, { sys: { id: "2" } }],
      assets: [{ sys: { id: "1" } }, { sys: { id: "2" } }],
      syncToken: "abc"
    };

    const savedCmsData = await saveCmsData(
      cmsData,
      mockLoadCmsData,
      mockAsyncStorage
    );

    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify(expectedCmsData)
    );
    expect(savedCmsData).toEqual(expectedCmsData);
  });

  it("adds entries to local storage if local entries are not found", async () => {
    const cmsData = {
      entries: [{ sys: { id: "1" } }, { sys: { id: "2" } }],
      assets: [{ sys: { id: "1" } }, { sys: { id: "2" } }],
      deletedEntries: [],
      deletedAssets: [],
      nextSyncToken: "abc"
    };
    const mockLoadCmsData = async () => null;
    const mockAsyncStorage = { setItem: jest.fn() };
    const expectedCmsData = {
      entries: [{ sys: { id: "1" } }, { sys: { id: "2" } }],
      assets: [{ sys: { id: "1" } }, { sys: { id: "2" } }],
      syncToken: "abc"
    };

    const savedCmsData = await saveCmsData(
      cmsData,
      mockLoadCmsData,
      mockAsyncStorage
    );

    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify(expectedCmsData)
    );
    expect(savedCmsData).toEqual(expectedCmsData);
  });

  it("removes entries from local storage if listed in deletions", async () => {
    const cmsData = {
      entries: [],
      assets: [],
      deletedEntries: [{ sys: { id: "1" } }],
      deletedAssets: [{ sys: { id: "1" } }],
      nextSyncToken: "abc"
    };
    const mockLoadCmsData = async () => ({
      entries: [{ sys: { id: "1" } }, { sys: { id: "2" } }],
      assets: [{ sys: { id: "1" } }, { sys: { id: "2" } }],
      syncToken: "123"
    });
    const mockAsyncStorage = { setItem: jest.fn() };
    const expectedCmsData = {
      entries: [{ sys: { id: "2" } }],
      assets: [{ sys: { id: "2" } }],
      syncToken: "abc"
    };

    const savedEntries = await saveCmsData(
      cmsData,
      mockLoadCmsData,
      mockAsyncStorage
    );

    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify(expectedCmsData)
    );
    expect(savedEntries).toEqual(expectedCmsData);
  });

  it("updates entries in local storage when new revision provided", async () => {
    const cmsData = {
      entries: [{ sys: { id: "1", revision: 2 } }],
      assets: [{ sys: { id: "1", revision: 2 } }],
      deletedEntries: [],
      deletedAssets: [],
      nextSyncToken: "abc"
    };
    const mockLoadCmsData = async () => ({
      entries: [
        { sys: { id: "1", revision: 1 } },
        { sys: { id: "2", revision: 1 } }
      ],
      assets: [
        { sys: { id: "1", revision: 1 } },
        { sys: { id: "2", revision: 1 } }
      ],
      syncToken: "123"
    });
    const mockAsyncStorage = { setItem: jest.fn() };
    const expectedCmsData = {
      entries: [
        { sys: { id: "1", revision: 2 } },
        { sys: { id: "2", revision: 1 } }
      ],
      assets: [
        { sys: { id: "1", revision: 2 } },
        { sys: { id: "2", revision: 1 } }
      ],
      syncToken: "abc"
    };

    const savedEntries = await saveCmsData(
      cmsData,
      mockLoadCmsData,
      mockAsyncStorage
    );

    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify(expectedCmsData)
    );
    expect(savedEntries).toEqual(expectedCmsData);
  });
});

describe("loadCmsData", () => {
  it("parses JSON object from local storage", async () => {
    const mockData = { entries: [] };
    const mockAsyncStorage = { getItem: () => JSON.stringify(mockData) };

    const loadedData = await loadCmsData(mockAsyncStorage);
    expect(loadedData).toEqual(mockData);
  });
});

describe("correctPrice", () => {
  const mockLoadCmsData = async () => ({
    entries: [],
    assets: [],
    syncToken: "123"
  });

  const mockAsyncStorage = { setItem: jest.fn() };

  it("should set prices to zero if they are not provided", async () => {
    const cmsData = {
      entries: [
        {
          sys: { contentType: { sys: { id: "event" } }, id: "1" },
          fields: {
            startTime: { "en-GB": "2018-07-07T22:3001:00" },
            endTime: { "en-GB": "2018-07-07T10:3001:00" }
          }
        }
      ],
      assets: [{ sys: { id: "1" } }],
      deletedEntries: [],
      deletedAssets: [],
      nextSyncToken: "abc"
    };

    const expectedCmsData = {
      entries: [
        {
          sys: { contentType: { sys: { id: "event" } }, id: "1" },
          fields: {
            startTime: { "en-GB": "2018-07-07T10:3001:00" },
            endTime: { "en-GB": "2018-07-07T22:3001:00" },
            eventPriceLow: {
              "en-GB": 0
            },
            eventPriceHigh: {
              "en-GB": 0
            }
          }
        }
      ],
      assets: [{ sys: { id: "1" } }],
      syncToken: "abc"
    };

    const savedCmsData = await saveCmsData(
      cmsData,
      mockLoadCmsData,
      mockAsyncStorage
    );

    expect(savedCmsData).toEqual(expectedCmsData);
  });

  it("should set prices to zero if they are undefined", async () => {
    const cmsData = {
      entries: [
        {
          sys: { contentType: { sys: { id: "event" } }, id: "1" },
          fields: {
            startTime: { "en-GB": "2018-07-07T22:3001:00" },
            endTime: { "en-GB": "2018-07-07T10:3001:00" },
            eventPriceLow: {
              "en-GB": undefined
            },
            eventPriceHigh: {
              "en-GB": undefined
            }
          }
        }
      ],
      assets: [{ sys: { id: "1" } }],
      deletedEntries: [],
      deletedAssets: [],
      nextSyncToken: "abc"
    };

    const expectedCmsData = {
      entries: [
        {
          sys: { contentType: { sys: { id: "event" } }, id: "1" },
          fields: {
            startTime: { "en-GB": "2018-07-07T10:3001:00" },
            endTime: { "en-GB": "2018-07-07T22:3001:00" },
            eventPriceLow: {
              "en-GB": 0
            },
            eventPriceHigh: {
              "en-GB": 0
            }
          }
        }
      ],
      assets: [{ sys: { id: "1" } }],
      syncToken: "abc"
    };

    const savedCmsData = await saveCmsData(
      cmsData,
      mockLoadCmsData,
      mockAsyncStorage
    );

    expect(savedCmsData).toEqual(expectedCmsData);
  });

  it("should reverse the prices if priceLow is higher than priceHigh", async () => {
    const cmsData = {
      entries: [
        {
          sys: { contentType: { sys: { id: "event" } }, id: "1" },
          fields: {
            startTime: { "en-GB": "2018-07-07T22:3001:00" },
            endTime: { "en-GB": "2018-07-07T10:3001:00" },
            eventPriceLow: {
              "en-GB": 20
            },
            eventPriceHigh: {
              "en-GB": 10
            }
          }
        }
      ],
      assets: [{ sys: { id: "1" } }],
      deletedEntries: [],
      deletedAssets: [],
      nextSyncToken: "abc"
    };

    const expectedCmsData = {
      entries: [
        {
          sys: { contentType: { sys: { id: "event" } }, id: "1" },
          fields: {
            startTime: { "en-GB": "2018-07-07T10:3001:00" },
            endTime: { "en-GB": "2018-07-07T22:3001:00" },
            eventPriceLow: {
              "en-GB": 10
            },
            eventPriceHigh: {
              "en-GB": 20
            }
          }
        }
      ],
      assets: [{ sys: { id: "1" } }],
      syncToken: "abc"
    };

    const savedCmsData = await saveCmsData(
      cmsData,
      mockLoadCmsData,
      mockAsyncStorage
    );

    expect(savedCmsData).toEqual(expectedCmsData);
  });

  it("should reverse the prices if priceLow is set to 10 and priceHigh is set to zero", async () => {
    const cmsData = {
      entries: [
        {
          sys: { contentType: { sys: { id: "event" } }, id: "1" },
          fields: {
            startTime: { "en-GB": "2018-07-07T22:3001:00" },
            endTime: { "en-GB": "2018-07-07T10:3001:00" },
            eventPriceLow: {
              "en-GB": 20
            },
            eventPriceHigh: {
              "en-GB": 0
            }
          }
        }
      ],
      assets: [{ sys: { id: "1" } }],
      deletedEntries: [],
      deletedAssets: [],
      nextSyncToken: "abc"
    };

    const expectedCmsData = {
      entries: [
        {
          sys: { contentType: { sys: { id: "event" } }, id: "1" },
          fields: {
            startTime: { "en-GB": "2018-07-07T10:3001:00" },
            endTime: { "en-GB": "2018-07-07T22:3001:00" },
            eventPriceLow: {
              "en-GB": 0
            },
            eventPriceHigh: {
              "en-GB": 20
            }
          }
        }
      ],
      assets: [{ sys: { id: "1" } }],
      syncToken: "abc"
    };

    const savedCmsData = await saveCmsData(
      cmsData,
      mockLoadCmsData,
      mockAsyncStorage
    );

    expect(savedCmsData).toEqual(expectedCmsData);
  });
});

describe("correctDates", () => {
  it("switches dates if end date is before start date", async () => {
    const cmsData = {
      entries: [
        {
          sys: { contentType: { sys: { id: "event" } }, id: "1" },
          fields: {
            startTime: { "en-GB": "2018-07-07T22:3001:00" },
            endTime: { "en-GB": "2018-07-07T10:3001:00" },
            eventPriceLow: {
              "en-GB": 0
            },
            eventPriceHigh: {
              "en-GB": 0
            }
          }
        }
      ],
      assets: [{ sys: { id: "1" } }],
      deletedEntries: [],
      deletedAssets: [],
      nextSyncToken: "abc"
    };
    const mockLoadCmsData = async () => ({
      entries: [],
      assets: [],
      syncToken: "123"
    });
    const mockAsyncStorage = { setItem: jest.fn() };
    const expectedCmsData = {
      entries: [
        {
          sys: { contentType: { sys: { id: "event" } }, id: "1" },
          fields: {
            startTime: { "en-GB": "2018-07-07T10:3001:00" },
            endTime: { "en-GB": "2018-07-07T22:3001:00" },
            eventPriceLow: {
              "en-GB": 0
            },
            eventPriceHigh: {
              "en-GB": 0
            }
          }
        }
      ],
      assets: [{ sys: { id: "1" } }],
      syncToken: "abc"
    };

    const savedCmsData = await saveCmsData(
      cmsData,
      mockLoadCmsData,
      mockAsyncStorage
    );
    expect(savedCmsData).toEqual(expectedCmsData);
  });

  it("does not change entry when startDate or endDate is undefined", async () => {
    const cmsData = {
      entries: [
        {
          sys: { id: "1" },
          fields: {
            name: { "en-GB": "I am not an event" },
            eventPriceLow: {
              "en-GB": 0
            },
            eventPriceHigh: {
              "en-GB": 0
            }
          }
        }
      ],
      assets: [],
      deletedEntries: [],
      deletedAssets: [],
      nextSyncToken: "abc"
    };
    const mockLoadCmsData = async () => ({
      entries: [],
      assets: [],
      syncToken: "123"
    });
    const mockAsyncStorage = { setItem: jest.fn() };

    const savedCmsData = await saveCmsData(
      cmsData,
      mockLoadCmsData,
      mockAsyncStorage
    );
    expect(savedCmsData.entries[0]).toEqual(cmsData.entries[0]);
  });
});

describe("fetchSavedEvents", () => {
  it("calls getItem with correct key", async () => {
    const mockData = ["a", "b", "c"];
    const spy = jest
      .fn()
      .mockReturnValue(Promise.resolve(JSON.stringify(mockData)));
    const mockAsyncStorage = { getItem: spy };

    await fetchSavedEvents(mockAsyncStorage);
    expect(spy).toHaveBeenCalledWith(SAVED_EVENTS_DATA_KEY);
  });

  it("parses JSON array from local storage", async () => {
    const mockData = ["a", "b", "c"];
    const mockAsyncStorage = { getItem: () => JSON.stringify(mockData) };

    const loadedData = await fetchSavedEvents(mockAsyncStorage);
    expect(loadedData).toEqual(new Set(mockData));
  });

  it("returns empty Set if data is malformed", async () => {
    const mockData = { abc: "123" };
    const mockAsyncStorage = { getItem: () => JSON.stringify(mockData) };

    const loadedData = await fetchSavedEvents(mockAsyncStorage);
    expect(loadedData).toEqual(new Set());
  });
});

describe("storeSavedEvents", () => {
  it("calls setItem with correct key and value", async () => {
    const values = ["a", "b", "c"];
    const events = new Set(values);
    const spy = jest.fn().mockReturnValue(Promise.resolve());
    const mockAsyncStorage = { setItem: spy };

    const done = await storeSavedEvents(events, mockAsyncStorage);
    expect(spy).toHaveBeenCalledWith(
      SAVED_EVENTS_DATA_KEY,
      JSON.stringify(values)
    );
    expect(done).toEqual(events);
  });
});
