// @flow
import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { SavedEvents, EventDays } from "../../data/event";
import type { FieldRef } from "../../data/field-ref";
import type { ImageSource } from "../../data/get-asset-source";
import EventList from "../../components/EventList";
import text from "../../constants/text";
import Loading from "../../components/Loading";
import Header from "../../components/Header";
import { bgColor } from "../../constants/colors";
import { EVENT_DETAILS } from "../../constants/routes";
import locale from "../../data/locale";
import NoSavedEvents from "./NoSavedEvents";

export type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  events: EventDays,
  savedEvents: SavedEvents,
  addSavedEvent: string => void,
  removeSavedEvent: string => void,
  loading: boolean,
  refreshing: boolean,
  updateEvents: () => Promise<void>,
  getAssetSource: FieldRef => ImageSource
};

class SavedEventListScreen extends PureComponent<Props> {
  static navigationOptions = {
    header: null
  };

  render() {
    const {
      navigation,
      updateEvents,
      events,
      savedEvents,
      addSavedEvent,
      removeSavedEvent,
      refreshing,
      loading,
      getAssetSource
    } = this.props;

    return (
      <View style={styles.container}>
        <Header title={text.savedEventsTitle} />
        {loading && <Loading />}
        {!loading &&
          events.length === 0 && <NoSavedEvents navigation={navigation} />}
        {!loading &&
          events.length !== 0 && (
            <EventList
              locale={locale}
              events={events}
              savedEvents={savedEvents}
              addSavedEvent={addSavedEvent}
              removeSavedEvent={removeSavedEvent}
              refreshing={refreshing}
              onRefresh={() => {
                updateEvents();
              }}
              onPress={(eventId: string) => {
                navigation.navigate(EVENT_DETAILS, { eventId });
              }}
              getAssetSource={getAssetSource}
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
