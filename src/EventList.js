// @flow
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import EventCard from "./EventCard";
import type { Event } from "./integrations/cms";

type Props = {
  locale: string,
  events: Event[],
  refreshing: boolean,
  onRefresh: () => void
};

const EventList = ({ events, locale, refreshing, onRefresh }: Props) => (
  <FlatList
    data={events}
    keyExtractor={event => event.sys.id}
    renderItem={({ item: event }) => (
      <View style={styles.eventListItem}>
        <EventCard name={event.fields.name[locale]} />
      </View>
    )}
    refreshing={refreshing}
    onRefresh={onRefresh}
  />
);

const styles = StyleSheet.create({
  eventListItem: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10
  }
});

export default EventList;
