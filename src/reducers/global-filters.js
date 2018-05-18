// @flow
import type { Reducer } from "redux";
import type { DateTime } from "luxon";
import type { NavigationAction } from "../actions/navigation";
import { NAVIGATION } from "../actions/navigation";
import { HOME, PARADE, SUPPORT_US, DONATE, SPONSOR } from "../constants/routes";

export type State = {
  hideEventsBefore: DateTime
};

type Action = NavigationAction;

const includedRoutes = [HOME, PARADE, DONATE, SPONSOR, SUPPORT_US];

const globalFilters = (now: void => DateTime) => {
  const defaultState: State = {
    hideEventsBefore: now()
  };
  const reducer: Reducer<State, Action> = (
    state: State = defaultState,
    action: any
  ) => {
    switch (action.type) {
      case NAVIGATION:
        if (includedRoutes.includes(action.route)) {
          return {
            hideEventsBefore: now()
          };
        }
        return state;
      default:
        return state;
    }
  };
  return reducer;
};

export default globalFilters;
