// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { DateRange, Time } from "../data/date-time";
import { selectDateFilter, selectTimeFilter } from "../selectors/event-filters";
import Component from "./FilterHeader";

type OwnProps = {};

type Props = {
  dateFilter: ?DateRange,
  timeFilter: Set<Time>,
  selectedCategories: Set<string>
} & OwnProps;

const mapStateToProps = state => ({
  dateFilter: selectDateFilter(state),
  timeFilter: selectTimeFilter(state)
});

const mapDispatchToProps = {};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
