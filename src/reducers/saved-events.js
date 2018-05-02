// @flow
import type { Reducer } from "redux";
import type { SavedEventAction } from "../actions/saved-events";
import type { SavedEvents as State } from "../data/event";

const defaultState = new Set();

const savedEvents: Reducer<State, SavedEventAction> = (
  state: State = defaultState,
  action: SavedEventAction
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
    case "RECEIVE_SAVED_EVENTS":
      return action.events;
    default:
      return state;
  }
};

export default savedEvents;
