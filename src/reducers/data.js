// @flow
import type { Reducer } from "redux";
import type { DataAction } from "../actions/data";
import type { CmsEntry } from "../integrations/cms";
import type { Asset } from "../data/asset";
import { expandRecurringEventsInEntries } from "../selectors/events";

export type State = {
  entries: CmsEntry[],
  assets: Asset[],
  loading: boolean,
  refreshing: boolean
};

const defaultState = {
  entries: [],
  assets: [],
  loading: true,
  refreshing: false
};

const processEntries = entries => expandRecurringEventsInEntries(entries);

const reducer: Reducer<State, DataAction> = (
  state: State = defaultState,
  action: DataAction
) => {
  switch (action.type) {
    case "REQUEST_CMS_DATA":
      return {
        ...state,
        loading: true,
        refreshing: false
      };
    case "REQUEST_UPDATE_CMS_DATA":
      return {
        ...state,
        loading: false,
        refreshing: true
      };
    case "RECEIVE_CMS_DATA":
      return {
        loading: false,
        refreshing: false,
        entries: processEntries(action.data.entries),
        assets: action.data.assets
      };
    default:
      return state;
  }
};
export default reducer;
