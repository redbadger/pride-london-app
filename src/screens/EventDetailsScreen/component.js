// @flow
import React, { PureComponent } from "react";
import { Image, Linking, View, StyleSheet, ScrollView } from "react-native";
import type { NavigationScreenProp } from "react-navigation";
import Header from "./Header";
import IconButton from "./IconButton";
import IconItem from "./IconItem";
import EventMap from "./EventMap";
import EventOverview from "./EventOverview";
import Text from "../../components/Text";
import ButtonPrimary from "../../components/ButtonPrimary";
import ContentPadding from "../../components/ContentPadding";
import {
  shadowColor,
  lightishGreyColor,
  whiteColor,
  lightNavyBlueColor
} from "../../constants/colors";
import text from "../../constants/text";
import type { Event, LocalizedFieldRef } from "../../data/event";
import locale from "../../data/locale";
import chevronLeftWhite from "../../../assets/images/chevron-left-white.png";
import heartWhite from "../../../assets/images/heart-white.png";

type Props = {
  navigation: NavigationScreenProp<{ params: { eventId: string } }>,
  event: Event,
  getAssetUrl: LocalizedFieldRef => string
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
                <IconItem icon={<Text type="small">icn</Text>}>
                  <Text type="h4" style={styles.detailTitle}>
                    {event.fields.email[locale]}
                  </Text>
                </IconItem>
              </View>
            )}
            {event.fields.phone && (
              <View style={styles.contactItem}>
                <IconItem icon={<Text type="small">icn</Text>}>
                  <Text type="h4" style={styles.detailTitle}>
                    {event.fields.phone[locale]}
                  </Text>
                </IconItem>
              </View>
            )}
          </View>
        )}
      </View>
    </ContentPadding>
  );

const renderBuyTickets = event =>
  event.fields.ticketingUrl && (
    <View style={styles.buyButton}>
      <ContentPadding>
        <ButtonPrimary
          onPress={() => Linking.openURL(event.fields.ticketingUrl[locale])}
        >
          {text.eventDetailsBuyButton}
        </ButtonPrimary>
      </ContentPadding>
    </View>
  );

class EventDetailsScreen extends PureComponent<Props> {
  static defaultProps = {};

  render() {
    const { event, getAssetUrl } = this.props;
    return (
      <View style={styles.container}>
        <Header>
          <ContentPadding style={styles.headerContent}>
            <IconButton
              accessibilityLabel="Back"
              onPress={() => {
                this.props.navigation.goBack(null);
              }}
              source={chevronLeftWhite}
            />
            <IconButton
              accessibilityLabel="Favourite"
              onPress={() => {}}
              source={heartWhite}
            />
          </ContentPadding>
        </Header>
        <ScrollView>
          <Image
            style={{ aspectRatio: 5 / 3 }}
            source={{ uri: getAssetUrl(event.fields.individualEventPicture) }}
          />
          <EventOverview event={event} />
          {renderEventDescription(event)}
          {renderEventDetails(event)}
        </ScrollView>
        {renderBuyTickets(event)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  content: {
    paddingVertical: 15
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
    backgroundColor: whiteColor,
    paddingVertical: 12,
    shadowColor,
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 1,
    shadowRadius: 15
  },
  detailTitle: {
    color: lightNavyBlueColor
  }
});

export default EventDetailsScreen;
