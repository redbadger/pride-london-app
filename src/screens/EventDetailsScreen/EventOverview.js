// @flow
import React from "react";
import { StyleSheet } from "react-native";
import formatDate from "date-fns/format";
import isSameDay from "date-fns/is_same_day";
import dateComparator from "date-fns/compare_asc";
import { formattedEventPriceRange, formatTime } from "../../data/formatters";
import IconItem from "./IconItem";
import IconList from "./IconList";
import Text from "../../components/Text";
import TextLink from "../../components/TextLink";
import text from "../../constants/text";
import strings from "../../constants/strings";
import type { Event } from "../../data/event";
import locale from "../../data/locale";
import dateIcon from "../../../assets/images/date.png";
import genderNeutralIcon from "../../../assets/images/genderNeutral.png";
import accessibilityIcon from "../../../assets/images/accessibility.png";
import ticketsIcon from "../../../assets/images/tickets.png";
import locationIcon from "../../../assets/images/location.png";
import showLocation from "./openMapLink";

type Props = {
  event: Event
};

const removeTimezoneFromDateString = isoString => isoString.slice(0, -6);

const reformatEuropeanDateString = dateString => {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
};

const EventOverview = ({ event }: Props) => {
  const startTime = removeTimezoneFromDateString(
    event.fields.startTime[locale]
  );
  const endTime = removeTimezoneFromDateString(event.fields.endTime[locale]);
  const dateFormat = "ddd, DD MMM YYYY";
  const dateDisplay = isSameDay(startTime, endTime)
    ? formatDate(startTime, dateFormat)
    : `${formatDate(startTime, dateFormat)} - ${formatDate(
        endTime,
        dateFormat
      )}`;
  const timeDisplay = `${formatTime(startTime)} - ${formatTime(endTime)}`;

  const eventLocation = [
    event.fields.location[locale].lat,
    event.fields.location[locale].lon,
    event.fields.locationName[locale]
  ];

  const recurrenceDates = event.fields.recurrenceDates
    ? event.fields.recurrenceDates[locale]
    : [];
  const orderedRecurrenceDates = [
    event.fields.startTime[locale],
    ...recurrenceDates.map(reformatEuropeanDateString)
  ].sort(dateComparator);
  const formattedRecurrenceDates = `${text.runsFrom} ${formatDate(
    orderedRecurrenceDates[0],
    "D MMM"
  )} - ${formatDate(
    orderedRecurrenceDates[orderedRecurrenceDates.length - 1],
    "D MMM"
  )}`;

  return (
    <IconList>
      <IconItem source={dateIcon}>
        <Text type="h4" color="lightNavyBlueColor">
          {dateDisplay}
        </Text>
        <Text type="small">{timeDisplay}</Text>
        {orderedRecurrenceDates.length > 1 && (
          <Text type="small" style={styles.recurrenceDates}>
            {formattedRecurrenceDates}
          </Text>
        )}
      </IconItem>

      <IconItem
        onPress={() => showLocation(...eventLocation)}
        source={locationIcon}
      >
        <TextLink>{event.fields.locationName[locale]}</TextLink>
        {event.fields.addressLine1 && (
          <Text type="small">{event.fields.addressLine1[locale]}</Text>
        )}
        {event.fields.addressLine2 && (
          <Text type="small">{event.fields.addressLine2[locale]}</Text>
        )}
        {event.fields.city && (
          <Text type="small">{event.fields.city[locale]}</Text>
        )}
        {event.fields.postcode && (
          <Text type="small">{event.fields.postcode[locale]}</Text>
        )}
      </IconItem>

      <IconItem source={ticketsIcon}>
        <Text type="h4" color="lightNavyBlueColor">
          {formattedEventPriceRange(
            event.fields.isFree[locale],
            event.fields.eventPriceLow[locale],
            event.fields.eventPriceHigh[locale]
          )}
        </Text>
      </IconItem>

      {event.fields.venueDetails &&
        event.fields.venueDetails[locale].includes(
          strings.venueDetailsGenderNeutralToilets
        ) && (
          <IconItem source={genderNeutralIcon}>
            <Text type="h4" color="lightNavyBlueColor">
              {text.eventDetailsGenderNeutralToilets}
            </Text>
          </IconItem>
        )}

      {event.fields.accessibilityOptions &&
        event.fields.accessibilityOptions[locale].length > 0 && (
          <IconItem source={accessibilityIcon}>
            <Text type="h4" color="lightNavyBlueColor">
              {text.eventDetailsAccessibility}
            </Text>
            <Text type="small">
              {event.fields.accessibilityOptions[locale].join(", ")}
            </Text>
          </IconItem>
        )}
    </IconList>
  );
};

const styles = StyleSheet.create({
  recurrenceDates: {
    fontStyle: "italic"
  }
});

export default EventOverview;
