// @flow
import type { Reducer } from "redux";
import type { NavigationAction } from "../actions/navigation";

export type State = string;
const defaultState = "";

const events: Reducer<State, NavigationAction> = (
  state: State = defaultState,
  action: NavigationAction
) => {
  switch (action.type) {
    case "NAVIGATION":
      return action.route;
    default:
      return state;
  }
};
export default events;
