// @flow
import React from "react";
import { StyleSheet } from "react-native";
import {
  toLondonFormat as formatDate,
  compareAsc as compareDateAsc,
  FORMAT_DAY_MONTH
} from "../../lib/date";
import Text from "../../components/Text";
import { formatContentfulDate } from "../../data/formatters";
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
    startTime,
    ...recurrenceDates.map(formatRecurrenceDates)
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
