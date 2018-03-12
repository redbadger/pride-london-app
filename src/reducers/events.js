// @flow
import type { Reducer } from "redux";
import type { Event } from "../data/event";
import type { EventsAction } from "../actions/events";

export type State = {
  events: Event[],
  loading: boolean,
  refreshing: boolean
};

const defaultState = {
  events: [],
  loading: true,
  refreshing: false
};

const events: Reducer<State, EventsAction> = (
  state: State = defaultState,
  action: EventsAction
) => {
  switch (action.type) {
    case "REQUEST_EVENTS":
      return {
        ...state,
        loading: true,
        refreshing: false
      };
    case "REQUEST_UPDATE_EVENTS":
      return {
        ...state,
        loading: false,
        refreshing: true
      };
    case "RECEIVE_EVENTS":
      return {
        ...state,
        loading: false,
        refreshing: false,
        events: action.payload ? action.payload.events : state.events
      };
    default:
      return state;
  }
};
export default events;
