// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { Event } from "../../integrations/cms";
import { selectEvents, selectEventsLoading } from "../../selectors/events";
import Component from "./component";

type OwnProps = {
  navigation: NavigationScreenProp<NavigationState>
};

type Props = {
  events: Event[],
  loading: boolean
} & OwnProps;

const mapStateToProps = state => ({
  events: selectEvents(state),
  loading: selectEventsLoading(state)
});

const mapDispatchToProps = {};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
