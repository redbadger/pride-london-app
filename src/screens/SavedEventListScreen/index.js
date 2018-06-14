// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import { createSelector } from "reselect";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { State } from "../../reducers";
import type { EventDays, SavedEvents } from "../../data/event";
import { updateData } from "../../actions/data";
import { addSavedEvent, removeSavedEvent } from "../../actions/saved-events";
import {
  selectData,
  selectSavedEvents,
  getFutureEventsMap
} from "../../selectors";
import { selectLoading, selectRefreshing } from "../../selectors/data";
import { groupEventsByStartTime } from "../../selectors/event";
import { resolveSavedEvents } from "../../selectors/saved-events";
import Component from "./component";

type OwnProps = {
  navigation: NavigationScreenProp<NavigationState>
};

type StateProps = {
  navigation: NavigationScreenProp<NavigationState>,
  events: EventDays,
  savedEvents: SavedEvents,
  loading: boolean,
  refreshing: boolean
};

type DispatchProps = {
  updateData: () => Promise<void>,
  addSavedEvent: string => void,
  removeSavedEvent: string => void
};

type Props = StateProps & DispatchProps;

const getDataLoading = createSelector([selectData], selectLoading);

const getDataRefreshing = createSelector([selectData], selectRefreshing);

const getEvents = createSelector(
  [selectSavedEvents, getFutureEventsMap],
  resolveSavedEvents
);

const getGroupEventsByStartTime = createSelector(
  [getEvents],
  groupEventsByStartTime
);

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (
  state: State,
  { navigation }: OwnProps
): StateProps => ({
  navigation,
  events: getGroupEventsByStartTime(state),
  savedEvents: selectSavedEvents(state),
  loading: getDataLoading(state),
  refreshing: getDataRefreshing(state)
});

const mapDispatchToProps = {
  updateData,
  addSavedEvent,
  removeSavedEvent
};

const connector: Connector<StateProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
