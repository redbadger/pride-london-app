// @flow
import { connect } from "react-redux";
import type { Connector, MapStateToProps } from "react-redux";
import type { NavigationScreenProp } from "react-navigation";
import type { Event } from "../../integrations/cms";
import { selectEventById } from "../../selectors/events";
import Component from "./component";

type OwnProps = {
  navigation: NavigationScreenProp<{ params: { eventId: String } }>
};

type Props = {
  event: Event
} & OwnProps;

const mapStateToProps: MapStateToProps<*, OwnProps, *> = (state, ownProps) => ({
  event: selectEventById(state, ownProps.navigation.state.params.eventId)
});

const connector: Connector<OwnProps, Props> = connect(mapStateToProps);

export default connector(Component);
