// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import { createSelector } from "reselect";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { State } from "../../reducers";
import type { Event } from "../../data/event";
import type { HeaderBanner } from "../../data/header-banner";
import type { ImageDetails } from "../../data/image";
import { getImageDetails } from "../../data/image";
import strings from "../../constants/strings";
import { selectData, getFeaturedEventsResolvedEvents } from "../../selectors";
import { selectLoading } from "../../selectors/data";
import { selectHeaderBanners } from "../../selectors/header-banner";
import Component from "./component";
import onlyUpdateWhenFocused from "../../components/OnlyUpdateWhenFocused";

type OwnProps = {
  navigation: NavigationScreenProp<NavigationState>
};

type StateProps = {
  navigation: NavigationScreenProp<NavigationState>,
  headerBanners: HeaderBanner[],
  featuredEventsTitle: string,
  featuredEvents: Event[],
  loading: boolean,
  getImageDetails: string => ?ImageDetails
};

type Props = StateProps;

const getDataLoading = createSelector([selectData], selectLoading);

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (
  state: State,
  { navigation }: OwnProps
): StateProps => ({
  navigation,
  headerBanners: selectHeaderBanners(state),
  featuredEventsTitle: strings.featuredEventsTitle,
  featuredEvents: getFeaturedEventsResolvedEvents(
    state,
    strings.featuredEventsTitle
  ),
  loading: getDataLoading(state),
  getImageDetails: getImageDetails(state.data.images)
});

const mapDispatchToProps = {};

const connector: Connector<StateProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(onlyUpdateWhenFocused(Component));
