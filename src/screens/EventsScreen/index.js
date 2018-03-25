// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { EventDays, Asset } from "../../data/event";
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
  getAssetById: string => Asset
} & OwnProps;

const mapStateToProps = state => ({
  events: groupEventsByStartTime(selectFilteredEvents(state)),
  loading: selectEventsLoading(state),
  refreshing: selectEventsRefreshing(state),
  getAssetById: id => selectAssetById(state, id)
});

const mapDispatchToProps = {
  updateEvents
};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
