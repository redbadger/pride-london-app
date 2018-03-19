// @flow
import React from "react";
import { StyleSheet, SectionList, TouchableOpacity, View } from "react-native";
import type { SectionBase } from "react-native/Libraries/Lists/SectionList";
import formatDate from "date-fns/format";

import EventCard from "./EventCard";
import Text from "./Text";
import type { Event, EventDays, Asset } from "../data/event";
import {
  eventListBgColor,
  eventListHeaderBgColor,
  eventListHeaderColor
} from "../constants/colors";

type Props = {
  locale: string,
  events: EventDays,
  refreshing: boolean,
  onRefresh: () => void,
  onPress: (eventName: string) => void,
  getAssetById: string => Asset
};

const separator = style => () => <View style={style} />;

type ItemProps = { item: Event };
const renderItem = (styles, locale, onPress, getAssetById) => ({
  item: event
}: ItemProps) => (
  <View style={styles.eventListItem}>
    <TouchableOpacity
      accessibilityTraits={["button"]}
      accessibilityComponentType="button"
      delayPressIn={50}
      onPress={() => onPress(event.sys.id)}
    >
      <EventCard
        name={event.fields.name[locale]}
        locationName={event.fields.locationName[locale]}
        price={event.fields.eventPriceLow[locale]}
        startTime={event.fields.startTime[locale]}
        endTime={event.fields.endTime[locale]}
        imageUrl={`https:${
          getAssetById(event.fields.eventsListPicture[locale].sys.id).fields
            .file[locale].url
        }`}
      />
    </TouchableOpacity>
  </View>
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
    sections={eventSections(events, locale)}
    renderSectionHeader={renderSectionHeader(styles)}
    renderItem={renderItem(styles, locale, onPress, getAssetById)}
    keyExtractor={event => event.sys.id}
    contentContainerStyle={styles.container}
    ItemSeparatorComponent={separator(styles.itemSeparator)}
    SectionSeparatorComponent={separator(styles.sectionSeparator)}
    refreshing={refreshing}
    onRefresh={onRefresh}
  />
);

const styles = StyleSheet.create({
  itemSeparator: {
    height: 10
  },
  sectionSeparator: {
    height: 16
  },
  container: {
    paddingTop: 0,
    backgroundColor: eventListBgColor
  },
  eventListItem: {
    paddingHorizontal: 15
  },
  sectionHeader: {
    height: 32,
    paddingTop: 6,
    paddingBottom: 2,
    textAlign: "center",
    backgroundColor: eventListHeaderBgColor,
    color: eventListHeaderColor
  }
});

export default EventList;
