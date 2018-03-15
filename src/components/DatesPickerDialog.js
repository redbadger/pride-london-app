// @flow
import React from "react";
import { TouchableOpacity } from "react-native";
import DatesPicker from "./DatesPicker";
import Dialog from "./Dialog";
import Text from "./Text";
import type { DateOrDateRange } from "../data/date-range";
import { formatDateRange } from "../data/formatters";

type Props = {
  onDatesSelected: (?DateOrDateRange) => void,
  onCancel: () => void,
  visible: boolean
};

type State = {
  dateRange: ?DateOrDateRange
};

class DatesPickerDialog extends React.PureComponent<Props, State> {
  state = {
    dateRange: null
  };

  onDatesChange = (dateRange: DateOrDateRange) => {
    this.setState({ dateRange });
  };

  clear = () => {
    this.setState({ dateRange: null });
  };

  apply = () => {
    this.props.onDatesSelected(this.state.dateRange);
  };

  render() {
    const { dateRange } = this.state;
    const title = dateRange
      ? formatDateRange(dateRange, { dateSuffix: " -" })
      : "Select dates";

    return (
      <Dialog
        applyButtonText="Show XX events"
        headerRight={
          <TouchableOpacity onPress={this.clear}>
            <Text>Clear</Text>
          </TouchableOpacity>
        }
        onApply={this.apply}
        onCancel={this.props.onCancel}
        title={title}
        visible={this.props.visible}
      >
        <DatesPicker onChange={this.onDatesChange} dateRange={dateRange} />
      </Dialog>
    );
  }
}

export default DatesPickerDialog;
