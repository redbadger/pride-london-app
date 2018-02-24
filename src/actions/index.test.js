import { getEvents, updateEvents } from "./";

describe("getEvents", () => {
  it("calls correct actions with expected payloads", async () => {
    const mockEvents = [{ id: "1" }];
    const mockGetEventsCms = async () => mockEvents;
    const mockDispatch = jest.fn();

    await getEvents(mockGetEventsCms)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "REQUEST_EVENTS"
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "RECEIVE_EVENTS",
      payload: {
        events: mockEvents
      }
    });
  });
});

describe("updateEvents", () => {
  it("calls correct actions with expected payloads", async () => {
    const mockEvents = [{ id: "1" }];
    const mockUpdateEventsCms = async () => mockEvents;
    const mockDispatch = jest.fn();

    await updateEvents(mockUpdateEventsCms)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "REQUEST_UPDATE_EVENTS"
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "RECEIVE_EVENTS",
      payload: {
        events: mockEvents
      }
    });
  });
});
