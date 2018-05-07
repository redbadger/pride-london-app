import {
  setEventFilters,
  stageEventFilters,
  commitEventFilters,
  clearStagedEventFilters
} from "./event-filters";

describe("setEventFilters", () => {
  it("creates correct action with expected payload", () => {
    const updates = {
      date: "2018-02-02",
      time: ["morning"]
    };
    const mockDispatch = jest.fn();

    setEventFilters(updates)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_EVENT_FILTERS",
      payload: updates
    });
  });
});

describe("stageEventFilters", () => {
  it("calls correct action with expected payload", async () => {
    const updates = {
      date: "2018-02-02",
      time: ["morning"]
    };
    const mockDispatch = jest.fn();

    await stageEventFilters(updates)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "STAGE_EVENT_FILTERS",
      payload: updates
    });
  });
});

describe("commitEventFilters", () => {
  it("calls correct action with expected payload", async () => {
    const mockDispatch = jest.fn();

    await commitEventFilters()(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "COMMIT_EVENT_FILTERS"
    });
  });
});

describe("clearStagedEventFilters", () => {
  it("calls correct action with expected payload", async () => {
    const mockDispatch = jest.fn();

    await clearStagedEventFilters()(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "CLEAR_STAGED_EVENT_FILTERS"
    });
  });
});
