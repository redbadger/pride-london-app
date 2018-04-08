// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp } from "react-navigation";
import {
  stageEventFilters,
  commitEventFilters,
  clearStagedEventFilters
} from "../../actions/event-filters";
import { selectFilteredEvents } from "../../selectors/events";
import Component from "./component";
import text from "../../constants/text";

type OwnProps = {
  navigation: NavigationScreenProp<{ params: { title: string } }>
};

type Props = {
  applyButtonText: string,
  onChange: () => void,
  onApply: () => void,
  onCancel: () => void
} & OwnProps;

const mapStateToProps = state => ({
  applyButtonText: text.filterPickerApply(
    selectFilteredEvents(state, true).length
  )
});

const mapDispatchToProps = dispatch => ({
  onChange: () => dispatch(stageEventFilters({})),
  onApply: () => dispatch(commitEventFilters()),
  onCancel: () => dispatch(clearStagedEventFilters())
});

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

// $FlowFixMe
export default connector(Component);
