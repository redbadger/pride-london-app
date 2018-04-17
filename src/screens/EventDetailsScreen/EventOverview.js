// @flow
import React from "react";
import { Image, View, StyleSheet } from "react-native";
import formatDate from "date-fns/format";
import isSameDay from "date-fns/is_same_day";
import IconItem from "./IconItem";
import CategoryPill from "../../components/CategoryPill";
import Text from "../../components/Text";
import ContentPadding from "../../components/ContentPadding";
import {
  whiteColor,
  lightNavyBlueColor,
  darkGreyColor
} from "../../constants/colors";
import text from "../../constants/text";
import strings from "../../constants/strings";
import type { Event } from "../../data/event";
import locale from "../../data/locale";
import dateIcon from "../../../assets/images/date.png";
import genderNeutralIcon from "../../../assets/images/genderNeutral.png";
import accessibilityIcon from "../../../assets/images/accessibility.png";
import ticketsIcon from "../../../assets/images/tickets.png";

type Props = {
  event: Event
};

const removeTimezoneFromDateString = isoString => isoString.slice(0, -6);
export const displayPrice = (
  isFree: boolean,
  eventPriceLow: number,
  eventPriceHigh?: number
) => {
  if (isFree) return text.isFreePrice;
  if (eventPriceHigh && eventPriceHigh > eventPriceLow)
    return `£${eventPriceLow} - £${eventPriceHigh}`;
  return `£${eventPriceLow}`;
};

const EventOverview = ({ event }: Props) => {
  const startTime = removeTimezoneFromDateString(
    event.fields.startTime[locale]
  );
  const endTime = removeTimezoneFromDateString(event.fields.endTime[locale]);
  const dateFormat = "ddd, DD MMM YYYY";
  const timeFormat = "h:mmA";
  const dateDisplay = isSameDay(startTime, endTime)
    ? formatDate(startTime, dateFormat)
    : `${formatDate(startTime, dateFormat)} - ${formatDate(
        endTime,
        dateFormat
      )}`;
  const timeDisplay = `${formatDate(startTime, timeFormat)} - ${formatDate(
    endTime,
    timeFormat
  )}`;

  return (
    <ContentPadding style={styles.content}>
      <Text type="h1">{event.fields.name[locale]}</Text>
      <View style={styles.categoryPillContainer}>
        {event.fields.eventCategories[locale].map(categoryName => (
          <CategoryPill
            key={categoryName}
            name={categoryName}
            style={styles.categoryPill}
          />
        ))}
      </View>
      <IconItem
        icon={<Image style={styles.icon} source={dateIcon} />}
        style={styles.iconItem}
      >
        <Text type="h4" style={styles.detailTitle}>
          {dateDisplay}
        </Text>
        <Text type="small" style={styles.text}>
          {timeDisplay}
        </Text>
      </IconItem>
      <IconItem icon={<Text type="small">icn</Text>} style={styles.iconItem}>
        <Text type="h4" style={styles.detailTitle}>
          {event.fields.locationName[locale]}
        </Text>
      </IconItem>
      <IconItem icon={<Image source={ticketsIcon} />} style={styles.iconItem}>
        <Text type="h4" style={styles.detailTitle}>
          {displayPrice(
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
          <IconItem
            icon={<Image source={genderNeutralIcon} />}
            style={styles.iconItem}
          >
            <Text type="h4" style={styles.detailTitle}>
              {text.eventDetailsGenderNeutralToilets}
            </Text>
          </IconItem>
        )}
      {event.fields.accessibilityOptions &&
        event.fields.accessibilityOptions[locale].length > 0 && (
          <IconItem
            icon={<Image style={styles.icon} source={accessibilityIcon} />}
            style={styles.iconItem}
          >
            <Text type="h4" style={styles.detailTitle}>
              {text.eventDetailsAccessibility}
            </Text>
            <Text type="small" style={styles.text}>
              {event.fields.accessibilityOptions[locale].join(", ")}
            </Text>
          </IconItem>
        )}
    </ContentPadding>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingVertical: 15,
    backgroundColor: whiteColor
  },
  categoryPillContainer: {
    marginTop: 16,
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  categoryPill: {
    marginBottom: 8,
    marginRight: 8
  },
  iconItem: {
    marginBottom: 20
  },
  icon: {
    marginTop: 2
  },
  detailTitle: {
    color: lightNavyBlueColor
  },
  text: {
    color: darkGreyColor
  }
});

export default EventOverview;
