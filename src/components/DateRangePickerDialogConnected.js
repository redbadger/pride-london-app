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

type StateProps = {
  applyButtonText: string,
  applyButtonLabel: string,
  applyButtonDisabled?: boolean,
  dateRange: ?DateRange,
  forceNewRange: boolean
};

type DispatchProps = {
  onApply: () => void,
  onCancel: () => void,
  onChange: (?DateRange) => void,
}

type Props = StateProps & DispatchProps;

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (state): StateProps => ({
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

const mapDispatchToProps = (dispatch, ownProps: OwnProps): DispatchProps => ({
  onApply: () => {
    ownProps.onApply();
    dispatch(commitEventFilters());
  },
  onCancel: () => {
    ownProps.onCancel();
    dispatch(clearStagedEventFilters());
  },
  onChange: date => dispatch(stageEventFilters({ date }))
});

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
