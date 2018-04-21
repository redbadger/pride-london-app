// @flow
import { connect } from "react-redux";
import type { Connector, MapStateToProps } from "react-redux";
import type { NavigationScreenProp } from "react-navigation";
import type { Event } from "../../data/event";
import type { LocalizedFieldRef } from "../../data/localized-field-ref";
import getAssetUrl from "../../data/get-asset-url";
import type { State } from "../../reducers";
import { selectEventById, selectAssetById } from "../../selectors/events";
import Component from "./component";

type OwnProps = {
  navigation: NavigationScreenProp<{ params: { eventId: string } }>
};

type Props = {
  event: Event,
  getAssetUrl: LocalizedFieldRef => string
} & OwnProps;

const mapStateToProps: MapStateToProps<State, OwnProps, *> = (
  state,
  ownProps
) => ({
  event: selectEventById(state, ownProps.navigation.state.params.eventId),
  getAssetUrl: getAssetUrl(id => selectAssetById(state, id))
});

// $FlowFixMe
const connector: Connector<OwnProps, Props> = connect(mapStateToProps);

export default connector(Component);
