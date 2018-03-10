// @flow
import { connect } from "react-redux";
import type { Connector, MapStateToProps } from "react-redux";
import type { NavigationScreenProp } from "react-navigation";
import type { Event } from "../../data/event";
import type { State } from "../../reducers";
import { selectEventById } from "../../selectors/events";
import Component from "./component";

type OwnProps = {
  navigation: NavigationScreenProp<{ params: { eventId: String } }>
};

type Props = {
  event: Event
} & OwnProps;

const mapStateToProps: MapStateToProps<State, OwnProps, *> = (
  state,
  ownProps
) => ({
  event: selectEventById(state, ownProps.navigation.state.params.eventId)
});

// $FlowFixMe
const connector: Connector<OwnProps, Props> = connect(mapStateToProps);

export default connector(Component);
