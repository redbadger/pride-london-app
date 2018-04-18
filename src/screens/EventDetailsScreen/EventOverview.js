// @flow
import React from "react";
import { Image, View, StyleSheet } from "react-native";
import formatDate from "date-fns/format";
import isSameDay from "date-fns/is_same_day";
import IconItem from "./IconItem";
import Touchable from "../../components/Touchable";
import CategoryPill from "../../components/CategoryPill";
import Text from "../../components/Text";
import {
  blackColor,
  eucalyptusGreenColor
} from "../../constants/colors";
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

  const eventLocation = [
    event.fields.location[locale].lat,
    event.fields.location[locale].lon,
    event.fields.locationName[locale]
  ];

  return (
    <View style={styles.content}>
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
        <Text type="h4" blue>
          {dateDisplay}
        </Text>
        <Text type="small" style={styles.text}>
          {timeDisplay}
        </Text>
      </IconItem>

      <IconItem
        icon={<Image source={locationIcon} style={styles.icon} />}
        style={styles.iconItem}
      >
        <Touchable onPress={() => showLocation(...eventLocation)}>
          <View style={styles.detailTitleLink}>
            <Text type="h4" blue>
              {event.fields.locationName[locale]}
            </Text>
          </View>
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
        </Touchable>
      </IconItem>
      <IconItem icon={<Image source={ticketsIcon} />} style={styles.iconItem}>
        <Text type="h4" blue>
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
            <Text type="h4" blue>
              {text.eventDetailsGenderNeutralToilets}
            </Text>
          </IconItem>
        )}
      {event.fields.accessibilityOptions &&
        event.fields.accessibilityOptions[locale].length > 0 && (
          <IconItem
            icon={<Image style={styles.icon} source={accessibilityIcon} />}
          >
            <Text type="h4" blue>
              {text.eventDetailsAccessibility}
            </Text>
            <Text type="small" style={styles.text}>
              {event.fields.accessibilityOptions[locale].join(", ")}
            </Text>
          </IconItem>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: 15,
    paddingBottom: 10
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
  text: {
    color: blackColor
  },
  detailTitleLink: {
    borderBottomColor: eucalyptusGreenColor,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    alignSelf: "flex-start",
    marginBottom: 2
  }
});

export default EventOverview;
