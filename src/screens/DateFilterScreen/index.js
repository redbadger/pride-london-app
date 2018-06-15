// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import { createSelector } from "reselect";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { setEventFilters } from "../../actions/event-filters";
import type { DateRange } from "../../data/date-time";
import type { State } from "../../reducers";
import { getStagedFilters, selectStagedFilteredEvents } from "../../selectors";
import { selectDateFilter } from "../../selectors/event-filters";
import Component from "./component";
import onlyUpdateWhenFocused from "../../components/OnlyUpdateWhenFocused";

type OwnProps = {
  navigation: NavigationScreenProp<NavigationState>
};

type StateProps = {
  navigation: NavigationScreenProp<NavigationState>,
  dateRange: ?DateRange,
  numberOfEvents: number
};

type DispatchProps = {
  onChange: (?DateRange) => void
};

type Props = StateProps & DispatchProps;

const getDateFilter = createSelector([getStagedFilters], selectDateFilter);

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (
  state: State,
  { navigation }: OwnProps
): StateProps => ({
  navigation,
  numberOfEvents: selectStagedFilteredEvents(state).length,
  dateRange: getDateFilter(state)
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
  onChange: date => dispatch(setEventFilters({ date }))
});

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(onlyUpdateWhenFocused(Component));
