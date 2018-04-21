// @flow
import { connect } from "react-redux";
import type { Connector, MapStateToProps } from "react-redux";
import type { NavigationScreenProp } from "react-navigation";
import type { EventDays } from "../../data/event";
import type { LocalizedFieldRef } from "../../data/localized-field-ref";
import getAssetUrl from "../../data/get-asset-url";
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
  getAssetUrl: LocalizedFieldRef => string
} & OwnProps;

const mapStateToProps: MapStateToProps<State, OwnProps, *> = (
  state,
  ownProps
) => ({
  events: groupEventsByStartTime(
    selectFeaturedEventsByTitle(state, ownProps.navigation.state.params.title)
  ),
  getAssetUrl: getAssetUrl(id => selectAssetById(state, id))
});

// $FlowFixMe
const connector: Connector<OwnProps, Props> = connect(mapStateToProps);

export default connector(Component);
