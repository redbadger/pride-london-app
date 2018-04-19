// @flow
import React, { PureComponent } from "react";
import { Image, Linking, View, StyleSheet, ScrollView } from "react-native";
import type { NavigationScreenProp } from "react-navigation";
import ContactDetails from "./ContactDetails";
import EventOverview from "./EventOverview";
import EventDescription from "./EventDescription";
import Text from "../../components/Text";
import ButtonPrimary from "../../components/ButtonPrimary";
import ContentPadding from "../../components/ContentPadding";
import Header from "../../components/Header";
import IconButton from "../../components/IconButton";
import Shadow from "../../components/Shadow";
import {
  lightishGreyColor,
  whiteColor,
  darkBlueGreyTwoColor
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

export const AccessibilityDetails = ({ event }: { event: Event }) =>
  event.fields.accessibilityDetails && (
    <View>
      <Text type="h2" color="blue" style={styles.title}>
        {text.eventDetailsAccessibilityDetails}
      </Text>
      <View style={styles.accessibilityDetailsItem}>
        <Text>{event.fields.accessibilityDetails[locale]}</Text>
      </View>
    </View>
  );

export const BuyTickets = ({ event }: { event: Event }) =>
  event.fields.ticketingUrl && (
    <Shadow>
      <ContentPadding style={styles.buyButton}>
        <ButtonPrimary
          onPress={() => Linking.openURL(event.fields.ticketingUrl[locale])}
        >
          {text.eventDetailsBuyButton}
        </ButtonPrimary>
      </ContentPadding>
    </Shadow>
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
          <ContentPadding>
            <EventOverview event={event} />
            <View style={styles.sectionDivider} />
            <EventDescription event={event} />
            <View style={styles.sectionDivider} />
            <AccessibilityDetails event={event} />
            <View style={styles.sectionDivider} />
            {(event.fields.email || event.fields.phone) && (
              <ContactDetails
                email={event.fields.email[locale]}
                phone={event.fields.phone[locale]}
              />
            )}
          </ContentPadding>
        </ScrollView>
        <BuyTickets event={event} />
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
    justifyContent: "space-between",
    backgroundColor: darkBlueGreyTwoColor
  },
  sectionDivider: {
    backgroundColor: lightishGreyColor,
    height: 1,
    marginVertical: 16
  },
  title: {
    marginTop: 8,
    marginBottom: 4
  },
  accessibilityDetailsItem: {
    marginTop: 8
  },
  buyButton: {
    backgroundColor: whiteColor,
    paddingVertical: 12
  }
});

export default EventDetailsScreen;
