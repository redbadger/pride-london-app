// @flow
import type { Connector } from "react-redux";
import { connect } from "react-redux";
import type { NavigationScreenProp } from "react-navigation";
import { createSelector } from "reselect";
import type { State } from "../../reducers";
import type { SavedEvents, EventDays } from "../../data/event";
import { addSavedEvent, removeSavedEvent } from "../../actions/saved-events";
import { getFeaturedEventsResolvedEvents } from "../../selectors";
import { groupEventsByStartTime } from "../../selectors/event";
import Component from "./component";
import withIsFocused from "../../components/WithIsFocused";

type OwnProps = {
  navigation: NavigationScreenProp<{ params: { title: string } }>,
  isFocused: boolean
};

type StateProps = {
  navigation: NavigationScreenProp<{ params: { title: string } }>,
  events: EventDays,
  savedEvents: SavedEvents
};

type DispatchProps = {
  addSavedEvent: string => void,
  removeSavedEvent: string => void
};

type Props = StateProps & DispatchProps;

const getGroupEventsByStartTime = createSelector(
  [getFeaturedEventsResolvedEvents],
  groupEventsByStartTime
);

let cache: StateProps;

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (
  state: State,
  { navigation, isFocused }: OwnProps
): StateProps => {
  if (!cache || isFocused) {
    cache = {
      navigation,
      events: getGroupEventsByStartTime(state, navigation.state.params.title),
      savedEvents: state.savedEvents
    };
  }
  return cache;
};

const mapDispatchToProps = {
  addSavedEvent,
  removeSavedEvent
};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export const Container = connector(Component);

export default withIsFocused(Container);
