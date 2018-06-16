// @flow
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { SavedEvents, EventDays } from "../../data/event";
import EventList from "../../components/EventList";
import text from "../../constants/text";
import Loading from "../../components/Loading";
import Header from "../../components/Header";
import { bgColor } from "../../constants/colors";
import { EVENT_DETAILS } from "../../constants/routes";
import NoSavedEvents from "./NoSavedEvents";

export type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  events: EventDays,
  savedEvents: SavedEvents,
  addSavedEvent: string => void,
  removeSavedEvent: string => void,
  loading: boolean,
  refreshing: boolean,
  updateData: () => Promise<void>
};

class SavedEventListScreen extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    // Intentionally do not check this.props.navigation
    return (
      nextProps.events !== this.props.events ||
      nextProps.savedEvents !== this.props.savedEvents ||
      nextProps.addSavedEvent !== this.props.addSavedEvent ||
      nextProps.removeSavedEvent !== this.props.removeSavedEvent ||
      nextProps.loading !== this.props.loading ||
      nextProps.refreshing !== this.props.refreshing ||
      nextProps.updateData !== this.props.updateData
    );
  }

  render() {
    const {
      navigation,
      updateData,
      events,
      savedEvents,
      addSavedEvent,
      removeSavedEvent,
      refreshing,
      loading
    } = this.props;

    return (
      <View style={styles.container}>
        <Header
          title={text.savedEventsTitle}
          testID="page-heading-saved-events"
        />
        {loading && <Loading />}
        {!loading &&
          events.length === 0 && <NoSavedEvents navigation={navigation} />}
        {!loading &&
          events.length !== 0 && (
            <EventList
              events={events}
              savedEvents={savedEvents}
              addSavedEvent={addSavedEvent}
              removeSavedEvent={removeSavedEvent}
              refreshing={refreshing}
              onRefresh={() => {
                updateData();
              }}
              onPress={(eventId: string) => {
                navigation.navigate(EVENT_DETAILS, { eventId });
              }}
              testID="saved-event-list"
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

export default SavedEventListScreen;
