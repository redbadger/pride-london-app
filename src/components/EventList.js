// @flow
import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import EventCard from "./EventCard";
import type { Event } from "../integrations/cms";

type Props = {
  locale: string,
  events: Event[],
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
  <FlatList
    contentContainerStyle={styles.container}
    data={events}
    keyExtractor={event => event.sys.id}
    renderItem={({ item: event }) => (
      <View style={styles.eventListItem}>
        <TouchableOpacity
          delayPressIn={50}
          onPress={() => onPress(event.fields.name[locale])}
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
  container: {
    paddingTop: 10
  },
  eventListItem: {
    paddingHorizontal: 15,
    paddingBottom: 10
  }
});

export default EventList;
