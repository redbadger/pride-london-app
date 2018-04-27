// @flow
import type { Reducer } from "redux";
import type { SaveEventAction } from "../actions/saved-events";
import type { SavedEvents as State } from "../data/event";

const defaultState = new Set();

const savedEvents: Reducer<State, SaveEventAction> = (
  state: State = defaultState,
  action: SaveEventAction
) => {
  switch (action.type) {
    case "ADD_SAVED_EVENT":
      if (!state.has(action.id)) {
        return new Set(state.values()).add(action.id);
      }
      return state;
    case "REMOVE_SAVED_EVENT":
      if (state.has(action.id)) {
        const newState = new Set(state.values());
        newState.delete(action.id);
        return newState;
      }
      return state;
    default:
      return state;
  }
};

export default savedEvents;
