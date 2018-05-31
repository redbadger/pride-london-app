// @flow
import type { DataAction } from "../actions/data";
import type { CmsEntry } from "../integrations/cms";
import type { Asset } from "../data/asset";
import type { Sponsor } from "../data/sponsor";
import decodeSponsor from "../data/sponsor";
import locale from "../data/locale";
import type { Decoder } from "../lib/decode";
import { filterMap as decodeFilerMap } from "../lib/decode";
import { withDefault as resultWithDefault } from "../lib/result";
import { expandRecurringEventsInEntries } from "../selectors/events";

export type State = {
  entries: CmsEntry[],
  assets: Asset[],
  sponsors: Sponsor[],
  loading: boolean,
  refreshing: boolean
};

const defaultState = {
  entries: [],
  assets: [],
  sponsors: [],
  loading: true,
  refreshing: false
};

const processEntries = entries => expandRecurringEventsInEntries(entries);

// moving locale here so we can deal with it in a single place
// this can be moved inside the reducer function if we later want
// to make this dynamic
const decodeSponsors: Decoder<Array<Sponsor>> = decodeFilerMap(
  decodeSponsor(locale)
);

const reducer = (state: State = defaultState, action: DataAction) => {
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
        assets: action.data.assets,
        sponsors: resultWithDefault([], decodeSponsors(action.data.entries))
      };
    default:
      return state;
  }
};
export default reducer;
