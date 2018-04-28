// @flow
import React, { PureComponent } from "react";
import { Image, Linking, View, StyleSheet } from "react-native";
import type { NavigationScreenProp } from "react-navigation";
import EventContact from "./EventContact";
import EventOverview from "./EventOverview";
import EventDescription from "./EventDescription";
import EventMap from "./EventMap";
import SaveEventButton from "../../components/SaveEventButton";
import CategoryPill from "../../components/CategoryPill";
import Text from "../../components/Text";
import ButtonPrimary from "../../components/ButtonPrimary";
import ContentPadding from "../../components/ContentPadding";
import Header from "../../components/Header";
import IconButton from "../../components/IconButton";
import LayoutColumn from "../../components/LayoutColumn";
import ShadowedScrollView from "../../components/ShadowedScrollView";
import SectionDivider from "./SectionDivider";
import { whiteColor, darkBlueGreyTwoColor } from "../../constants/colors";
import text from "../../constants/text";
import type { Event, EventCategoryName } from "../../data/event";
import type { LocalizedFieldRef } from "../../data/localized-field-ref";
import locale from "../../data/locale";
import chevronLeftWhite from "../../../assets/images/chevron-left-white.png";

type EventHeaderProps = {|
  isSaved: boolean,
  toggleSaved: boolean => void,
  navigation: NavigationScreenProp<{ params: { eventId: string } }>
|};

export const EventHeader = ({
  isSaved,
  navigation,
  toggleSaved
}: EventHeaderProps) => (
  <Header backgroundColor={darkBlueGreyTwoColor}>
    <ContentPadding style={styles.headerContent}>
      <IconButton
        accessibilityLabel="Back"
        onPress={() => {
          navigation.goBack(null);
        }}
        source={chevronLeftWhite}
      />
      <SaveEventButton active={isSaved} onPress={toggleSaved} />
    </ContentPadding>
  </Header>
);

export const EventCategories = ({ event }: { event: Event }) => (
  <View style={styles.categories}>
    {event.fields.eventCategories[locale].map(categoryName => (
      <CategoryPill
        key={categoryName}
        name={((categoryName: any): EventCategoryName)}
        style={styles.categoryPill}
      />
    ))}
  </View>
);

export const EventAccessibility = ({ event }: { event: Event }) => (
  <LayoutColumn spacing={4}>
    <Text type="h2" color="lightNavyBlueColor">
      {text.eventDetailsAccessibilityDetails}
    </Text>
    <Text>{event.fields.accessibilityDetails[locale]}</Text>
  </LayoutColumn>
);

export const EventTickets = ({ event }: { event: Event }) => (
  <ContentPadding style={styles.ticketButton}>
    <ButtonPrimary
      onPress={() => Linking.openURL(event.fields.ticketingUrl[locale])}
    >
      {text.eventDetailsBuyButton}
    </ButtonPrimary>
  </ContentPadding>
);

type Props = {
  event: Event,
  getAssetUrl: LocalizedFieldRef => string,
  isSaved: boolean,
  navigation: NavigationScreenProp<{ params: { eventId: string } }>,
  toggleSaved: boolean => void
};

class EventDetailsScreen extends PureComponent<Props> {
  static defaultProps = {
    isSaved: false
  };

  static navigationOptions = {
    tabBarVisible: false
  };

  render() {
    const { event, getAssetUrl } = this.props;
    return (
      <View style={styles.container}>
        <EventHeader
          isSaved={this.props.isSaved}
          toggleSaved={this.props.toggleSaved}
          navigation={this.props.navigation}
        />
        <ShadowedScrollView topShadow={false}>
          <Image
            style={{ aspectRatio: 5 / 3 }}
            source={{ uri: getAssetUrl(event.fields.individualEventPicture) }}
          />
          <ContentPadding style={styles.content}>
            <Text type="h1" style={styles.h1}>
              {event.fields.name[locale]}
            </Text>
            <LayoutColumn spacing={20}>
              <EventCategories event={event} />
              <EventOverview event={event} />
              <SectionDivider />
              <EventDescription event={event} />
              <EventMap
                lat={event.fields.location[locale].lat}
                lon={event.fields.location[locale].lon}
                locationName={event.fields.locationName[locale]}
              />
              {event.fields.accessibilityDetails && <SectionDivider />}
              {event.fields.accessibilityDetails && (
                <EventAccessibility event={event} />
              )}
              {(event.fields.email || event.fields.phone) && <SectionDivider />}
              {(event.fields.email || event.fields.phone) && (
                <EventContact
                  email={event.fields.email && event.fields.email[locale]}
                  phone={event.fields.phone && event.fields.phone[locale]}
                />
              )}
            </LayoutColumn>
          </ContentPadding>
        </ShadowedScrollView>
        {event.fields.ticketingUrl && <EventTickets event={event} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor
  },
  content: {
    marginTop: 16,
    marginBottom: 32
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  h1: {
    marginBottom: 8
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: -8
  },
  categoryPill: {
    marginBottom: 8,
    marginRight: 8
  },
  ticketButton: {
    backgroundColor: whiteColor,
    paddingVertical: 12
  }
});

export default EventDetailsScreen;
