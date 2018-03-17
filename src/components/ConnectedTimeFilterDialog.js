// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import { updateEventFilters } from "../actions/event-filters";
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
  applyButtonText: text.filterPickerApply(selectFilteredEvents(state).length),
  options: OPTIONS.map(option => text.time[option]),
  selectedIndexes: selectTimeFilter(state).map(time => OPTIONS.indexOf(time)),
  title: text.filterTimePickerTitle
});

const mapDispatchToProps = {
  onChange: selectedIndexes =>
    updateEventFilters({
      time: selectedIndexes.map(index => OPTIONS[index])
    })
};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
