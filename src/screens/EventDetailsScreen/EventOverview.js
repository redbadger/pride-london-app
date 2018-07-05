// @flow
import React from "react";
import {
  toLondonFormat as formatDate,
  FORMAT_SHORT_WEEKDAY_DATE
} from "../../lib/date";
import { formatLongEventPrice, formatTime } from "../../data/formatters";
import IconItem from "./IconItem";
import IconList from "./IconList";
import Text from "../../components/Text";
import TextLink from "../../components/TextLink";
import text from "../../constants/text";
import strings from "../../constants/strings";
import type { Event } from "../../data/event";
import dateIcon from "../../../assets/images/date.png";
import genderNeutralIcon from "../../../assets/images/genderNeutral.png";
import accessibilityIcon from "../../../assets/images/accessibility.png";
import ticketsIcon from "../../../assets/images/tickets.png";
import locationIcon from "../../../assets/images/location.png";
import showLocation from "./openMapLink";
import RecurrenceDates from "./RecurrenceDates";

type Props = {
  event: Event
};

const EventOverview = ({ event }: Props) => {
  const { endTime, startTime } = event.fields;
  const dateFormat = FORMAT_SHORT_WEEKDAY_DATE;
  const timeDisplay = `${formatTime(startTime)} – ${formatTime(endTime)}`;

  const eventLocation = [
    event.fields.location.lat,
    event.fields.location.lon,
    event.fields.locationName
  ];

  return (
    <IconList>
      <IconItem source={dateIcon}>
        <Text type="h4" color="lightNavyBlueColor">
          {formatDate(startTime, dateFormat)}
        </Text>
        <Text type="small">{timeDisplay}</Text>
        {event.fields.recurrenceDates.length > 0 && (
          <RecurrenceDates
            recurrenceDates={event.fields.recurrenceDates}
            startTime={event.fields.startTime}
          />
        )}
      </IconItem>

      <IconItem
        onPress={() => showLocation(...eventLocation)}
        source={locationIcon}
      >
        <TextLink>{event.fields.locationName}</TextLink>
        {event.fields.addressLine1 && (
          <Text type="small">{event.fields.addressLine1}</Text>
        )}
        {event.fields.addressLine2 && (
          <Text type="small">{event.fields.addressLine2}</Text>
        )}
        {event.fields.city && <Text type="small">{event.fields.city}</Text>}
        {event.fields.postcode && (
          <Text type="small">{event.fields.postcode}</Text>
        )}
      </IconItem>

      <IconItem source={ticketsIcon}>
        <Text type="h4" color="lightNavyBlueColor">
          {formatLongEventPrice(
            event.fields.eventPriceLow,
            event.fields.eventPriceHigh
          )}
        </Text>
      </IconItem>

      {event.fields.venueDetails.includes(
        strings.venueDetailsGenderNeutralToilets
      ) && (
        <IconItem source={genderNeutralIcon}>
          <Text type="h4" color="lightNavyBlueColor">
            {text.eventDetailsGenderNeutralToilets}
          </Text>
        </IconItem>
      )}

      {event.fields.accessibilityOptions.length > 0 && (
        <IconItem source={accessibilityIcon}>
          <Text type="h4" color="lightNavyBlueColor">
            {text.eventDetailsAccessibility}
          </Text>
          <Text type="small">
            {event.fields.accessibilityOptions.join(", ")}
          </Text>
        </IconItem>
      )}
    </IconList>
  );
};

export default EventOverview;
