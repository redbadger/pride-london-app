// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { EventDays } from "../../data/event";
import { updateEvents } from "../../actions/events";
import {
  selectEventsLoading,
  selectEventsRefreshing,
  selectEventsGroupedByDay
} from "../../selectors/events";
import Component from "./component";

type OwnProps = {
  navigation: NavigationScreenProp<NavigationState>
};

type Props = {
  events: EventDays,
  loading: boolean,
  refreshing: boolean,
  updateEvents: () => Promise<void>
} & OwnProps;

const mapStateToProps = state => ({
  events: selectEventsGroupedByDay(state),
  loading: selectEventsLoading(state),
  refreshing: selectEventsRefreshing(state)
});

const mapDispatchToProps = {
  updateEvents
};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
