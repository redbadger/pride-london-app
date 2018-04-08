// @flow
import React from "react";
import DateRangePicker from "./DateRangePicker";
import Dialog from "./Dialog";
import Text from "./Text";
import Touchable from "./Touchable";
import text from "../constants/text";
import type { DateRange } from "../data/date-time";
import { formatDateRange } from "../data/formatters";

type Props = {
  applyButtonText: string,
  dateRange: ?DateRange,
  onApply: () => void,
  onCancel: () => void,
  onChange: (?DateRange) => void,
  visible: boolean,
  forceNewRange: boolean
};

const formatTitle = (dateRange: ?DateRange): string => {
  if (!dateRange) return text.filterDayPickerTitle;

  return (
    formatDateRange(dateRange) +
    (dateRange.startDate === dateRange.endDate ? " -" : "")
  );
};

class DateRangePickerDialog extends React.PureComponent<Props> {
  clear = () => {
    this.props.onChange(null);
  };

  render() {
    const { dateRange, forceNewRange } = this.props;
    const title = formatTitle(dateRange);

    return (
      <Dialog
        applyButtonText={this.props.applyButtonText}
        headerRight={
          <Touchable onPress={this.clear}>
            <Text>Clear</Text>
          </Touchable>
        }
        onApply={this.props.onApply}
        onCancel={this.props.onCancel}
        title={title}
        visible={this.props.visible}
      >
        <DateRangePicker
          onChange={this.props.onChange}
          dateRange={dateRange}
          forceNewRange={forceNewRange}
        />
      </Dialog>
    );
  }
}

export default DateRangePickerDialog;
