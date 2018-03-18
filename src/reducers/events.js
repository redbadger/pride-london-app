// @flow
import type { Reducer } from "redux";
import type { CmsAction } from "../actions/events";
import type { CmsEntry } from "../integrations/cms";
import type { Asset } from "../data/event";

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

const events: Reducer<State, CmsAction> = (
  state: State = defaultState,
  action: CmsAction
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
        ...state,
        loading: false,
        refreshing: false,
        entries: action.payload ? action.payload.entries : [],
        assets: action.payload ? action.payload.assets : []
      };
    default:
      return state;
  }
};
export default events;
