// @flow
import React from "react";
import { Image, View, StyleSheet } from "react-native";
import formatDate from "date-fns/format";
import isSameDay from "date-fns/is_same_day";
import IconItem from "./IconItem";
import CategoryLabel from "./CategoryLabel";
import Text from "../../components/Text";
import ContentPadding from "../../components/ContentPadding";
import { whiteColor } from "../../constants/colors";
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
  // const dateFormat = "DD MMMM YYYY";
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
      <View style={styles.iconItemWrapper}>
        <IconItem
          // icon={<Text type="small">icn</Text>}
          icon={<Image source={dateIcon} />}
          title={dateDisplay}
          content={<Text type="small">{timeDisplay}</Text>}
        />
      </View>
      <View style={styles.iconItemWrapper}>
        <IconItem
          icon={<Text type="small">icn</Text>}
          title={event.fields.locationName[locale]}
        />
      </View>
      <View style={styles.iconItemWrapper}>
        <IconItem
          icon={<Text type="small">icn</Text>}
          title={`${text.eventDetailsPrice}${
            event.fields.eventPriceLow[locale]
          }`}
        />
      </View>
      {event.fields.venueDetails &&
        event.fields.venueDetails[locale].includes(
          strings.venueDetailsGenderNeutralToilets
        ) && (
          <View style={styles.iconItemWrapper}>
            <IconItem
              icon={<Text type="small">icn</Text>}
              title={text.eventDetailsGenderNeutralToilets}
            />
          </View>
        )}
      {event.fields.accessibilityOptions &&
        event.fields.accessibilityOptions[locale].length > 0 && (
          <View style={styles.iconItemWrapper}>
            <IconItem
              icon={<Text type="small">icn</Text>}
              title={text.eventDetailsAccessibility}
              content={
                <Text type="small">
                  {event.fields.accessibilityOptions[locale].join(", ")}
                </Text>
              }
            />
          </View>
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
  iconItemWrapper: {
    marginBottom: 20
  }
});

export default EventOverview;
