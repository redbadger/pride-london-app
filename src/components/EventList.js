// @flow
import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import formatDate from "date-fns/format";
import isSameDay from "date-fns/is_same_day";
import EventCard from "./EventCard";
import type { Event } from "../integrations/cms";

type Props = {
  locale: string,
  events: Event[],
  refreshing: boolean,
  onRefresh: () => void,
  onPress: (eventName: string) => void
};

const removeTimezoneFromDateString = isoString => isoString.slice(0, -6);

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
    renderItem={({ item: event }) => {
      const startTime = removeTimezoneFromDateString(
        event.fields.startTime[locale]
      );
      const endTime = removeTimezoneFromDateString(
        event.fields.endTime[locale]
      );
      const dateFormat = "DD MMMM YYYY";
      const timeFormat = "HH:mm";
      const dateDisplay = isSameDay(startTime, endTime)
        ? formatDate(startTime, dateFormat)
        : `${formatDate(startTime, dateFormat)} - ${formatDate(
            endTime,
            dateFormat
          )}`;
      const timeDisplay = `${formatDate(startTime, timeFormat)} - ${formatDate(
        endTime,
        timeFormat
      )}`;
      return (
        <View style={styles.eventListItem}>
          <TouchableOpacity
            delayPressIn={50}
            onPress={() => onPress(event.sys.id)}
          >
            <EventCard
              date={dateDisplay}
              name={event.fields.name[locale]}
              locationName={event.fields.locationName[locale]}
              price="£16"
              startTime={timeDisplay}
            />
          </TouchableOpacity>
        </View>
      );
    }}
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
