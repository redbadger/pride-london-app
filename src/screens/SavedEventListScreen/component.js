// @flow
import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { SavedEvents, EventDays } from "../../data/event";
import type { LocalizedFieldRef } from "../../data/localized-field-ref";
import EventList from "../../components/EventList";
import text from "../../constants/text";
import Loading from "../../components/Loading";
import Header from "../../components/Header";
import ContentPadding from "../../components/ContentPadding";
import Text from "../../components/Text";
import {
  whiteColor,
  bgColor,
  lightNavyBlueColor
} from "../../constants/colors";
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
  getAssetUrl: LocalizedFieldRef => string
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
      getAssetUrl
    } = this.props;

    return (
      <View style={styles.container}>
        <Header backgroundColor={lightNavyBlueColor}>
          <ContentPadding style={styles.headerContent}>
            <Text type="h2" style={styles.headerTitle}>
              {text.savedEventsTitle}
            </Text>
          </ContentPadding>
        </Header>
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
  },
  headerContent: {
    height: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  headerTitle: {
    color: whiteColor
  }
});

export default SavedEventListScreen;
