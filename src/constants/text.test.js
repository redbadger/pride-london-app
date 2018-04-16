import text from "./text";

describe("Constants text", () => {
  it("returns show events given list of events", () => {
    expect(text.showEvents(2)).toEqual("Show 2 events");
  });

  it("returns no events given empty list", () => {
    expect(text.showEvents(0)).toEqual("No events");
  });

  it("returns show 1 event given list of one", () => {
    expect(text.showEvents(1)).toEqual("Show 1 event");
  });
});
