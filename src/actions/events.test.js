import { getEvents, backgroundRefreshEvents, updateEvents } from "./events";

describe("getEvents", () => {
  it("calls correct actions with expected payloads", async () => {
    const mockCmsData = { entries: [{ id: "1" }] };
    const mockGetCmsData = async () => mockCmsData;
    const mockDispatch = jest.fn();

    await getEvents(undefined, mockGetCmsData)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "REQUEST_CMS_DATA"
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "RECEIVE_CMS_DATA",
      payload: mockCmsData
    });
  });

  it("hides the splash screen if given", async () => {
    const mockGetCmsData = async () => {};
    const mockDispatch = jest.fn();
    const hideMock = jest.fn();

    await getEvents(hideMock, mockGetCmsData)(mockDispatch);

    expect(hideMock).toHaveBeenCalled();
  });
});

describe("backgroundRefreshEvents", () => {
  it("updates the data if new content was received", async () => {
    const mockCmsData = { entries: [{ id: "1" }], updated: true };
    const mockUpdateCmsData = async () => mockCmsData;
    const mockDispatch = jest.fn();

    await backgroundRefreshEvents(mockUpdateCmsData)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "RECEIVE_CMS_DATA",
      payload: mockCmsData
    });
  });

  it("skips updating if no new content was received", async () => {
    const mockCmsData = { entries: [{ id: "1" }], updated: false };
    const mockUpdateCmsData = async () => mockCmsData;
    const mockDispatch = jest.fn();

    await backgroundRefreshEvents(mockUpdateCmsData)(mockDispatch);

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});

describe("updateEvents", () => {
  it("calls correct actions with expected payloads", async () => {
    const mockCmsData = { entries: [{ id: "1" }] };
    const mockUpdateCmsData = async () => mockCmsData;
    const mockDispatch = jest.fn();

    await updateEvents(mockUpdateCmsData)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "REQUEST_UPDATE_CMS_DATA"
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "RECEIVE_CMS_DATA",
      payload: mockCmsData
    });
  });
});
