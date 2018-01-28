import { getEvents } from "./cms";

test("getEvents returns event items from client", async () => {
  const events = await getEvents();

  expect(events).toBeDefined();
  expect(Array.isArray(events)).toBe(true);
});
