import { getEvents, updateEvents } from "./events";

describe("getEvents", () => {
  it("calls correct actions with expected payloads", async () => {
    const mockCmsData = { entries: [{ id: "1" }] };
    const mockGetCmsData = async () => mockCmsData;
    const mockDispatch = jest.fn();

    await getEvents(mockGetCmsData)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "REQUEST_CMS_DATA"
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "RECEIVE_CMS_DATA",
      payload: mockCmsData
    });
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
