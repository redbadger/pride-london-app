// @flow
import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import type { NavigationScreenProp } from "react-navigation";
import type { SavedEvents, EventDays } from "../../data/event";
import type { LocalizedFieldRef } from "../../data/localized-field-ref";
import ContentPadding from "../../components/ContentPadding";
import EventList from "../../components/EventList";
import Header from "../../components/Header";
import IconButton from "../../components/IconButton";
import Text from "../../components/Text";
import {
  bgColor,
  whiteColor,
  lightNavyBlueColor
} from "../../constants/colors";
import { EVENT_DETAILS } from "../../constants/routes";
import text from "../../constants/text";
import chevronLeftWhite from "../../../assets/images/chevron-left-white.png";

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
        <Header backgroundColor={lightNavyBlueColor}>
          <ContentPadding style={styles.headerContent}>
            <IconButton
              accessibilityLabel="Back"
              onPress={() => {
                this.props.navigation.goBack(null);
              }}
              source={chevronLeftWhite}
            />
            <Text type="h2" style={styles.headerTitle}>
              {text.featuredEventListTitle}
            </Text>
            <View style={styles.phantomIcon} />
          </ContentPadding>
        </Header>
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
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerTitle: {
    color: whiteColor
  },
  phantomIcon: {
    width: 48,
    height: 48
  }
});

export default FeaturedEventsListScreen;
