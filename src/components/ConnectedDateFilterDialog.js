// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import {
  stageEventFilters,
  commitEventFilters,
  clearStagedEventFilters
} from "../actions/event-filters";
import type { DateRange } from "../data/date-time";
import { selectFilteredEvents } from "../selectors/events";
import {
  selectDateFilter,
  selectIsStagingFilters
} from "../selectors/event-filters";
import Component from "./DateRangePickerDialog";
import text from "../constants/text";

type OwnProps = {
  onApply: () => void,
  onCancel: () => void,
  visible: boolean
};

type Props = {
  applyButtonText: string,
  applyButtonLabel: string,
  applyButtonDisabled: boolean,
  dateRange: ?DateRange,
  onChange: (?DateRange) => void,
  forceNewRange: boolean
} & OwnProps;

const mapStateToProps = state => ({
  applyButtonText: text.filterPickerApply(
    selectFilteredEvents(state, true).length
  ),
  applyButtonLabel: text.filterPickerApplyLabel(
    selectFilteredEvents(state, true).length
  ),
  applyButtonDisabled: selectFilteredEvents(state, true).length <= 0,
  dateRange: selectDateFilter(state, true),
  forceNewRange: !selectIsStagingFilters(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: date => dispatch(stageEventFilters({ date })),
  onApply: () => {
    ownProps.onApply();
    dispatch(commitEventFilters());
  },
  onCancel: () => {
    ownProps.onCancel();
    dispatch(clearStagedEventFilters());
  }
});

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
