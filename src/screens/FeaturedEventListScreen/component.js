// @flow
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { SavedEvents, EventDays } from "../../data/event";
import EventList from "../../components/EventList";
import Header from "../../components/Header";
import { bgColor } from "../../constants/colors";
import { EVENT_DETAILS } from "../../constants/routes";
import text from "../../constants/text";

export type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  events: EventDays,
  savedEvents: SavedEvents,
  addSavedEvent: string => void,
  removeSavedEvent: string => void
};

class FeaturedEventsListScreen extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    // intentionally do not check this.props.navigation
    return (
      nextProps.events !== this.props.events ||
      nextProps.savedEvents !== this.props.savedEvents ||
      nextProps.addSavedEvent !== this.props.addSavedEvent ||
      nextProps.removeSavedEvent !== this.props.removeSavedEvent
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          leftElement={
            <Header.BackButton
              onPress={() => {
                this.props.navigation.goBack(null);
              }}
            />
          }
          title={text.featuredEventListTitle}
        />
        <EventList
          events={this.props.events}
          savedEvents={this.props.savedEvents}
          addSavedEvent={this.props.addSavedEvent}
          removeSavedEvent={this.props.removeSavedEvent}
          onPress={(eventId: string) => {
            this.props.navigation.navigate(EVENT_DETAILS, { eventId });
          }}
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
