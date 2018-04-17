// @flow
import React from "react";
import { Image, View, StyleSheet } from "react-native";
import formatDate from "date-fns/format";
import isSameDay from "date-fns/is_same_day";
import IconItem from "./IconItem";
import CategoryLabel from "./CategoryLabel";
import Text from "../../components/Text";
import ContentPadding from "../../components/ContentPadding";
import { whiteColor, lightNavyBlueColor } from "../../constants/colors";
import text from "../../constants/text";
import strings from "../../constants/strings";
import type { Event } from "../../data/event";
import locale from "../../data/locale";
import dateIcon from "../../../assets/images/date.png";

type Props = {
  event: Event
};

const removeTimezoneFromDateString = isoString => isoString.slice(0, -6);

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
      <View style={styles.categoryLabelContainer}>
        {event.fields.eventCategories[locale].map(categoryName => (
          <CategoryLabel key={categoryName} categoryName={categoryName} />
        ))}
      </View>
      <IconItem icon={<Image source={dateIcon} />} style={styles.iconItem}>
        <Text type="h4" style={styles.detailTitle}>
          {dateDisplay}
        </Text>
        <Text type="small">{timeDisplay}</Text>
      </IconItem>
      <IconItem icon={<Text type="small">icn</Text>} style={styles.iconItem}>
        <Text type="h4" style={styles.detailTitle}>
          {event.fields.locationName[locale]}
        </Text>
      </IconItem>
      <IconItem icon={<Text type="small">icn</Text>} style={styles.iconItem}>
        <Text type="h4" style={styles.detailTitle}>
          {`${text.eventDetailsPrice}${event.fields.eventPriceLow[locale]}`}
        </Text>
      </IconItem>
      {event.fields.venueDetails &&
        event.fields.venueDetails[locale].includes(
          strings.venueDetailsGenderNeutralToilets
        ) && (
          <IconItem
            icon={<Text type="small">icn</Text>}
            style={styles.iconItem}
          >
            <Text type="h4" styles={styles.detailTitle}>
              {text.eventDetailsGenderNeutralToilets}
            </Text>
          </IconItem>
        )}
      {event.fields.accessibilityOptions &&
        event.fields.accessibilityOptions[locale].length > 0 && (
          <IconItem
            icon={<Text type="small">icn</Text>}
            style={styles.iconItem}
          >
            <Text type="h4" styles={styles.detailTitle}>
              {text.eventDetailsAccessibility}
            </Text>
            <Text type="small">
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
  categoryLabelContainer: {
    marginTop: 16,
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  iconItem: {
    marginBottom: 20
  },
  detailTitle: {
    color: lightNavyBlueColor
  }
});

export default EventOverview;
