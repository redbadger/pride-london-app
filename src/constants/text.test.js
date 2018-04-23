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

  it("returns show events given list of events", () => {
    expect(text.filterPickerApply(2)).toEqual("Show 2 events");
  });

  it("returns no events given empty list", () => {
    expect(text.filterPickerApply(0)).toEqual("No events");
  });

  it("returns show 1 event given list of one", () => {
    expect(text.filterPickerApply(1)).toEqual("Show 1 event");
  });

  it("returns show events given list of events", () => {
    expect(text.filterPickerApplyLabel(2)).toEqual("Show 2 selected events");
  });

  it("returns no events given empty list", () => {
    expect(text.filterPickerApplyLabel(0)).toEqual(
      "Show events (none selected)"
    );
  });

  it("returns show 1 event given list of one", () => {
    expect(text.filterPickerApplyLabel(1)).toEqual("Show 1 selected event");
  });
});
