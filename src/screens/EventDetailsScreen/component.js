// @flow
import React, { PureComponent } from "react";
import { Linking, StyleSheet, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import type { NavigationScreenProp } from "react-navigation";
import type { Event, EventCategoryName } from "../../data/event";
import EventContact from "./EventContact";
import EventOverview from "./EventOverview";
import EventDescription from "./EventDescription";
import EventMap from "./EventMap";
import SaveEventButton from "../../components/SaveEventButton";
import CategoryPill from "../../components/CategoryPill";
import ConnectedImage from "../../components/Image";
import Text from "../../components/Text";
import ButtonPrimary from "../../components/ButtonPrimary";
import ContentPadding from "../../components/ContentPadding";
import Header from "../../components/Header";
import LayoutColumn from "../../components/LayoutColumn";
import ShadowedScrollView from "../../components/ShadowedScrollView";
import SectionDivider from "../../components/SectionDivider";
import PerformanceList from "../../components/PerformanceList";
import { groupPerformancesByPeriod } from "../../selectors/events";
import { whiteColor } from "../../constants/colors";
import text from "../../constants/text";
import locale from "../../data/locale";
import { EVENT_LIST } from "../../constants/routes";

type EventHeaderProps = {
  isSaved: boolean,
  toggleSaved: boolean => void,
  navigation: NavigationScreenProp<{ params: { eventId: string } }>
};

export const EventHeader = ({
  isSaved,
  navigation,
  toggleSaved
}: EventHeaderProps) => (
  <Header
    leftElement={
      <Header.BackButton
        onPress={() => {
          navigation.goBack(null);
        }}
      />
    }
    rightElement={
      <SaveEventButton active={isSaved} onDark onPress={toggleSaved} />
    }
  />
);

export const EventCategories = ({
  event,
  navigation,
  setCategoryFilter
}: {
  event: Event,
  navigation: NavigationScreenProp,
  setCategoryFilter: EventCategoryName => void
}) => (
  <View style={styles.categories}>
    {event.fields.eventCategories[locale].map(categoryName => (
      <CategoryPill
        key={categoryName}
        name={((categoryName: any): EventCategoryName)}
        style={styles.categoryPill}
        onPress={() => {
          navigation.popToTop({ immediate: true });
          navigation.navigate(EVENT_LIST);
          setCategoryFilter(categoryName);
        }}
      />
    ))}
  </View>
);

export const EventAccessibility = ({ children }: { children: string }) => (
  <LayoutColumn spacing={4}>
    <Text type="h2" color="lightNavyBlueColor">
      {text.eventDetailsAccessibilityDetails}
    </Text>
    <Text>{children}</Text>
  </LayoutColumn>
);

export const EventTickets = ({ url }: { url: string }) => (
  <SafeAreaView>
    <ContentPadding style={styles.ticketButton}>
      <ButtonPrimary onPress={() => Linking.openURL(url)}>
        {text.eventDetailsBuyButton}
      </ButtonPrimary>
    </ContentPadding>
  </SafeAreaView>
);

type Props = {
  event: ?Event,
  isSaved: boolean,
  navigation: NavigationScreenProp<{ params: { eventId: string } }>,
  toggleSaved: boolean => void,
  setCategoryFilter: EventCategoryName => void
};

class EventDetailsScreen extends PureComponent<Props> {
  static defaultProps = {
    isSaved: false
  };

  render() {
    const { event, navigation, setCategoryFilter } = this.props;
    return (
      <View style={styles.container}>
        <EventHeader
          isSaved={this.props.isSaved}
          toggleSaved={this.props.toggleSaved}
          navigation={navigation}
        />
        {event && (
          <ShadowedScrollView topShadow={false}>
            <View style={{ aspectRatio: 5 / 3 }}>
              <ConnectedImage
                style={styles.image}
                resizeMode="cover"
                reference={event.fields.individualEventPicture[locale]}
              />
            </View>
            <View style={styles.content}>
              <LayoutColumn spacing={20}>
                <ContentPadding>
                  <Text type="h1" style={styles.h1}>
                    {event.fields.name[locale]}
                  </Text>
                  <LayoutColumn spacing={20}>
                    <EventCategories
                      event={event}
                      navigation={navigation}
                      setCategoryFilter={setCategoryFilter}
                    />
                    <EventOverview event={event} />
                    <SectionDivider />
                    <EventDescription event={event} />
                    <EventMap
                      lat={event.fields.location[locale].lat}
                      lon={event.fields.location[locale].lon}
                      locationName={event.fields.locationName[locale]}
                    />
                    {event.fields.performances &&
                      event.fields.performances[locale] && <SectionDivider />}
                  </LayoutColumn>
                </ContentPadding>
                {event.fields.performances &&
                  event.fields.performances[locale] && (
                    <PerformanceList
                      performances={groupPerformancesByPeriod(
                        event.fields.performances[locale]
                      )}
                      locale={locale}
                    />
                  )}
                {(event.fields.accessibilityDetails ||
                  event.fields.email ||
                  event.fields.phone) && (
                  <ContentPadding>
                    <LayoutColumn spacing={20}>
                      {event.fields.accessibilityDetails && <SectionDivider />}
                      {event.fields.accessibilityDetails && (
                        <EventAccessibility>
                          {event.fields.accessibilityDetails[locale]}
                        </EventAccessibility>
                      )}
                      {(event.fields.email || event.fields.phone) && (
                        <SectionDivider />
                      )}
                      {(event.fields.email || event.fields.phone) && (
                        <EventContact
                          email={
                            event.fields.email && event.fields.email[locale]
                          }
                          phone={
                            event.fields.phone && event.fields.phone[locale]
                          }
                        />
                      )}
                    </LayoutColumn>
                  </ContentPadding>
                )}
              </LayoutColumn>
            </View>
          </ShadowedScrollView>
        )}
        {event &&
          event.fields.ticketingUrl && (
            <EventTickets url={event.fields.ticketingUrl[locale]} />
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%"
  },
  content: {
    marginTop: 16,
    marginBottom: 32
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
