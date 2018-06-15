// @flow
import { connect } from "react-redux";
import { createSelector } from "reselect";
import type { Connector } from "react-redux";
import type { NavigationScreenProp } from "react-navigation";
import type { State } from "../../reducers";
import { setEventFilters } from "../../actions/event-filters";
import {
  getSelectedFilters,
  getStagedFilters,
  selectStagedFilteredEvents
} from "../../selectors";
import { selectTagFilterSelectedCount } from "../../selectors/event-filters";
import Component from "./component";
import type { FilterCollection } from "../../data/event-filters";
import type { EventFiltersPayload } from "../../actions/event-filters";
import onlyUpdateWhenFocused from "../../components/OnlyUpdateWhenFocused";

type OwnProps = {
  navigation: NavigationScreenProp<{ params: { title: string } }>
};

type StateProps = {
  navigation: NavigationScreenProp<{ params: { title: string } }>,
  eventFilters: FilterCollection,
  numberOfEvents: number,
  numTagFiltersSelected: number
};

type DispatchProps = {
  onChange: (eventFilters: EventFiltersPayload) => void
};

type Props = StateProps & DispatchProps;

const getNumTagFiltersSelected = createSelector(
  [getStagedFilters],
  selectTagFilterSelectedCount
);

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (
  state: State,
  { navigation }: OwnProps
): StateProps => {
  const events = selectStagedFilteredEvents(state);
  return {
    navigation,
    numberOfEvents: events.length,
    numTagFiltersSelected: getNumTagFiltersSelected(state),
    eventFilters: getSelectedFilters(state)
  };
};

const mapDispatchToProps = (dispatch): DispatchProps => ({
  onChange: eventFilters => dispatch(setEventFilters(eventFilters))
});

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

// $FlowFixMe
export default connector(onlyUpdateWhenFocused(Component));
