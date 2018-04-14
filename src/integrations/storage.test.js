import { loadCmsData, saveCmsData } from "./storage";

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

describe("correctDates", () => {
  it("switches dates if end date is before start date", async () => {
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
            endTime: { "en-GB": "2018-07-07T22:3001:00" }
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

  it("leaves entries of type 'performance' alone", async () => {
    const cmsData = {
      entries: [
        {
          sys: { contentType: { sys: { id: "performance" } } },
          fields: {
            startTime: { "en-GB": "2018-07-07T22:3001:00" }
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
          sys: { contentType: { sys: { id: "performance" } } },
          fields: {
            startTime: { "en-GB": "2018-07-07T22:3001:00" }
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
