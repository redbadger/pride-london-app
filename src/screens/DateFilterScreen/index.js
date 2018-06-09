// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import {
  stageEventFilters,
  commitEventFilters,
  clearStagedEventFilters
} from "../../actions/event-filters";
import type { DateRange } from "../../data/date-time";
import { selectStagedFilteredEvents } from "../../selectors";
import {
  selectDateFilter,
  selectIsStagingFilters
} from "../../selectors/event-filters";
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
  dateRange: ?DateRange,
  forceNewRange: boolean
};

type DispatchProps = {
  onApply: () => void,
  onCancel: () => void,
  onReset: () => void,
  onChange: (?DateRange) => void
};

type Props = StateProps & DispatchProps;

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (
  state: StateProps,
  { navigation }: OwnProps
): StateProps => ({
  navigation,
  applyButtonText: text.filterPickerApply(
    selectStagedFilteredEvents(state).length
  ),
  applyButtonLabel: text.filterPickerApplyLabel(
    selectStagedFilteredEvents(state).length
  ),
  applyButtonDisabled: selectStagedFilteredEvents(state).length <= 0,
  dateRange: selectDateFilter(state, true),
  forceNewRange: !selectIsStagingFilters(state)
});

const mapDispatchToProps = (
  dispatch,
  { navigation }: OwnProps
): DispatchProps => ({
  onApply: () => {
    dispatch(commitEventFilters());
    navigation.goBack();
  },
  onCancel: () => {
    dispatch(clearStagedEventFilters());
    navigation.goBack();
  },
  onReset: () => {
    dispatch(stageEventFilters({ date: null }));
    dispatch(commitEventFilters());
  },
  onChange: date => dispatch(stageEventFilters({ date }))
});

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
