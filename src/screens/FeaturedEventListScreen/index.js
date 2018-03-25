// @flow
import { connect } from "react-redux";
import type { Connector, MapStateToProps } from "react-redux";
import type { NavigationScreenProp } from "react-navigation";
import type { EventDays, Asset } from "../../data/event";
import type { State } from "../../reducers";
import {
  groupEventsByStartTime,
  selectFeaturedEventsByTitle,
  selectAssetById
} from "../../selectors/events";
import Component from "./component";

type OwnProps = {
  navigation: NavigationScreenProp<{ params: { title: string } }>
};

type Props = {
  events: EventDays,
  getAssetById: string => Asset
} & OwnProps;

const mapStateToProps: MapStateToProps<State, OwnProps, *> = (
  state,
  ownProps
) => ({
  events: groupEventsByStartTime(
    selectFeaturedEventsByTitle(state, ownProps.navigation.state.params.title)
  ),
  getAssetById: id => selectAssetById(state, id)
});

// $FlowFixMe
const connector: Connector<OwnProps, Props> = connect(mapStateToProps);

export default connector(Component);
