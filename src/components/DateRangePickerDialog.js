// @flow
import React from "react";
import { TouchableOpacity } from "react-native";
import DateRangePicker from "./DateRangePicker";
import Dialog from "./Dialog";
import Text from "./Text";
import text from "../constants/text";
import type { DateOrDateRange } from "../data/date-time";
import { formatDateRange } from "../data/formatters";

type Props = {
  applyButtonText: string,
  dateRange: ?DateOrDateRange,
  onApply: () => void,
  onCancel: () => void,
  onChange: (?DateOrDateRange) => void,
  visible: boolean
};

class DateRangePickerDialog extends React.PureComponent<Props> {
  clear = () => {
    this.props.onChange(null);
  };

  render() {
    const { dateRange } = this.props;
    const title = dateRange
      ? formatDateRange(dateRange, { dateSuffix: " -" })
      : text.filterDayPickerTitle;

    return (
      <Dialog
        applyButtonText={this.props.applyButtonText}
        headerRight={
          <TouchableOpacity
            accessibilityTraits={["button"]}
            accessibilityComponentType="button"
            onPress={this.clear}
          >
            <Text>Clear</Text>
          </TouchableOpacity>
        }
        onApply={this.props.onApply}
        onCancel={this.props.onCancel}
        title={title}
        visible={this.props.visible}
      >
        <DateRangePicker onChange={this.props.onChange} dateRange={dateRange} />
      </Dialog>
    );
  }
}

export default DateRangePickerDialog;
