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
import onlyUpdateWhenFocused from "../../components/OnlyUpdateWhenFocused";

type OwnProps = {
  navigation: NavigationScreenProp<{ params: { title: string } }>
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

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (
  state: State,
  { navigation }: OwnProps
): StateProps => ({
  navigation,
  events: getGroupEventsByStartTime(state, navigation.state.params.title),
  savedEvents: state.savedEvents
});

const mapDispatchToProps = {
  addSavedEvent,
  removeSavedEvent
};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(onlyUpdateWhenFocused(Component));
