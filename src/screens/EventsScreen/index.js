// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { EventDays, LocalizedFieldRef } from "../../data/event";
import getAssetUrl from "../../data/get-asset-url";
import { updateEvents } from "../../actions/events";
import {
  groupEventsByStartTime,
  selectEventsLoading,
  selectEventsRefreshing,
  selectFilteredEvents,
  selectAssetById
} from "../../selectors/events";
import Component from "./component";

type OwnProps = {
  navigation: NavigationScreenProp<NavigationState>
};

type Props = {
  events: EventDays,
  loading: boolean,
  refreshing: boolean,
  updateEvents: () => Promise<void>,
  getAssetUrl: LocalizedFieldRef => string
} & OwnProps;

const mapStateToProps = state => ({
  events: groupEventsByStartTime(selectFilteredEvents(state)),
  loading: selectEventsLoading(state),
  refreshing: selectEventsRefreshing(state),
  getAssetUrl: getAssetUrl(id => selectAssetById(state, id))
});

const mapDispatchToProps = {
  updateEvents
};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
