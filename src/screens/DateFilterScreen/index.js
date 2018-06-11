// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { setEventFilters } from "../../actions/event-filters";
import type { DateRange } from "../../data/date-time";
import type { State } from "../../reducers";
import { selectStagedFilteredEvents } from "../../selectors";
import { selectDateFilter } from "../../selectors/event-filters";
import Component from "./component";

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

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (
  state: State,
  { navigation }: OwnProps
): StateProps => ({
  navigation,
  numberOfEvents: selectStagedFilteredEvents(state).length,
  dateRange: selectDateFilter(state, true)
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
  onChange: date => dispatch(setEventFilters({ date }))
});

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
