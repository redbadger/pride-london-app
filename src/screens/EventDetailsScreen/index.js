// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp } from "react-navigation";
import type { State } from "../../reducers";
import type { Event, EventCategoryName } from "../../data/event";
import { selectEventById } from "../../selectors/events";
import { addSavedEvent, removeSavedEvent } from "../../actions/saved-events";
import Component from "./component";
import { setEventFilters } from "../../actions/event-filters";

type OwnProps = {
  navigation: NavigationScreenProp<{ params: { eventId: string } }>
};

type StateProps = {
  navigation: NavigationScreenProp<{ params: { eventId: string } }>,
  event: ?Event, // `maybe` because selectEventById may not find the event
  isSaved: boolean
};

type DispatchProps = {
  toggleSaved: boolean => void,
  setCategoryFilter: EventCategoryName => void
};

type Props = StateProps & DispatchProps;

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (
  state: State,
  { navigation }: OwnProps
): StateProps => {
  const id = navigation.state.params.eventId;
  return {
    navigation,
    event: selectEventById(state, id),
    isSaved: state.savedEvents.has(id)
  };
};

const mapDispatchToProps = (dispatch, ownProps): DispatchProps => ({
  toggleSaved: active => {
    const id = ownProps.navigation.state.params.eventId;
    if (active) {
      return dispatch(addSavedEvent(id));
    }
    return dispatch(removeSavedEvent(id));
  },
  setCategoryFilter: category =>
    dispatch(setEventFilters({ categories: new Set([category]) }))
});

// $FlowFixMe
const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
