// @flow
import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { Event, SavedEvents } from "../../data/event";
import type { Amenity } from "../../data/amenity";
import { EVENT_DETAILS } from "../../constants/routes";
import { route, region, terminals } from "../../constants/parade-coordinates";
import Map from "./Map";

type Props = {
  isFocused: boolean,
  stages: Event[],
  amenities: Amenity[],
  savedEvents: SavedEvents,
  addSavedEvent: string => void,
  removeSavedEvent: string => void,
  navigation: NavigationScreenProp<NavigationState>
};

class ParadeMapScreen extends PureComponent<Props> {
  render() {
    const {
      isFocused,
      stages,
      amenities,
      savedEvents,
      addSavedEvent,
      removeSavedEvent
    } = this.props;
    return (
      <View style={styles.container} testID="parade-map-screen">
        {isFocused ? (
          <Map
            route={route}
            paradeRegion={region}
            terminals={terminals}
            stages={stages}
            amenities={amenities}
            savedEvents={savedEvents}
            addSavedEvent={addSavedEvent}
            removeSavedEvent={removeSavedEvent}
            onEventCardPress={(eventId: string) => {
              this.props.navigation.navigate(EVENT_DETAILS, { eventId });
            }}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "column",
    justifyContent: "flex-end"
  }
});

export default ParadeMapScreen;
