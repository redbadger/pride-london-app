// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { createSelector } from "reselect";
import type { State } from "../../reducers";
import type {
  EventCategoryName,
  EventDays,
  SavedEvents
} from "../../data/event";
import { updateData } from "../../actions/data";
import { addSavedEvent, removeSavedEvent } from "../../actions/saved-events";
import { groupEventsByStartTime } from "../../selectors/event";
import {
  selectData,
  selectFilteredEvents,
  selectSavedEvents
} from "../../selectors";
import { selectLoading, selectRefreshing } from "../../selectors/data";
import Component from "./component";
import withIsFocused from "../../components/WithIsFocused";

type OwnProps = {
  navigation: NavigationScreenProp<NavigationState>,
  isFocused: boolean
};

type StateProps = {
  navigation: NavigationScreenProp<NavigationState>,
  events: EventDays,
  savedEvents: SavedEvents,
  loading: boolean,
  refreshing: boolean,
  selectedCategories: Set<EventCategoryName>
};

type DispatchProps = {
  addSavedEvent: string => void,
  removeSavedEvent: string => void,
  updateData: () => Promise<void>
};

type Props = StateProps & DispatchProps;

const getDataLoading = createSelector([selectData], selectLoading);

const getDataRefreshing = createSelector([selectData], selectRefreshing);

const getGroupEventsByStartTime = createSelector(
  [selectFilteredEvents],
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
      events: getGroupEventsByStartTime(state),
      savedEvents: selectSavedEvents(state),
      loading: getDataLoading(state),
      refreshing: getDataRefreshing(state),
      selectedCategories: state.eventFilters.selectedFilters.categories
    };
  }
  return cache;
};

const mapDispatchToProps = {
  updateData,
  addSavedEvent,
  removeSavedEvent
};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export const Container = connector(Component);

export default withIsFocused(Container);
