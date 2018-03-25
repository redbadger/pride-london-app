// @flow
import React from "react";
import { StyleSheet, SectionList, TouchableOpacity, View } from "react-native";
import type { SectionBase } from "react-native/Libraries/Lists/SectionList";
import formatDate from "date-fns/format";

import EventCard from "./EventCard";
import Text from "./Text";
import type { Event, EventDays, Asset } from "../data/event";
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
  getAssetById: string => Asset
};

const separator = style => () => <View style={style} />;

type ItemProps = { item: Event };
const renderItem = (styles, locale, onPress, getAssetById) => ({
  item: event
}: ItemProps) => (
  <TouchableOpacity
    style={styles.eventListItem}
    accessibilityTraits={["button"]}
    accessibilityComponentType="button"
    delayPressIn={50}
    onPress={() => onPress(event.sys.id)}
  >
    <EventCard
      name={event.fields.name[locale]}
      locationName={event.fields.locationName[locale]}
      eventPriceLow={event.fields.eventPriceLow[locale]}
      eventPriceHigh={event.fields.eventPriceHigh[locale]}
      startTime={event.fields.startTime[locale]}
      endTime={event.fields.endTime[locale]}
      imageUrl={`https:${
        getAssetById(event.fields.eventsListPicture[locale].sys.id).fields.file[
          locale
        ].url
      }`}
      isFree={event.fields.isFree[locale]}
    />
  </TouchableOpacity>
);

type Section = SectionBase<Event> & { title: string };

type SectionProps = { section: Section };
const renderSectionHeader = styles => ({ section }: SectionProps) => (
  <Text type="h2" style={styles.sectionHeader}>
    {section.title}
  </Text>
);

const eventSections = (events: EventDays, locale: string): Section[] =>
  events.map(it => ({
    data: it,
    title: formatDate(it[0].fields.startTime[locale], "dddd D MMMM")
  }));

const EventList = ({
  events,
  locale,
  refreshing,
  onRefresh,
  onPress,
  getAssetById
}: Props) => (
  <SectionList
    stickySectionHeadersEnabled
    sections={eventSections(events, locale)}
    renderSectionHeader={renderSectionHeader(styles)}
    renderSectionFooter={separator(styles.sectionFooter)}
    renderItem={renderItem(styles, locale, onPress, getAssetById)}
    keyExtractor={event => event.sys.id}
    contentContainerStyle={styles.container}
    ItemSeparatorComponent={separator(styles.itemSeparator)}
    SectionSeparatorComponent={separator(styles.sectionSeparator)}
    refreshing={refreshing}
    onRefresh={onRefresh}
  />
);

EventList.defaultProps = {
  refreshing: false,
  onRefresh: undefined
};

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
    marginHorizontal: 16,
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
    color: eventCardTextColor,
    paddingVertical: 8,
    paddingHorizontal: 15,
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
  sectionFooter: {
    height: 6
  }
});

export default EventList;
