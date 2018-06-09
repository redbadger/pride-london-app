// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { setEventFilters } from "../../actions/event-filters";
import type { DateRange } from "../../data/date-time";
import type { State } from "../../reducers";
import { selectStagedFilteredEvents } from "../../selectors";
import { selectDateFilter } from "../../selectors/event-filters";
import text from "../../constants/text";
import Component from "./component";

type OwnProps = {
  navigation: NavigationScreenProp<NavigationState>
};

type StateProps = {
  navigation: NavigationScreenProp<NavigationState>,
  applyButtonText: string,
  applyButtonLabel: string,
  applyButtonDisabled?: boolean,
  dateRange: ?DateRange
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
): StateProps => {
  const events = selectStagedFilteredEvents(state);
  return {
    navigation,
    applyButtonText: text.filterPickerApply(events.length),
    applyButtonLabel: text.filterPickerApplyLabel(events.length),
    applyButtonDisabled: events.length <= 0,
    dateRange: selectDateFilter(state, true)
  };
};

const mapDispatchToProps = (dispatch): DispatchProps => ({
  onChange: date => dispatch(setEventFilters({ date }))
});

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
