// @flow
import {
  addSavedEvent,
  removeSavedEvent,
  loadSavedEvents
} from "./saved-events";

describe("addSavedEvent", () => {
  it("dispatches ADD_SAVED_EVENT action with expected id", async () => {
    const id = "814c6290-633d-4f1a-9cb0-6d52e952b0de";
    const mockDispatch = jest.fn();
    const mockFetchSavedEvents = async () => new Set();
    const mockStoreSavedEvents = async () => new Set();

    await addSavedEvent(id, mockFetchSavedEvents, mockStoreSavedEvents)(
      mockDispatch
    );

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_SAVED_EVENT",
      id
    });
  });

  it("updates the stores the events with id added", async () => {
    const id = "e45cee87-e7cf-47ae-9799-229d4aab207d";
    const storedEvents = new Set(["b", "c"]);
    const mockDispatch = jest.fn();
    const mockFetchSavedEvents = jest
      .fn()
      .mockReturnValue(Promise.resolve(storedEvents));
    const mockStoreSavedEvents = jest.fn();

    await addSavedEvent(id, mockFetchSavedEvents, mockStoreSavedEvents)(
      mockDispatch
    );

    expect(mockStoreSavedEvents).toHaveBeenCalledWith(new Set(["b", "c", id]));
  });
});

describe("removeSavedEvent", () => {
  it("dispatches REMOVE_SAVED_EVENT action with expected id", async () => {
    const id = "e45cee87-e7cf-47ae-9799-229d4aab207d";
    const mockDispatch = jest.fn();
    const mockFetchSavedEvents = async () => new Set();
    const mockStoreSavedEvents = async () => new Set();

    await removeSavedEvent(id, mockFetchSavedEvents, mockStoreSavedEvents)(
      mockDispatch
    );

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "REMOVE_SAVED_EVENT",
      id
    });
  });

  it("updates the stores the events with id removed", async () => {
    const id = "e45cee87-e7cf-47ae-9799-229d4aab207d";
    const storedEvents = new Set([id, "b", "c"]);
    const mockDispatch = jest.fn();
    const mockFetchSavedEvents = jest
      .fn()
      .mockReturnValue(Promise.resolve(storedEvents));
    const mockStoreSavedEvents = jest.fn();

    await removeSavedEvent(id, mockFetchSavedEvents, mockStoreSavedEvents)(
      mockDispatch
    );

    expect(mockStoreSavedEvents).toHaveBeenCalledWith(new Set(["b", "c"]));
  });
});

describe("loadSavedEvents", () => {
  it("calls correct actions with expected payloads", async () => {
    const mockEvents = new Set(["a", "b", "c"]);
    const mockFetchSavedEvents = async () => mockEvents;
    const mockDispatch = jest.fn();

    await loadSavedEvents(mockFetchSavedEvents)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "REQUEST_SAVED_EVENTS"
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "RECEIVE_SAVED_EVENTS",
      events: mockEvents
    });
  });
});
