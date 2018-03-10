// @flow
import React from "react";
import { StyleSheet, SectionList, TouchableOpacity, View } from "react-native";
import { format, parse } from "date-fns";

import EventCard from "./EventCard";
import Text from "./Text";
import type { EventDays } from "../data/event";
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
  onPress: (eventName: string) => void
};

const EventList = ({
  events,
  locale,
  refreshing,
  onRefresh,
  onPress
}: Props) => (
  <SectionList
    contentContainerStyle={styles.container}
    keyExtractor={event => event.sys.id}
    sections={events.map(it => ({
      data: it,
      title: format(parse(it[0].fields.startTime[locale]), "dddd D MMMM")
    }))}
    renderSectionHeader={({ section }) => (
      <Text type="h2" style={styles.sectionHeader}>
        {section.title}
      </Text>
    )}
    ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
    SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
    renderItem={({ item: event }) => (
      <View style={styles.eventListItem}>
        <TouchableOpacity
          delayPressIn={50}
          onPress={() => onPress(event.sys.id)}
        >
          <EventCard name={event.fields.name[locale]} />
        </TouchableOpacity>
      </View>
    )}
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
