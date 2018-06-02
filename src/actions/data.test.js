import { getData, backgroundRefreshData, updateData } from "./data";

describe("getData", () => {
  it("calls correct actions with expected payloads", async () => {
    const mockCmsData = { entries: [{ id: "1" }] };
    const mockGetCmsData = async () => mockCmsData;
    const mockDispatch = jest.fn();

    await getData(undefined, mockGetCmsData)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "REQUEST_CMS_DATA"
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "RECEIVE_CMS_DATA",
      data: mockCmsData
    });
  });

  it("hides the splash screen if given", async () => {
    const mockGetCmsData = async () => {};
    const mockDispatch = jest.fn();
    const hideMock = jest.fn();

    await getData(hideMock, mockGetCmsData)(mockDispatch);

    expect(hideMock).toHaveBeenCalled();
  });
});

describe("backgroundRefreshData", () => {
  it("updates the data if new content was received", async () => {
    const mockCmsData = { entries: [{ id: "1" }], updated: true };
    const mockUpdateCmsData = async () => mockCmsData;
    const mockDispatch = jest.fn();

    await backgroundRefreshData(mockUpdateCmsData)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "RECEIVE_CMS_DATA",
      data: mockCmsData
    });
  });

  it("skips updating if no new content was received", async () => {
    const mockCmsData = { entries: [{ id: "1" }], updated: false };
    const mockUpdateCmsData = async () => mockCmsData;
    const mockDispatch = jest.fn();

    await backgroundRefreshData(mockUpdateCmsData)(mockDispatch);

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});

describe("updateData", () => {
  it("calls correct actions with expected payloads", async () => {
    const mockCmsData = { entries: [{ id: "1" }] };
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
});
