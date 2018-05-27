// @flow
import React, { Component } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { equals } from "ramda";
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
  lightNavyBlueColor
} from "../../constants/colors";
import { FEATURED_EVENT_LIST, EVENT_DETAILS } from "../../constants/routes";
import text from "../../constants/text";
import type { Event } from "../../data/event";
import type { FieldRef } from "../../data/field-ref";
import type { ImageSource } from "../../data/get-asset-source";
import type { HeaderBanner } from "../../data/header-banner";

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
      getAssetSource,
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
            getAssetSource={getAssetSource}
            navigation={navigation}
          />
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
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightNavyBlueColor
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
  }
});

export default HomeScreen;
