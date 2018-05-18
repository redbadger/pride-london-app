// @flow
import React from "react";
import { StyleSheet } from "react-native";
import {
  toFormat as formatDate,
  compareAsc as compareDateAsc,
  FORMAT_DAY_MONTH
} from "../../lib/date";
import Text from "../../components/Text";
import { removeTimezoneFromCmsDateString } from "../../data/formatters";
import text from "../../constants/text";

const reformatEuropeanDateString = dateString => {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
};

type Props = {
  recurrenceDates: string[],
  startTime: string
};

const RecurrenceDates = ({ recurrenceDates, startTime }: Props) => {
  const orderedRecurrenceDates = [
    removeTimezoneFromCmsDateString(startTime),
    ...recurrenceDates.map(reformatEuropeanDateString)
  ].sort(compareDateAsc);

  const formattedRecurrenceDates = `${text.runsFrom} ${formatDate(
    orderedRecurrenceDates[0],
    FORMAT_DAY_MONTH
  )} - ${formatDate(
    orderedRecurrenceDates[orderedRecurrenceDates.length - 1],
    FORMAT_DAY_MONTH
  )}`;

  return orderedRecurrenceDates.length > 1 ? (
    <Text type="small" style={styles.recurrenceDates}>
      {formattedRecurrenceDates}
    </Text>
  ) : null;
};

const styles = StyleSheet.create({
  recurrenceDates: {
    fontStyle: "italic"
  }
});

export default RecurrenceDates;
