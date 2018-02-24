// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { Event } from "../../integrations/cms";
import { updateEvents } from "../../actions";
import Component from "./component";

type OwnProps = {
  navigation: NavigationScreenProp<NavigationState>
};

type Props = {
  events: Event[],
  loading: boolean,
  refreshing: boolean,
  updateEvents: () => Promise<void>
} & OwnProps;

const mapStateToProps = state => ({
  events: state.events.events,
  loading: state.events.loading,
  refreshing: state.events.refreshing
});

const mapDispatchToProps = {
  updateEvents
};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
