// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import { updateEventFilters } from "../actions/event-filters";
import type { DateOrDateRange } from "../data/date-time";
import { selectFilteredEvents } from "../selectors/events";
import { selectDateFilter } from "../selectors/event-filters";
import Component from "./DateRangePickerDialog";
import text from "../constants/text";

type OwnProps = {
  onApply: () => void,
  onCancel: () => void,
  visible: boolean
};

type Props = {
  applyButtonText: string,
  dateRange: ?DateOrDateRange,
  onChange: (?DateOrDateRange) => void
} & OwnProps;

const mapStateToProps = state => ({
  applyButtonText: text.filterPickerApply(selectFilteredEvents(state).length),
  dateRange: selectDateFilter(state)
});

const mapDispatchToProps = {
  onChange: date => updateEventFilters({ date })
};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
