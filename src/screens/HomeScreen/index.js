// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import strings from "../../constants/strings";
import type { Event, Asset } from "../../data/event";
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
  title: string,
  events: Event[],
  loading: boolean,
  getAssetById: string => Asset
} & OwnProps;

const mapStateToProps = state => ({
  title: strings.featuredEventsTitle,
  events: selectFeaturedEventsByTitle(state, strings.featuredEventsTitle),
  loading: selectEventsLoading(state),
  getAssetById: id => selectAssetById(state, id)
});

const mapDispatchToProps = {};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
