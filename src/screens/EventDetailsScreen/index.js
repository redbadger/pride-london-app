// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp } from "react-navigation";
import { createSelector } from "reselect";
import type { State } from "../../reducers";
import type { Event, EventCategoryName } from "../../data/event";
import type { Performance, Performances } from "../../data/performance";
import type { FieldRef } from "../../data/field-ref";
import { selectData } from "../../selectors";
import {
  selectEvents,
  selectEventsMap,
  selectEventById,
  selectPerformancesMap,
  selectPerformanceById
} from "../../selectors/data";
import { addSavedEvent, removeSavedEvent } from "../../actions/saved-events";
import Component from "./component";
import { setEventFilters } from "../../actions/event-filters";
import onlyUpdateWhenFocused from "../../components/OnlyUpdateWhenFocused";

type OwnProps = {
  navigation: NavigationScreenProp<{ params: { eventId: string } }>
};

type StateProps = {
  navigation: NavigationScreenProp<{ params: { eventId: string } }>,
  event: ?Event, // `maybe` because selectEventById may not find the event
  performances: Performance[],
  isSaved: boolean
};

type DispatchProps = {
  toggleSaved: boolean => void,
  setCategoryFilter: EventCategoryName => void
};

type Props = StateProps & DispatchProps;

const getEventId = (state, props) => props.navigation.state.params.eventId;

const getEvents = createSelector([selectData], selectEvents);

const getEventsMap = createSelector([getEvents], selectEventsMap);

const getEventById = createSelector(
  [getEventsMap, getEventId],
  selectEventById
);

const getPerformancesMap = createSelector([selectData], selectPerformancesMap);

const reducePerformancesHelp = (performances: Performances) => (
  acc: Performance[],
  reference: FieldRef
) => {
  const performance = selectPerformanceById(performances, reference.sys.id);
  if (performance) {
    acc.push(performance);
  }
  return acc;
};

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (state: State, props: OwnProps): StateProps => {
  const id = props.navigation.state.params.eventId;
  const event = getEventById(state, props);
  const performancesById = getPerformancesMap(state);
  const performances = event
    ? event.fields.performances.reduce(
        reducePerformancesHelp(performancesById),
        []
      )
    : [];
  return {
    navigation: props.navigation,
    event,
    isSaved: state.savedEvents.has(id),
    performances
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

export default connector(onlyUpdateWhenFocused(Component));
