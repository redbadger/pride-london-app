// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import {
  stageEventFilters,
  commitEventFilters,
  clearStagedEventFilters
} from "../actions/event-filters";
import { selectFilteredEvents } from "../selectors/events";
import { selectTimeFilter } from "../selectors/event-filters";
import Component from "./MultiSelectDialog";
import text from "../constants/text";

const OPTIONS = ["morning", "afternoon", "evening"];

type OwnProps = {
  onApply: () => void,
  onCancel: () => void,
  visible: boolean
};

type Props = {
  applyButtonText: string,
  onChange: (number[]) => void,
  options: string[],
  selectedIndexes: number[],
  title: string
} & OwnProps;

const mapStateToProps = state => ({
  applyButtonText: text.filterPickerApply(
    selectFilteredEvents(state, true).length
  ),
  options: OPTIONS.map(option => text.time[option]),
  selectedIndexes: Array.from(selectTimeFilter(state, true)).map(time =>
    OPTIONS.indexOf(time)
  ),
  title: text.filterTimePickerTitle
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: selectedIndexes =>
    dispatch(
      stageEventFilters({
        time: new Set(selectedIndexes.map(index => OPTIONS[index]))
      })
    ),
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
