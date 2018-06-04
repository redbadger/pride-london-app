// @flow
import type { DataAction } from "../actions/data";
import type { CmsEntry } from "../integrations/cms";
import type { Asset } from "../data/asset";
import type { HeaderBanner } from "../data/header-banner";
import type { Images } from "../data/image";
import type { Performances } from "../data/performance";
import type { Sponsor } from "../data/sponsor";
import decodeHeaderBanner from "../data/header-banner";
import decodeImage from "../data/image";
import decodePerformance from "../data/performance";
import decodeSponsor from "../data/sponsor";
import locale from "../data/locale";
import type { Decoder } from "../lib/decode";
import { filterMap as decodeFilterMap, map as decodeMap } from "../lib/decode";
import { withDefault as resultWithDefault } from "../lib/result";
import { expandRecurringEventsInEntries } from "../selectors/events";

export type State = {
  entries: CmsEntry[],
  assets: Asset[],
  headerBanners: HeaderBanner[],
  images: Images,
  performances: Performances,
  sponsors: Sponsor[],
  loading: boolean,
  refreshing: boolean
};

const defaultState = {
  entries: [],
  assets: [],
  headerBanners: [],
  images: {},
  performances: {},
  sponsors: [],
  loading: true,
  refreshing: false
};

const processEntries = entries => expandRecurringEventsInEntries(entries);

type ObjectWithId<A> = {
  id: string
} & A;

const reduceToMapHelp = <A>(
  acc: { [id: string]: ObjectWithId<A> },
  item: ObjectWithId<A>
): { [id: string]: ObjectWithId<A> } => {
  acc[item.id] = item; // intentional mutation as this happens in a reduce
  return acc;
};

// moving locale here so we can deal with it in a single place
// this can be moved inside the reducer function if we later want
// to make this dynamic
const decodeHeaderBanners: Decoder<Array<HeaderBanner>> = decodeFilterMap(
  decodeHeaderBanner(locale)
);

const decodeImages: Decoder<Images> = decodeMap(
  images => images.reduce(reduceToMapHelp, {}),
  decodeFilterMap(decodeImage(locale))
);

const decodePerformances: Decoder<Performances> = decodeMap(
  performances => performances.reduce(reduceToMapHelp, {}),
  decodeFilterMap(decodePerformance(locale))
);

const decodeSponsors: Decoder<Array<Sponsor>> = decodeFilterMap(
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
        headerBanners: resultWithDefault(
          [],
          decodeHeaderBanners(action.data.entries)
        ),
        images: resultWithDefault({}, decodeImages(action.data.assets)),
        performances: resultWithDefault(
          {},
          decodePerformances(action.data.entries)
        ),
        sponsors: resultWithDefault([], decodeSponsors(action.data.entries))
      };
    case "RECEIVE_CMS_ERROR":
      return {
        ...state,
        loading: false,
        refreshing: false
      };
    default:
      return state;
  }
};
export default reducer;
