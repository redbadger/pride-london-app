// @flow
import React, { PureComponent } from "react";
import { Image, View, StyleSheet, ScrollView } from "react-native";
import type { NavigationScreenProp } from "react-navigation";
import IconButton from "./IconButton";
import IconItem from "./IconItem";
import EventMap from "./EventMap";
import EventOverview from "./EventOverview";
import Text from "../../components/Text";
import Button from "../../components/Button";
import ContentPadding from "../../components/ContentPadding";
import Header from "../../components/Header";
import {
  darkBlueGreyTwoColor,
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
  static defaultProps = {};

  static navigationOptions = {
    header: null,
    tabBarVisible: false
  };

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
  },
  detailTitle: {
    color: lightNavyBlueColor
  }
});

export default EventDetailsScreen;
