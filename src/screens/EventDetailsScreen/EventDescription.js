// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
// import { blackColor } from "../../constants/colors";
import type { Event } from "../../data/event";
import locale from "../../data/locale";
import Text from "../../components/Text";
import EventMap from "./EventMap";

type Props = { event: Event };

const EventDescription = ({ event }: Props) => (
  <View style={styles.content}>
    <Text markdown>{event.fields.eventDescription[locale]}</Text>
    <View style={styles.mapWrapper}>
      <EventMap
        lat={event.fields.location[locale].lat}
        lon={event.fields.location[locale].lon}
        locationName={event.fields.locationName[locale]}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  content: {
    paddingVertical: 15
  },
  mapWrapper: {
    marginTop: 8
  }
});

export default EventDescription;
