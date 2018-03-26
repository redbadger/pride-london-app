// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import strings from "../../constants/strings";
import type { Event, LocalizedFieldRef } from "../../data/event";
import getAssetUrl from "../../data/get-asset-url";
import {
  selectFeaturedEventsByTitle,
  selectEventsLoading,
  selectAssetById
} from "../../selectors/events";
import Component from "./component";

type OwnProps = {
  navigation: NavigationScreenProp<NavigationState>
};

type Props = {
  featuredEventsTitle: string,
  featuredEvents: Event[],
  loading: boolean,
  getAssetUrl: LocalizedFieldRef => string
} & OwnProps;

const mapStateToProps = state => ({
  featuredEventsTitle: strings.featuredEventsTitle,
  featuredEvents: selectFeaturedEventsByTitle(
    state,
    strings.featuredEventsTitle
  ),
  loading: selectEventsLoading(state),
  getAssetUrl: getAssetUrl(id => selectAssetById(state, id))
});

const mapDispatchToProps = {};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
