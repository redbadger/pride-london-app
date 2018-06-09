// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp } from "react-navigation";
import type { State } from "../../reducers";
import { setEventFilters } from "../../actions/event-filters";
import { selectStagedFilteredEvents } from "../../selectors";
import { selectTagFilterSelectedCount } from "../../selectors/event-filters";
import Component from "./component";
import text from "../../constants/text";
import type { FilterCollection } from "../../data/event-filters";
import type { EventFiltersPayload } from "../../actions/event-filters";

type OwnProps = {
  navigation: NavigationScreenProp<{ params: { title: string } }>
};

type StateProps = {
  navigation: NavigationScreenProp<{ params: { title: string } }>,
  applyButtonText: string,
  eventFilters: FilterCollection,
  numEventsSelected: number,
  numTagFiltersSelected: number
};

type DispatchProps = {
  onChange: (eventFilters: EventFiltersPayload) => void
};

type Props = StateProps & DispatchProps;

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
    applyButtonText: text.filterPickerApply(events.length),
    numEventsSelected: events.length,
    numTagFiltersSelected: selectTagFilterSelectedCount(state, true),
    eventFilters: state.eventFilters.selectedFilters
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
export default connector(Component);
