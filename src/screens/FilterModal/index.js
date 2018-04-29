// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp } from "react-navigation";
import {
  stageEventFilters,
  commitEventFilters,
  clearStagedEventFilters
} from "../../actions/event-filters";
import { selectFilteredEvents } from "../../selectors/events";
import { selectTagFilterSelectedCount } from "../../selectors/event-filters";
import Component from "./component";
import text from "../../constants/text";
import type { FilterCollection } from "../../data/event-filters";
import type { TagFilter } from "./component";

type OwnProps = {
  navigation: NavigationScreenProp<{ params: { title: string } }>
};

type Props = {
  applyButtonText: string,
  eventFilters: FilterCollection,
  numEventsSelected: number,
  numTagFiltersSelected: number,
  onChange: (tagFilter: TagFilter) => void,
  onApply: () => void,
  onCancel: () => void
} & OwnProps;

const mapStateToProps = state => {
  const events = selectFilteredEvents(state, true);
  return {
    applyButtonText: text.filterPickerApply(events.length),
    numEventsSelected: events.length,
    numTagFiltersSelected: selectTagFilterSelectedCount(state, true),
    eventFilters: state.eventFilters.stagedFilters
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: tagFilter => dispatch(stageEventFilters(tagFilter)),
  onApply: () => dispatch(commitEventFilters()),
  onCancel: () => dispatch(clearStagedEventFilters())
});

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

// $FlowFixMe
export default connector(Component);
