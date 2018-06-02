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

    const expectedData = {
      ...mockLocalEntries,
      updated: false
    };

    expect(mockUpdateCmsData).not.toHaveBeenCalled();
    expect(entries).toEqual(expectedData);
  });

  it("updates events if local cms data not found", async () => {
    const mockLocalCmsData = null;
    const mockRemoteEntries = {
      entries: [{}],
      assets: [{}]
    };
    const mockLoadCmsData = () => mockLocalCmsData;
    const mockUpdateCmsData = jest.fn(() => ({
      ...mockRemoteEntries,
      updated: true
    }));

    const entries = await getCmsData(mockLoadCmsData, mockUpdateCmsData);

    const expectedData = {
      ...mockRemoteEntries,
      updated: true
    };

    expect(mockUpdateCmsData).toHaveBeenCalled();
    expect(entries).toEqual(expectedData);
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

    const expectedData = {
      ...mockSavedCmsData,
      updated: true
    };

    expect(mockClient.sync).toHaveBeenCalledWith(
      expect.objectContaining({
        initial: true
      })
    );
    expect(mockSaveCmsData).toHaveBeenCalledWith(downloadedCmsData);
    expect(updatedCmsData).toEqual(expectedData);
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

    const expectedData = {
      ...mockSavedCmsData,
      updated: true
    };

    expect(mockClient.sync).toHaveBeenCalledWith(
      expect.objectContaining({
        initial: true
      })
    );
    expect(mockSaveCmsData).toHaveBeenCalledWith(downloadedCmsData);
    expect(updatedCmsData).toEqual(expectedData);
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

    const expectedData = {
      ...mockSavedCmsData,
      updated: true
    };

    expect(mockClient.sync).toHaveBeenCalledWith(
      expect.objectContaining({
        initial: false,
        nextSyncToken: mockLocalCmsData.syncToken
      })
    );
    expect(mockSaveCmsData).toHaveBeenCalledWith(downloadedCmsData);
    expect(updatedCmsData).toEqual(expectedData);
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

    const expectedData = {
      ...mockLocalCmsData,
      updated: false
    };

    expect(mockClient.sync).toHaveBeenCalledWith(
      expect.objectContaining({
        initial: false,
        nextSyncToken: mockLocalCmsData.syncToken
      })
    );
    expect(mockSaveCmsData).not.toHaveBeenCalled();
    expect(updatedCmsData).toEqual(expectedData);
  });
});
