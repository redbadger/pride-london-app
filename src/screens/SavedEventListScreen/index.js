// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { State } from "../../reducers";
import type { EventDays, SavedEvents } from "../../data/event-deprecated";
import { updateData } from "../../actions/data";
import { addSavedEvent, removeSavedEvent } from "../../actions/saved-events";
import {
  groupEventsByStartTime,
  selectEventsLoading,
  selectEventsRefreshing,
  selectSavedEvents
} from "../../selectors/events";
import Component from "./component";

type StateProps = {
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

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (state: State): StateProps => ({
  events: groupEventsByStartTime(selectSavedEvents(state)),
  savedEvents: state.savedEvents,
  loading: selectEventsLoading(state),
  refreshing: selectEventsRefreshing(state)
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
