// @flow
import React, { PureComponent } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import type { NavigationScreenProp } from "react-navigation";
import formatDate from "date-fns/format";
import isSameDay from "date-fns/is_same_day";
import Header from "./Header";
import IconButton from "./IconButton";
import IconItem from "./IconItem";
import CategoryLabel from "./CategoryLabel";
import EventMap from "./EventMap";
import Text from "../../components/Text";
import Button from "../../components/Button";
import ContentPadding from "../../components/ContentPadding";
import ImageWithAspect from "../../components/ImageWithAspect";
import {
  darkBlueGreyTwoColor,
  lightishGreyColor,
  whiteColor
} from "../../constants/colors";
import text from "../../constants/text";
import strings from "../../constants/strings";
import type { Event, LocalizedFieldRef } from "../../data/event";
import locale from "../../data/locale";
import chevronLeftWhite from "../../../assets/images/chevron-left-white.png";
import heartWhite from "../../../assets/images/heart-white.png";

type Props = {
  navigation: NavigationScreenProp<{ params: { eventId: string } }>,
  event: Event,
  getAssetUrl: LocalizedFieldRef => string
};

const removeTimezoneFromDateString = isoString => isoString.slice(0, -6);

const renderEventOverview = event => {
  const startTime = removeTimezoneFromDateString(
    event.fields.startTime[locale]
  );
  const endTime = removeTimezoneFromDateString(event.fields.endTime[locale]);
  const dateFormat = "DD MMMM YYYY";
  const timeFormat = "HH:mm";
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
          icon={<Text type="small">icn</Text>}
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

const renderEventDescription = event => (
  <ContentPadding style={styles.content}>
    <View style={styles.sectionDivider} />
    <Text markdown>{event.fields.eventDescription[locale]}</Text>
    <View style={styles.mapWrapper}>
      <EventMap
        lat={event.fields.location[locale].lat}
        lon={event.fields.location[locale].lon}
        locationName={event.fields.locationName[locale]}
      />
    </View>
  </ContentPadding>
);

const renderEventDetails = event =>
  (event.fields.accessibilityDetails ||
    event.fields.email ||
    event.fields.phone ||
    event.fields.ticketingUrl) && (
    <ContentPadding>
      <View style={styles.sectionDivider} />
      <View style={styles.content}>
        {event.fields.accessibilityDetails && (
          <View style={styles.detailsSection}>
            <Text type="h2">{text.eventDetailsAccessibilityDetails}</Text>
            <View style={styles.accessibilityDetailsItem}>
              <Text>{event.fields.accessibilityDetails[locale]}</Text>
            </View>
          </View>
        )}
        {(event.fields.email || event.fields.phone) && (
          <View style={styles.detailsSection}>
            <Text type="h2">{text.eventDetailsContact}</Text>
            {event.fields.email && (
              <View style={styles.contactItem}>
                <IconItem
                  icon={<Text type="small">icn</Text>}
                  title={event.fields.email[locale]}
                  titleType="text"
                />
              </View>
            )}
            {event.fields.phone && (
              <View style={styles.contactItem}>
                <IconItem
                  icon={<Text type="small">icn</Text>}
                  title={event.fields.phone[locale]}
                  titleType="text"
                />
              </View>
            )}
          </View>
        )}
        {event.fields.ticketingUrl && (
          <View style={styles.buyButton}>
            <Button
              text={text.eventDetailsBuyButton}
              url={event.fields.ticketingUrl[locale]}
            />
          </View>
        )}
      </View>
    </ContentPadding>
  );

class EventDetailsScreen extends PureComponent<Props> {
  static navigationOptions = {
    header: null
  };
  static defaultProps = {};

  render() {
    const { event, getAssetUrl } = this.props;
    return (
      <View style={styles.container}>
        <Header>
          <ContentPadding style={styles.headerContent}>
            <IconButton
              onPress={() => {
                this.props.navigation.goBack(null);
              }}
              source={chevronLeftWhite}
            />
            <IconButton onPress={() => {}} source={heartWhite} />
          </ContentPadding>
        </Header>
        <ScrollView>
          <ImageWithAspect
            ratio={5 / 3}
            source={{ uri: getAssetUrl(event.fields.individualEventPicture) }}
          />
          {renderEventOverview(event)}
          {renderEventDescription(event)}
          {renderEventDetails(event)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkBlueGreyTwoColor
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
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
  },
  sectionDivider: {
    backgroundColor: lightishGreyColor,
    height: 1,
    marginVertical: 16
  },
  mapWrapper: {
    marginTop: 8
  },
  detailsSection: {
    marginBottom: 20
  },
  accessibilityDetailsItem: {
    marginTop: 8
  },
  contactItem: {
    marginTop: 16
  },
  buyButton: {
    marginTop: 16
  }
});

export default EventDetailsScreen;
