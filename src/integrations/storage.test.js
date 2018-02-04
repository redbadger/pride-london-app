import { loadEvents, saveEvents } from "./storage";

describe("saveEvents", () => {
  it("appends events to list found in local storage", async () => {
    const newEvents = [{ sys: { id: "1" } }, { sys: { id: "2" } }];
    const deletedEvents = [];
    const syncToken = "abc";
    const mockLoadEvents = async () => ({
      events: [{ sys: { id: "3" } }, { sys: { id: "4" } }],
      syncToken: "123"
    });
    const mockAsyncStorage = { setItem: jest.fn() };
    const expectedEventsData = {
      events: [
        { sys: { id: "1" } },
        { sys: { id: "2" } },
        { sys: { id: "3" } },
        { sys: { id: "4" } }
      ],
      syncToken: "abc"
    };
    const expectedStringifiedEvents = '{"sys":{"id":"1"}},{"sys":{"id":"2"}}';

    const savedEvents = await saveEvents(
      newEvents,
      deletedEvents,
      syncToken,
      mockLoadEvents,
      mockAsyncStorage
    );

    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
      expect.any(String),
      expect.stringContaining(expectedStringifiedEvents)
    );
    expect(savedEvents.events).toEqual(
      expect.arrayContaining(expectedEventsData.events)
    );
    expect(savedEvents.syncToken).toEqual(expectedEventsData.syncToken);
  });

  it("adds events to local storage if local events are empty", async () => {
    const newEvents = [{ sys: { id: "1" } }, { sys: { id: "2" } }];
    const deletedEvents = [];
    const syncToken = "abc";
    const mockLoadEvents = async () => ({
      events: [],
      syncToken: "123"
    });
    const mockAsyncStorage = { setItem: jest.fn() };
    const expectedEventsData = {
      events: [{ sys: { id: "1" } }, { sys: { id: "2" } }],
      syncToken: "abc"
    };

    const savedEvents = await saveEvents(
      newEvents,
      deletedEvents,
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
    const newEvents = [{ sys: { id: "1" } }, { sys: { id: "2" } }];
    const deletedEvents = [];
    const syncToken = "abc";
    const mockLoadEvents = async () => null;
    const mockAsyncStorage = { setItem: jest.fn() };
    const expectedEventsData = {
      events: [{ sys: { id: "1" } }, { sys: { id: "2" } }],
      syncToken: "abc"
    };

    const savedEvents = await saveEvents(
      newEvents,
      deletedEvents,
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

  it("removes events from local storage if listed in deletions", async () => {
    const newEvents = [];
    const deletedEvents = [{ sys: { id: "1" } }];
    const syncToken = "abc";
    const mockLoadEvents = async () => ({
      events: [{ sys: { id: "1" } }, { sys: { id: "2" } }],
      syncToken: "123"
    });
    const mockAsyncStorage = { setItem: jest.fn() };
    const expectedEventsData = {
      events: [{ sys: { id: "2" } }],
      syncToken: "abc"
    };

    const savedEvents = await saveEvents(
      newEvents,
      deletedEvents,
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

  it("updates events in local storage when new revision provided", async () => {
    const newEvents = [{ sys: { id: "1", revision: 2 } }];
    const deletedEvents = [];
    const syncToken = "abc";
    const mockLoadEvents = async () => ({
      events: [
        { sys: { id: "1", revision: 1 } },
        { sys: { id: "2", revision: 1 } }
      ],
      syncToken: "123"
    });
    const mockAsyncStorage = { setItem: jest.fn() };
    const expectedEventsData = {
      events: [
        { sys: { id: "1", revision: 2 } },
        { sys: { id: "2", revision: 1 } }
      ],
      syncToken: "abc"
    };

    const savedEvents = await saveEvents(
      newEvents,
      deletedEvents,
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
