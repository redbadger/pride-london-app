import { getCmsData, updateCmsData } from "./cms";

describe("getCmsData", () => {
  it("returns local cms data if found", async () => {
    const mockLocalEntries = {
      entries: [{}],
      assets: [{}]
    };
    const mockLoadCmsData = () => mockLocalEntries;
    const mockUpdateCmsData = jest.fn();

    const entries = await getCmsData(mockLoadCmsData, mockUpdateCmsData);

    expect(mockUpdateCmsData).not.toHaveBeenCalled();
    expect(entries).toBe(mockLocalEntries);
  });

  it("updates events if local cms data not found", async () => {
    const mockLocalCmsData = null;
    const mockLoadCmsData = () => mockLocalCmsData;
    const mockUpdateCmsData = jest.fn();

    await getCmsData(mockLoadCmsData, mockUpdateCmsData);

    expect(mockUpdateCmsData).toHaveBeenCalled();
  });
});

describe("updateCmsData", () => {
  it("downloads full cms data if local cms data not found is empty", async () => {
    const mockLocalCmsData = null;
    const mockSavedCmsData = {
      entries: [],
      assets: []
    };
    const downloadedCmsData = {
      entries: [],
      assets: [],
      deletedEntries: [],
      deletedAssets: [],
      nextSyncToken: "abc"
    };
    const mockLoadCmsData = () => mockLocalCmsData;
    const mockSaveCmsData = jest.fn(() => mockSavedCmsData);
    const mockClient = {
      sync: jest.fn(() => downloadedCmsData)
    };

    const updatedCmsData = await updateCmsData(
      mockLoadCmsData,
      mockSaveCmsData,
      mockClient
    );

    expect(mockClient.sync).toHaveBeenCalledWith(
      expect.objectContaining({
        initial: true
      })
    );
    expect(mockSaveCmsData).toHaveBeenCalledWith(downloadedCmsData);
    expect(updatedCmsData).toBe(mockSavedCmsData);
  });

  it("downloads full cms data if local cms data not found", async () => {
    const mockLocalCmsData = null;
    const mockSavedCmsData = {
      entries: [],
      assets: []
    };
    const downloadedCmsData = {
      entries: [],
      assets: [],
      deletedEntries: [],
      deletedAssets: [],
      nextSyncToken: "abc"
    };
    const mockLoadCmsData = () => mockLocalCmsData;
    const mockSaveCmsData = jest.fn(() => mockSavedCmsData);
    const mockClient = {
      sync: jest.fn(() => downloadedCmsData)
    };

    const updatedCmsData = await updateCmsData(
      mockLoadCmsData,
      mockSaveCmsData,
      mockClient
    );

    expect(mockClient.sync).toHaveBeenCalledWith(
      expect.objectContaining({
        initial: true
      })
    );
    expect(mockSaveCmsData).toHaveBeenCalledWith(downloadedCmsData);
    expect(updatedCmsData).toBe(mockSavedCmsData);
  });

  it("downloads delta update if local cms data is found", async () => {
    const mockLocalCmsData = {
      entries: [{}],
      assets: [{}],
      syncToken: "123"
    };
    const mockSavedCmsData = {
      entries: [],
      assets: []
    };
    const downloadedCmsData = {
      entries: [],
      assets: [],
      deletedEntries: [],
      deletedAssets: [],
      nextSyncToken: "abc"
    };
    const mockLoadCmsData = () => mockLocalCmsData;
    const mockSaveCmsData = jest.fn(() => mockSavedCmsData);
    const mockClient = {
      sync: jest.fn(() => downloadedCmsData)
    };

    const updatedCmsData = await updateCmsData(
      mockLoadCmsData,
      mockSaveCmsData,
      mockClient
    );

    expect(mockClient.sync).toHaveBeenCalledWith(
      expect.objectContaining({
        initial: false,
        nextSyncToken: mockLocalCmsData.syncToken
      })
    );
    expect(mockSaveCmsData).toHaveBeenCalledWith(downloadedCmsData);
    expect(updatedCmsData).toBe(mockSavedCmsData);
  });

  it("does not send delta to local storage if syncToken has not changed", async () => {
    const mockLocalCmsData = {
      entries: [{}],
      assets: [{}],
      syncToken: "123"
    };
    const downloadedCmsData = {
      entries: [],
      assets: [],
      deletedEntries: [],
      deletedAssets: [],
      nextSyncToken: "123"
    };
    const mockLoadCmsData = () => mockLocalCmsData;
    const mockSaveCmsData = jest.fn();
    const mockClient = {
      sync: jest.fn(() => downloadedCmsData)
    };

    const updatedCmsData = await updateCmsData(
      mockLoadCmsData,
      mockSaveCmsData,
      mockClient
    );

    expect(mockClient.sync).toHaveBeenCalledWith(
      expect.objectContaining({
        initial: false,
        nextSyncToken: mockLocalCmsData.syncToken
      })
    );
    expect(mockSaveCmsData).not.toHaveBeenCalled();
    expect(updatedCmsData).toBe(mockLocalCmsData);
  });
});
