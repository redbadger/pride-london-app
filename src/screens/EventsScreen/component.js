// @flow
import React, { PureComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { EventDays } from "../../data/event";
import type { LocalizedFieldRef } from "../../data/localized-field-ref";
import EventList from "../../components/EventList";
import FilterHeader from "../../components/ConnectedFilterHeader";
import { bgColor } from "../../constants/colors";
import {
  EVENT_DETAILS,
  EVENT_CATEGORIES_FILTER,
  FILTER_MODAL
} from "../../constants/routes";
import locale from "../../data/locale";

export type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  events: EventDays,
  loading: boolean,
  refreshing: boolean,
  updateEvents: () => Promise<void>,
  getAssetUrl: LocalizedFieldRef => string,
  selectedCategories: Set<string>
};

class EventsScreen extends PureComponent<Props> {
  static navigationOptions = {
    header: null
  };

  handleFilterCategoriesPress = () => {
    this.props.navigation.navigate(EVENT_CATEGORIES_FILTER);
  };

  handleFilterButtonPress = () => {
    this.props.navigation.navigate(FILTER_MODAL);
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
          onFilterCategoriesPress={this.handleFilterCategoriesPress}
          selectedCategories={this.props.selectedCategories}
          onFilterButtonPress={this.handleFilterButtonPress}
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
