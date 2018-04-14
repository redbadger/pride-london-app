// @flow
import React, { PureComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { EventDays, LocalizedFieldRef } from "../../data/event";
import EventList from "../../components/EventList";
import FilterHeader from "../../components/ConnectedFilterHeader";
import { bgColor } from "../../constants/colors";
import { EVENT_DETAILS } from "../../constants/routes";
import locale from "../../data/locale";

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  events: EventDays,
  loading: boolean,
  refreshing: boolean,
  updateEvents: () => Promise<void>,
  getAssetUrl: LocalizedFieldRef => string
};

class EventsScreen extends PureComponent<Props> {
  static navigationOptions = {
    header: null
  };

  render() {
    const {
      navigation,
      updateEvents,
      events,
      refreshing,
      getAssetUrl
    } = this.props;
    return (
      <View style={styles.container}>
        <FilterHeader
          onFilterButtonPress={() => navigation.navigate("FilterModal")}
        />
        {this.props.loading ? (
          <Text>Loading...</Text>
        ) : (
          <EventList
            locale={locale}
            events={events}
            refreshing={refreshing}
            onRefresh={() => {
              updateEvents();
            }}
            onPress={(eventId: string) => {
              navigation.navigate(EVENT_DETAILS, { eventId });
            }}
            getAssetUrl={getAssetUrl}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor
  }
});

export default EventsScreen;
