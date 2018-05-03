// @flow
import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import type { NavigationScreenProp } from "react-navigation";
import type { SavedEvents, EventDays } from "../../data/event";
import type { LocalizedFieldRef } from "../../data/localized-field-ref";
import EventList from "../../components/EventList";
import Header from "../../components/Header";
import { bgColor } from "../../constants/colors";
import { EVENT_DETAILS } from "../../constants/routes";
import text from "../../constants/text";

import locale from "../../data/locale";

export type Props = {
  navigation: NavigationScreenProp<{ params: { title: string } }>,
  events: EventDays,
  savedEvents: SavedEvents,
  addSavedEvent: string => void,
  removeSavedEvent: string => void,
  getAssetUrl: LocalizedFieldRef => string
};

class FeaturedEventsListScreen extends PureComponent<Props> {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          onBack={() => {
            this.props.navigation.goBack(null);
          }}
          title={text.featuredEventListTitle}
        />
        <EventList
          locale={locale}
          events={this.props.events}
          savedEvents={this.props.savedEvents}
          addSavedEvent={this.props.addSavedEvent}
          removeSavedEvent={this.props.removeSavedEvent}
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

export default FeaturedEventsListScreen;
