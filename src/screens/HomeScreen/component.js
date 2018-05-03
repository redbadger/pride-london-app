// @flow
import React, { Component } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { equals } from "ramda";
import Text from "../../components/Text";
import type { Event } from "../../data/event";
import type { LocalizedFieldRef } from "../../data/localized-field-ref";
import EventTile from "../../components/EventTile";
import Loading from "../../components/Loading";
import Touchable from "../../components/Touchable";
import {
  cardBgColor,
  imageBgColor,
  titleTextColor
} from "../../constants/colors";
import { FEATURED_EVENT_LIST, EVENT_DETAILS } from "../../constants/routes";

import locale from "../../data/locale";

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  featuredEventsTitle: string,
  featuredEvents: Event[],
  loading: boolean,
  getAssetUrl: LocalizedFieldRef => string
};

class HomeScreen extends Component<Props> {
  shouldComponentUpdate = (nextProps: Props): boolean => {
    const { loading, featuredEventsTitle } = this.props;
    const {
      loading: nextLoading,
      featuredEventsTitle: nextFeaturedEventsTitle
    } = nextProps;

    const ids = this.props.featuredEvents.map(e => e.sys.id);
    const nextIds = nextProps.featuredEvents.map(e => e.sys.id);

    return (
      loading !== nextLoading ||
      featuredEventsTitle !== nextFeaturedEventsTitle ||
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
    // Show only even number of events (2, 4 or 6).
    // Never show more than 6 events.
    const eventsCount = Math.min(
      6,
      Math.floor(this.props.featuredEvents.length / 2) * 2
    );
    const events = this.props.featuredEvents.slice(0, eventsCount);

    return (
      <SafeAreaView testID="home-screen">
        {this.props.loading && <Loading />}
        <ScrollView style={styles.scroller}>
          <View style={styles.header}>
            <Text>Header - TBD</Text>
          </View>
          <View style={styles.sectionTitle}>
            <Text type="h2" style={{ color: titleTextColor }}>
              {this.props.featuredEventsTitle}
            </Text>
            <Touchable onPress={this.eventList} testID="view-all">
              <Text style={{ color: titleTextColor }}>View all</Text>
            </Touchable>
          </View>
          <View style={styles.container}>
            {events.map(event => (
              <Touchable
                key={event.sys.id}
                style={styles.tile}
                onPress={() => this.eventDetails(event.sys.id)}
                testID={`event-tile-${event.sys.id}`}
              >
                <EventTile
                  name={event.fields.name[locale]}
                  date={event.fields.startTime[locale]}
                  imageUrl={this.props.getAssetUrl(
                    event.fields.eventsListPicture
                  )}
                />
              </Touchable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scroller: {
    backgroundColor: cardBgColor
  },
  header: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: imageBgColor
  },
  sectionTitle: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 6,
    justifyContent: "space-between",
    alignItems: "center"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 12
  },
  tile: {
    width: "50%",
    paddingHorizontal: 4,
    marginBottom: 8
  }
});

export default HomeScreen;
