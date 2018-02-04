import { loadEvents, saveEvents } from "./storage";

describe("saveEvents", () => {
  it("appends events to list found in local storage", async () => {
    const newEvents = [{ id: "1" }, { id: "2" }];
    const syncToken = "abc";
    const mockLoadEvents = async () => ({
      events: [{ id: "3" }, { id: "4" }],
      syncToken: "123"
    });
    const mockAsyncStorage = { setItem: jest.fn() };
    const expectedEventsData = {
      events: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }],
      syncToken: "abc"
    };

    const savedEvents = await saveEvents(
      newEvents,
      syncToken,
      mockLoadEvents,
      mockAsyncStorage
    );

    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify(expectedEventsData)
    );
    expect(savedEvents).toEqual(expectedEventsData);
  });

  it("adds events to local storage if local events are empty", async () => {
    const newEvents = [{ id: "1" }, { id: "2" }];
    const syncToken = "abc";
    const mockLoadEvents = async () => ({
      events: [],
      syncToken: "123"
    });
    const mockAsyncStorage = { setItem: jest.fn() };
    const expectedEventsData = {
      events: [{ id: "1" }, { id: "2" }],
      syncToken: "abc"
    };

    const savedEvents = await saveEvents(
      newEvents,
      syncToken,
      mockLoadEvents,
      mockAsyncStorage
    );

    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify(expectedEventsData)
    );
    expect(savedEvents).toEqual(expectedEventsData);
  });

  it("adds events to local storage if local events are not found", async () => {
    const newEvents = [{ id: "1" }, { id: "2" }];
    const syncToken = "abc";
    const mockLoadEvents = async () => null;
    const mockAsyncStorage = { setItem: jest.fn() };
    const expectedEventsData = {
      events: [{ id: "1" }, { id: "2" }],
      syncToken: "abc"
    };

    const savedEvents = await saveEvents(
      newEvents,
      syncToken,
      mockLoadEvents,
      mockAsyncStorage
    );

    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify(expectedEventsData)
    );
    expect(savedEvents).toEqual(expectedEventsData);
  });
});

describe("loadEvents", () => {
  it("parses JSON object from local storage", async () => {
    const mockData = { events: [] };
    const mockAsyncStorage = { getItem: () => JSON.stringify(mockData) };

    const loadedData = await loadEvents(mockAsyncStorage);
    expect(loadedData).toEqual(mockData);
  });
});
