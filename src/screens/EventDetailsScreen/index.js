// @flow
import { connect } from "react-redux";
import type { Connector, MapStateToProps } from "react-redux";
import type { NavigationScreenProp } from "react-navigation";
import type { CmsEvent } from "../../integrations/cms";
import type { State } from "../../reducers";
import { selectEventById, selectAssetById } from "../../selectors/events";
import Component from "./component";

type OwnProps = {
  navigation: NavigationScreenProp<{ params: { eventId: String } }>
};

type Props = {
  event: CmsEvent
} & OwnProps;

const mapStateToProps: MapStateToProps<State, OwnProps, *> = (
  state,
  ownProps
) => ({
  event: selectEventById(state, ownProps.navigation.state.params.eventId),
  getAssetById: id => selectAssetById(state, id)
});

// $FlowFixMe
const connector: Connector<OwnProps, Props> = connect(mapStateToProps);

export default connector(Component);
