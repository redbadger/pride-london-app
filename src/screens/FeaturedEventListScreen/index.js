// @flow
import { connect } from "react-redux";
import type { Connector, MapStateToProps } from "react-redux";
import type { NavigationScreenProp } from "react-navigation";
import getAssetSource from "../../data/get-asset-source";
import { addSavedEvent, removeSavedEvent } from "../../actions/saved-events";
import type { State } from "../../reducers";
import {
  groupEventsByStartTime,
  selectFeaturedEventsByTitle,
  selectAssetById
} from "../../selectors/events";
import type { Props as ComponentProps } from "./component";
import Component from "./component";

type OwnProps = {
  navigation: NavigationScreenProp<{ params: { title: string } }>
};

type Props = ComponentProps & OwnProps;

const mapStateToProps: MapStateToProps<State, OwnProps, *> = (
  state,
  ownProps
) => ({
  events: groupEventsByStartTime(
    selectFeaturedEventsByTitle(state, ownProps.navigation.state.params.title)
  ),
  savedEvents: state.savedEvents,
  getAssetSource: getAssetSource(id => selectAssetById(state, id))
});

const mapDispatchToProps = {
  addSavedEvent,
  removeSavedEvent
};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
