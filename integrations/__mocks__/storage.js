export const saveEvents = async (newEvents, syncToken) => ({
  events: newEvents,
  syncToken
});

export const loadEvents = async () => ({ events: [], syncToken: "abc" });
