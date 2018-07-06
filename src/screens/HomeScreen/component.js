// @flow
import React, { Component } from "react";
import { StyleSheet, ScrollView, View, Image } from "react-native";
import { equals } from "ramda";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import Header from "./Header";
import ContentPadding from "../../components/ContentPadding";
import EventTile from "../../components/EventTile";
import Loading from "../../components/Loading";
import Text from "../../components/Text";
import TextLink from "../../components/TextLink";
import Touchable from "../../components/Touchable";
import {
  blackTwentyColor,
  cardBgColor,
  titleTextColor,
  bgColor,
  whiteColor,
  lightNavyBlueColor
} from "../../constants/colors";
import { FEATURED_EVENT_LIST, EVENT_DETAILS } from "../../constants/routes";
import text from "../../constants/text";
import type { Event } from "../../data/event";
import type { ImageDetails } from "../../data/image";
import type { HeaderBanner } from "../../data/header-banner";
import partnershipWithSally from "../../../assets/images/partnershipWithSally.png";

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  headerBanners: HeaderBanner[],
  featuredEventsTitle: string,
  featuredEvents: Event[],
  loading: boolean,
  getImageDetails: string => ?ImageDetails
};

const getId = obj => obj.id;

class HomeScreen extends Component<Props> {
  shouldComponentUpdate = (nextProps: Props): boolean => {
    const { loading, featuredEventsTitle } = this.props;
    const {
      loading: nextLoading,
      featuredEventsTitle: nextFeaturedEventsTitle
    } = nextProps;

    const bannerIds = this.props.headerBanners.map(getId);
    const nextBannerIds = nextProps.headerBanners.map(getId);

    const ids = this.props.featuredEvents.map(getId);
    const nextIds = nextProps.featuredEvents.map(getId);

    return (
      loading !== nextLoading ||
      featuredEventsTitle !== nextFeaturedEventsTitle ||
      !equals(bannerIds, nextBannerIds) ||
      !equals(ids, nextIds)
    );
  };

  eventDetails = (eventId: string) => {
    this.props.navigation.navigate(EVENT_DETAILS, { eventId });
  };

  eventList = () => {
    this.props.navigation.navigate(FEATURED_EVENT_LIST, {
      title: this.props.featuredEventsTitle
    });
  };

  render() {
    const {
      loading,
      headerBanners,
      featuredEvents,
      featuredEventsTitle,
      getImageDetails,
      navigation
    } = this.props;

    // Show only even number of events (2, 4 or 6).
    // Never show more than 6 events.
    const eventsCount = Math.min(6, Math.floor(featuredEvents.length / 2) * 2);
    const events = featuredEvents.slice(0, eventsCount);

    return (
      <ScrollView testID="home-screen" style={styles.container}>
        <View style={styles.content}>
          <Header
            headerBanners={headerBanners}
            getImageDetails={getImageDetails}
            navigation={navigation}
          />
          {events.length > 0 && (
            <ContentPadding style={styles.mainContentContainer}>
              {loading && <Loading />}
              <View style={styles.sectionTitle}>
                <Text type="h2" style={{ color: titleTextColor }}>
                  {featuredEventsTitle}
                </Text>
                <Touchable onPress={this.eventList} testID="view-all">
                  <TextLink>{text.homeViewAll}</TextLink>
                </Touchable>
              </View>
              <View style={styles.tilesContainer}>
                {events.map((event, index) => (
                  <View
                    key={event.id}
                    style={[
                      styles.tileContainer,
                      index % 2 === 0 && styles.startOfRowTileContainer
                    ]}
                  >
                    <Touchable
                      style={styles.tile}
                      onPress={() => this.eventDetails(event.id)}
                      testID={`event-tile-${index}`}
                    >
                      <EventTile
                        name={event.fields.name}
                        date={event.fields.startTime}
                        eventCategories={event.fields.eventCategories}
                        imageReference={event.fields.eventsListPicture}
                      />
                    </Touchable>
                  </View>
                ))}
              </View>
            </ContentPadding>
          )}
          <View style={styles.partnershipBar}>
            <View style={styles.innerBar}>
              <ContentPadding>
                <Text type="xSmall" style={styles.partnershipText}>
                  {text.partnershipWithSally}
                </Text>
              </ContentPadding>
            </View>
            <Image style={styles.sallyImage} source={partnershipWithSally} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteColor
  },
  content: {
    backgroundColor: cardBgColor
  },
  mainContentContainer: {
    maxWidth: 440,
    alignSelf: "center"
  },
  sectionTitle: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
    alignItems: "center"
  },
  tilesContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  tileContainer: {
    width: "50%",
    marginBottom: 12
  },
  startOfRowTileContainer: {
    paddingRight: 8
  },
  tile: {
    flex: 1,
    justifyContent: "flex-start",
    borderRadius: 3,
    // The below properties are required for ioS shadow
    shadowColor: blackTwentyColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    // The below properties are required for android shadow
    borderWidth: 0,
    elevation: 3,
    backgroundColor: bgColor
  },
  partnershipBar: {
    height: 42,
    marginTop: 12,
    marginBottom: 16
  },
  innerBar: {
    backgroundColor: lightNavyBlueColor,
    marginTop: 15,
    paddingVertical: 2
  },
  partnershipText: {
    alignSelf: "flex-end",
    color: whiteColor
  },
  sallyImage: {
    position: "absolute",
    left: 15
  }
});

export default HomeScreen;
