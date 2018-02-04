import { getEvents, updateEvents } from "./cms";

describe("getEvents", () => {
  it("returns local events data if found", async () => {
    const mockLocalEvents = {
      events: [{}]
    };
    const mockLoadEvents = () => mockLocalEvents;
    const mockUpdateEvents = jest.fn();

    const events = await getEvents(mockLoadEvents, mockUpdateEvents);

    expect(mockUpdateEvents).not.toHaveBeenCalled();
    expect(events).toBe(mockLocalEvents.events);
  });

  it("updates events if local events list is empty", async () => {
    const mockLocalEvents = {
      events: []
    };
    const mockLoadEvents = () => mockLocalEvents;
    const mockUpdateEvents = jest.fn();

    await getEvents(mockLoadEvents, mockUpdateEvents);

    expect(mockUpdateEvents).toHaveBeenCalled();
  });

  it("updates events if local events not found", async () => {
    const mockLocalEvents = null;
    const mockLoadEvents = () => mockLocalEvents;
    const mockUpdateEvents = jest.fn();

    await getEvents(mockLoadEvents, mockUpdateEvents);

    expect(mockUpdateEvents).toHaveBeenCalled();
  });
});

describe("updateEvents", () => {
  it("downloads full event data if local events list is empty", async () => {
    const mockLocalEvents = {
      events: []
    };
    const mockSavedEvents = {
      events: []
    };
    const downloadedEventData = {
      entries: [],
      deletedEntries: [],
      nextSyncToken: "abc"
    };
    const mockLoadEvents = () => mockLocalEvents;
    const mockSaveEvents = jest.fn(() => mockSavedEvents);
    const mockClient = {
      sync: jest.fn(() => downloadedEventData)
    };

    const updatedEvents = await updateEvents(
      mockLoadEvents,
      mockSaveEvents,
      mockClient
    );

    expect(mockClient.sync).toHaveBeenCalledWith(
      expect.objectContaining({
        initial: true
      })
    );
    expect(mockSaveEvents).toHaveBeenCalledWith(
      downloadedEventData.entries,
      [],
      downloadedEventData.nextSyncToken
    );
    expect(updatedEvents).toBe(mockSavedEvents.events);
  });

  it("saves only event entries of cms data", async () => {
    const mockLocalEvents = {
      events: []
    };
    const mockSavedEvents = {
      events: []
    };
    const downloadedEventData = {
      entries: [
        { sys: { contentType: { sys: { id: "event" } } } },
        { sys: { contentType: { sys: { id: "page" } } } }
      ],
      deletedEntries: [],
      nextSyncToken: "abc"
    };
    const mockLoadEvents = () => mockLocalEvents;
    const mockSaveEvents = jest.fn(() => mockSavedEvents);
    const mockClient = {
      sync: jest.fn(() => downloadedEventData)
    };

    const updatedEvents = await updateEvents(
      mockLoadEvents,
      mockSaveEvents,
      mockClient
    );

    expect(mockClient.sync).toHaveBeenCalledWith(
      expect.objectContaining({
        initial: true
      })
    );
    expect(mockSaveEvents).toHaveBeenCalledWith(
      [{ sys: { contentType: { sys: { id: "event" } } } }],
      [],
      downloadedEventData.nextSyncToken
    );
    expect(updatedEvents).toBe(mockSavedEvents.events);
  });

  it("downloads full event data if local events not found", async () => {
    const mockLocalEvents = null;
    const mockSavedEvents = {
      events: []
    };
    const downloadedEventData = {
      entries: [],
      deletedEntries: [],
      nextSyncToken: "abc"
    };
    const mockLoadEvents = () => mockLocalEvents;
    const mockSaveEvents = jest.fn(() => mockSavedEvents);
    const mockClient = {
      sync: jest.fn(() => downloadedEventData)
    };

    const updatedEvents = await updateEvents(
      mockLoadEvents,
      mockSaveEvents,
      mockClient
    );

    expect(mockClient.sync).toHaveBeenCalledWith(
      expect.objectContaining({
        initial: true
      })
    );
    expect(mockSaveEvents).toHaveBeenCalledWith(
      downloadedEventData.entries,
      [],
      downloadedEventData.nextSyncToken
    );
    expect(updatedEvents).toBe(mockSavedEvents.events);
  });

  it("downloads delta update if local events are found", async () => {
    const mockLocalEvents = {
      events: [{}],
      syncToken: "123"
    };
    const mockSavedEvents = {
      events: []
    };
    const downloadedEventData = {
      entries: [],
      deletedEntries: [],
      nextSyncToken: "abc"
    };
    const mockLoadEvents = () => mockLocalEvents;
    const mockSaveEvents = jest.fn(() => mockSavedEvents);
    const mockClient = {
      sync: jest.fn(() => downloadedEventData)
    };

    const updatedEvents = await updateEvents(
      mockLoadEvents,
      mockSaveEvents,
      mockClient
    );

    expect(mockClient.sync).toHaveBeenCalledWith(
      expect.objectContaining({
        initial: false,
        nextSyncToken: mockLocalEvents.syncToken
      })
    );
    expect(mockSaveEvents).toHaveBeenCalledWith(
      downloadedEventData.entries,
      [],
      downloadedEventData.nextSyncToken
    );
    expect(updatedEvents).toBe(mockSavedEvents.events);
  });

  it("sends deletions to local storage if found", async () => {
    const mockLocalEvents = {
      events: [{ sys: { id: "1" } }],
      syncToken: "123"
    };
    const mockSavedEvents = {
      events: []
    };
    const downloadedEventData = {
      entries: [],
      deletedEntries: [{ sys: { id: "1" } }],
      nextSyncToken: "abc"
    };
    const mockLoadEvents = () => mockLocalEvents;
    const mockSaveEvents = jest.fn(() => mockSavedEvents);
    const mockClient = {
      sync: jest.fn(() => downloadedEventData)
    };

    const updatedEvents = await updateEvents(
      mockLoadEvents,
      mockSaveEvents,
      mockClient
    );

    expect(mockClient.sync).toHaveBeenCalledWith(
      expect.objectContaining({
        initial: false,
        nextSyncToken: mockLocalEvents.syncToken
      })
    );
    expect(mockSaveEvents).toHaveBeenCalledWith(
      downloadedEventData.entries,
      downloadedEventData.deletedEntries,
      downloadedEventData.nextSyncToken
    );
    expect(updatedEvents).toBe(mockSavedEvents.events);
  });
});
