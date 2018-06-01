// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import getAssetSource from "../../data/get-asset-source";
import { updateData } from "../../actions/data";
import { addSavedEvent, removeSavedEvent } from "../../actions/saved-events";
import {
  groupEventsByStartTime,
  selectEventsLoading,
  selectEventsRefreshing,
  selectSavedEvents,
  selectAssetById
} from "../../selectors/events";
import type { Props as ComponentProps } from "./component";
import Component from "./component";

type OwnProps = {
  navigation: NavigationScreenProp<NavigationState>
};

type Props = ComponentProps & OwnProps;

const mapStateToProps = state => ({
  events: groupEventsByStartTime(selectSavedEvents(state)),
  savedEvents: state.savedEvents,
  loading: selectEventsLoading(state),
  refreshing: selectEventsRefreshing(state),
  getAssetSource: getAssetSource(id => selectAssetById(state, id))
});

const mapDispatchToProps = {
  updateData,
  addSavedEvent,
  removeSavedEvent
};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
