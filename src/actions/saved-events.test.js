// @flow
import { addSavedEvent, removeSavedEvent } from "./saved-events";

describe("addSavedEvent", () => {
  it("calls correct action with expected payload", async () => {
    const id = "814c6290-633d-4f1a-9cb0-6d52e952b0de";
    const mockDispatch = jest.fn();

    addSavedEvent(id)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_SAVED_EVENT",
      id
    });
  });
});

describe("removeSavedEvent", () => {
  it("calls correct action with expected payload", async () => {
    const id = "e45cee87-e7cf-47ae-9799-229d4aab207d";
    const mockDispatch = jest.fn();

    removeSavedEvent(id)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "REMOVE_SAVED_EVENT",
      id
    });
  });
});
