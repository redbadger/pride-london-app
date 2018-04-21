// @flow
import React, { Component } from "react";
import { StyleSheet, SectionList, View } from "react-native";
import type { SectionBase } from "react-native/Libraries/Lists/SectionList";
import formatDate from "date-fns/format";
import { concat, equals } from "ramda";

import ContentPadding from "./ContentPadding";
import EventCard from "./EventCard";
import Text from "./Text";
import Touchable from "./Touchable";
import type { Event, EventDays, LocalizedFieldRef } from "../data/event";
import {
  bgColor,
  eventCardTextColor,
  sectionHeaderShadow,
  sectionHeaderBgColor,
  eventCardShadow
} from "../constants/colors";

type Props = {
  locale: string,
  events: EventDays,
  refreshing?: boolean,
  onRefresh?: () => void,
  onPress: (eventName: string) => void,
  getAssetUrl: LocalizedFieldRef => string
};

const separator = style => () => <View style={style} />;

type ItemProps = { item: Event };
const renderItem = (styles, locale, onPress, getAssetUrl) => ({
  item: event
}: ItemProps) => (
  <ContentPadding>
    <Touchable
      style={styles.eventListItem}
      onPress={() => onPress(event.sys.id)}
    >
      <EventCard
        name={event.fields.name[locale]}
        locationName={event.fields.locationName[locale]}
        eventPriceLow={event.fields.eventPriceLow[locale]}
        eventPriceHigh={event.fields.eventPriceHigh[locale]}
        startTime={event.fields.startTime[locale]}
        endTime={event.fields.endTime[locale]}
        imageUrl={getAssetUrl(event.fields.eventsListPicture)}
        isFree={event.fields.isFree[locale]}
      />
    </Touchable>
  </ContentPadding>
);

type Section = SectionBase<Event> & { title: string };

type SectionProps = { section: Section };
const renderSectionHeader = styles => ({ section }: SectionProps) => (
  <ContentPadding style={styles.sectionHeader}>
    <Text type="h2" style={styles.sectionHeaderText}>
      {section.title}
    </Text>
  </ContentPadding>
);

const eventSections = (events: EventDays, locale: string): Section[] =>
  events.map(it => ({
    data: it,
    title: formatDate(it[0].fields.startTime[locale], "dddd D MMMM")
  }));

const eventIds = (events: EventDays): string[] =>
  events.map(day => day.map(e => e.sys.id)).reduce(concat, []);

class EventList extends Component<Props> {
  static defaultProps = {
    refreshing: false,
    onRefresh: undefined
  };

  shouldComponentUpdate(nextProps: Props) {
    const { locale, refreshing } = this.props;
    const { locale: nextLocale, refreshing: nextRefreshing } = nextProps;

    const ids = eventIds(this.props.events);
    const nextIds = eventIds(nextProps.events);

    return (
      !equals(ids, nextIds) ||
      locale !== nextLocale ||
      refreshing !== nextRefreshing
    );
  }

  render() {
    const {
      events,
      locale,
      refreshing,
      onRefresh,
      onPress,
      getAssetUrl
    } = this.props;

    return (
      <SectionList
        stickySectionHeadersEnabled
        sections={eventSections(events, locale)}
        renderSectionHeader={renderSectionHeader(styles)}
        renderSectionFooter={separator(styles.sectionFooter)}
        renderItem={renderItem(styles, locale, onPress, getAssetUrl)}
        keyExtractor={event => event.sys.id}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={separator(styles.itemSeparator)}
        SectionSeparatorComponent={separator(styles.sectionSeparator)}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    );
  }
}

const styles = StyleSheet.create({
  itemSeparator: {
    height: 12
  },
  sectionSeparator: {
    height: 6
  },
  container: {
    paddingTop: 0,
    backgroundColor: bgColor
  },
  eventListItem: {
    borderRadius: 5,
    // The below properties are required for ioS shadow
    shadowColor: eventCardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    // The below properties are required for android shadow
    borderWidth: 0,
    elevation: 3,
    backgroundColor: bgColor
  },
  sectionHeader: {
    height: 40,
    justifyContent: "center",
    backgroundColor: sectionHeaderBgColor,

    // The below properties are required for ioS shadow
    shadowColor: sectionHeaderShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    // The below properties are required for android shadow
    borderWidth: 0,
    elevation: 3,
    marginBottom: 6
  },
  sectionHeaderText: {
    color: eventCardTextColor
  },
  sectionFooter: {
    height: 6
  }
});

export default EventList;
