// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
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
  events: Event[],
  loading: boolean,
  getAssetById: string => Asset
} & OwnProps;

const mapStateToProps = state => ({
  events: selectFeaturedEventsByTitle(state, "Parties"),
  loading: selectEventsLoading(state),
  getAssetById: id => selectAssetById(state, id)
});

const mapDispatchToProps = {};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
