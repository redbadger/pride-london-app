// @flow
import reducer from "./saved-events";

describe("Saved events reducer", () => {
  it("initialises with default state", () => {
    // $FlowFixMe
    const state = reducer(undefined, {});

    expect(state).toMatchSnapshot();
  });

  describe("ADD_SAVED_EVENT action", () => {
    it("adds id when missing", () => {
      const id = "bdb09a00-c62d-41c7-a660-2b4557b3b096";
      const initialState = new Set();
      const state = reducer(initialState, {
        type: "ADD_SAVED_EVENT",
        id
      });

      expect(state).toMatchSnapshot();
    });

    it("does not add id when present", () => {
      const id = "279aacf6-e4ad-4383-a1bc-0a8b59ac2e64";
      const initialState = new Set([id]);
      const state = reducer(initialState, {
        type: "ADD_SAVED_EVENT",
        id
      });

      expect(state).toMatchSnapshot();
    });
  });

  describe("REMOVE_SAVED_EVENT action", () => {
    it("removes id when present", () => {
      const id = "7b717417-eb24-40c6-8f50-00fc724918f4";
      const initialState = new Set([id]);
      const state = reducer(initialState, {
        type: "REMOVE_SAVED_EVENT",
        id
      });

      expect(state).toMatchSnapshot();
    });

    it("does not remove id when missing", () => {
      const id = "b85fe390-c989-452f-88b6-020ee7d41644";
      const initialState = new Set();
      const state = reducer(initialState, {
        type: "REMOVE_SAVED_EVENT",
        id
      });

      expect(state).toMatchSnapshot();
    });
  });

  describe("RECEIVE_SAVED_EVENTS action", () => {
    it("updates saved events", () => {
      const a = "7b717417-eb24-40c6-8f50-00fc724918f4";
      const b = "bbf24715-1a40-42d3-a246-8d002ecad2a2";

      const initialState = new Set();
      const state = reducer(initialState, {
        type: "RECEIVE_SAVED_EVENTS",
        events: new Set([a, b])
      });

      expect(state).toMatchSnapshot();
    });
  });
});
