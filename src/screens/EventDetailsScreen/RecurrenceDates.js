// @flow
import React from "react";
import { StyleSheet } from "react-native";
import dateComparator from "date-fns/compare_asc";
import formatDate from "date-fns/format";
import Text from "../../components/Text";
import {
  removeTimezoneFromCmsDateString,
  formatContentfulDate
} from "../../data/formatters";
import text from "../../constants/text";

const formatRecurrenceDates = dateString => {
  const [day, month, year] = dateString.split("/");
  return formatContentfulDate(year, month, day);
};

type Props = {
  recurrenceDates: string[],
  startTime: string
};

const RecurrenceDates = ({ recurrenceDates, startTime }: Props) => {
  const orderedRecurrenceDates = [
    removeTimezoneFromCmsDateString(startTime),
    ...recurrenceDates.map(formatRecurrenceDates)
  ].sort(dateComparator);

  const formattedRecurrenceDates = `${text.runsFrom} ${formatDate(
    orderedRecurrenceDates[0],
    "D MMM"
  )} - ${formatDate(
    orderedRecurrenceDates[orderedRecurrenceDates.length - 1],
    "D MMM"
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
