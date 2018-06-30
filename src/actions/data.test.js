// @flow
import { getData, backgroundRefreshData, updateData } from "./data";

describe("getData", () => {
  it("dispatches REQUEST_CMS_DATA then RECEIVE_CMS_DATA", async () => {
    const mockCmsData: any = { entries: [{ id: "1" }] };
    const mockGetCmsData = async () => mockCmsData;
    const mockDispatch = jest.fn();

    await getData(mockGetCmsData)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "REQUEST_CMS_DATA"
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "RECEIVE_CMS_DATA",
      data: mockCmsData
    });
  });

  it("dispatches REQUEST_CMS_DATA then NO_DATA_RECEIVED on error", async () => {
    const mockGetCmsData = () => Promise.reject(new Error("no network"));
    const mockDispatch = jest.fn();

    await getData(mockGetCmsData)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "NO_DATA_RECEIVED"
    });
  });
});

describe("backgroundRefreshData", () => {
  it("updates the data if new content was received", async () => {
    const mockCmsData: any = { entries: [{ id: "1" }], updated: true };
    const mockUpdateCmsData = async () => mockCmsData;
    const mockDispatch = jest.fn();

    await backgroundRefreshData(mockUpdateCmsData)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "RECEIVE_CMS_DATA",
      data: mockCmsData
    });
  });

  it("skips updating if no new content was received", async () => {
    const mockCmsData: any = { entries: [{ id: "1" }], updated: false };
    const mockUpdateCmsData = async () => mockCmsData;
    const mockDispatch = jest.fn();

    await backgroundRefreshData(mockUpdateCmsData)(mockDispatch);

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("skips updating if updated failed", async () => {
    const mockUpdateCmsData = () => Promise.reject(new Error("no network"));
    const mockDispatch = jest.fn();

    await backgroundRefreshData(mockUpdateCmsData)(mockDispatch);

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});

describe("updateData", () => {
  it("dispatches REQUEST_UPDATE_CMS_DATA then RECEIVE_CMS_DATA", async () => {
    const mockCmsData: any = { entries: [{ id: "1" }] };
    const mockUpdateCmsData = async () => mockCmsData;
    const mockDispatch = jest.fn();

    await updateData(mockUpdateCmsData)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "REQUEST_UPDATE_CMS_DATA"
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "RECEIVE_CMS_DATA",
      data: mockCmsData
    });
  });

  it("dispatches REQUEST_UPDATE_CMS_DATA then NO_DATA_RECEIVED on error", async () => {
    const mockUpdateCmsData = () => Promise.reject(new Error("no network"));
    const mockDispatch = jest.fn();

    await updateData(mockUpdateCmsData)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "REQUEST_UPDATE_CMS_DATA"
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "NO_DATA_RECEIVED"
    });
  });
});
