// @flow
import type { Reducer } from "redux";
import type { CmsAction } from "../actions/events";
import type { CmsEntries, CmsAsset } from "../integrations/cms";

export type State = {
  data: {
    entries: CmsEntries[],
    assets: CmsAsset[]
  },
  loading: boolean,
  refreshing: boolean
};

const defaultState = {
  data: {
    entries: [],
    assets: []
  },
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
        data: action.payload
      };
    default:
      return state;
  }
};
export default events;
