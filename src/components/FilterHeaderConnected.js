// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { State } from "../reducers";
import type { DateRange } from "../data/date-time";
import type { EventCategoryName } from "../data/event";
import {
  selectDateFilter,
  selectTagFilterSelectedCount
} from "../selectors/event-filters";
import Component from "./FilterHeader";

type OwnProps = {
  onFilterCategoriesPress: Function,
  onFilterButtonPress: () => void,
  selectedCategories: Set<EventCategoryName>
};

type StateProps = {
  dateFilter: ?DateRange,
  numTagFiltersSelected: number
};

type Props = OwnProps & StateProps;

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (state: State): StateProps => ({
  dateFilter: selectDateFilter(state),
  numTagFiltersSelected: selectTagFilterSelectedCount(state)
});

const mapDispatchToProps = {};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
