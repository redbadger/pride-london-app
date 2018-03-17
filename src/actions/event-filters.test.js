import { updateEventFilters } from "./event-filters";

describe("updateEventFilters", () => {
  it("calls correct action with expected payload", async () => {
    const updates = {
      date: "2018-02-02",
      time: ["morning"]
    };
    const mockDispatch = jest.fn();

    await updateEventFilters(updates)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "UPDATE_EVENT_FILTERS",
      payload: updates
    });
  });
});
