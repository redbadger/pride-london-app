// @flow
import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import type { NavigationScreenProp } from "react-navigation";
import type { EventDays, LocalizedFieldRef } from "../../data/event";
import EventList from "../../components/EventList";
import { bgColor } from "../../constants/colors";
import { EVENT_DETAILS } from "../../constants/routes";

import locale from "../../data/locale";

type Props = {
  navigation: NavigationScreenProp<{ params: { title: string } }>,
  events: EventDays,
  getAssetUrl: LocalizedFieldRef => string
};

class EventsScreen extends PureComponent<Props> {
  render() {
    return (
      <View style={styles.container}>
        <EventList
          locale={locale}
          events={this.props.events}
          onPress={(eventId: string) => {
            this.props.navigation.navigate(EVENT_DETAILS, { eventId });
          }}
          getAssetUrl={this.props.getAssetUrl}
        />
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
