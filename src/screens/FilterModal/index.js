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
  onChange: (tagFilter: TagFilter) => void,
  onApply: () => void,
  onCancel: () => void
} & OwnProps;

const mapStateToProps = state => ({
  applyButtonText: text.filterPickerApply(
    selectFilteredEvents(state, true).length
  ),
  eventFilters: state.eventFilters.stagedFilters
});

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
