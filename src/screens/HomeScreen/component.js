// @flow
import React, { Component } from "react";
import { ImageBackground, StyleSheet, ScrollView, View } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { equals, sortBy } from "ramda";
import Text from "../../components/Text";
import type { Event } from "../../data/event";
import type { FieldRef } from "../../data/field-ref";
import type { ImageSource } from "../../data/get-asset-source";
import type { HeaderBanner } from "../../data/header-banner";
import EventTile from "../../components/EventTile";
import Loading from "../../components/Loading";
import Touchable from "../../components/Touchable";
import TextLink from "../../components/TextLink";
import ContentPadding from "../../components/ContentPadding";
import {
  cardBgColor,
  imageBgColor,
  titleTextColor,
  eventCardShadow,
  bgColor
} from "../../constants/colors";
import { FEATURED_EVENT_LIST, EVENT_DETAILS } from "../../constants/routes";
import text from "../../constants/text";

import locale from "../../data/locale";

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  headerBanners: HeaderBanner[],
  featuredEventsTitle: string,
  featuredEvents: Event[],
  loading: boolean,
  getAssetSource: FieldRef => ImageSource
};

class HomeScreen extends Component<Props> {
  shouldComponentUpdate = (nextProps: Props): boolean => {
    const { loading, featuredEventsTitle } = this.props;
    const {
      loading: nextLoading,
      featuredEventsTitle: nextFeaturedEventsTitle
    } = nextProps;

    const bannerIds = this.props.headerBanners.map(e => e.sys.id);
    const nextBannerIds = nextProps.headerBanners.map(e => e.sys.id);

    const ids = this.props.featuredEvents.map(e => e.sys.id);
    const nextIds = nextProps.featuredEvents.map(e => e.sys.id);

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
      getAssetSource
    } = this.props;

    const sortByHeroImage = sortBy(
      banner => banner.fields.heroImage[locale].sys.id
    );
    const day = Math.floor(Date.now() / 1000 / 60 / 60 / 24);
    const banner = sortByHeroImage(headerBanners)[day % headerBanners.length];

    // Show only even number of events (2, 4 or 6).
    // Never show more than 6 events.
    const eventsCount = Math.min(6, Math.floor(featuredEvents.length / 2) * 2);
    const events = featuredEvents.slice(0, eventsCount);

    return (
      <View
        testID="home-screen"
        style={{
          backgroundColor: banner && banner.fields.backgroundColour[locale]
        }}
      >
        {loading && <Loading />}
        <ScrollView style={styles.scroller}>
          <ImageBackground
            style={styles.header}
            source={banner && getAssetSource(banner.fields.heroImage[locale])}
          />
          <ContentPadding style={styles.mainContentContainer}>
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
                  key={event.sys.id}
                  style={[
                    styles.tileContainer,
                    index % 2 === 0 && styles.startOfRowTileContainer
                  ]}
                >
                  <Touchable
                    style={styles.tile}
                    onPress={() => this.eventDetails(event.sys.id)}
                    testID={`event-tile-${event.sys.id}`}
                  >
                    <EventTile
                      name={event.fields.name[locale]}
                      date={event.fields.startTime[locale]}
                      eventCategories={event.fields.eventCategories[locale]}
                      image={getAssetSource(
                        event.fields.eventsListPicture[locale]
                      )}
                    />
                  </Touchable>
                </View>
              ))}
            </View>
          </ContentPadding>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scroller: {
    backgroundColor: cardBgColor
  },
  mainContentContainer: {
    maxWidth: 440,
    alignSelf: "center"
  },
  header: {
    height: 292,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: imageBgColor
  },
  sectionTitle: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
    alignItems: "center"
  },
  tilesContainer: {
    flex: 1,
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
    borderRadius: 3,
    // The below properties are required for ioS shadow
    shadowColor: eventCardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    // The below properties are required for android shadow
    borderWidth: 0,
    elevation: 3,
    backgroundColor: bgColor
  }
});

export default HomeScreen;
