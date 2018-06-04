// @flow
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import type {
  EventCategoryName,
  SavedEvents,
  EventDays
} from "../../data/event";
import type { FieldRef } from "../../data/field-ref";
import type { ImageSource } from "../../data/get-asset-source";
import { withNavigationFocus } from "../../lib/navigation";
import type { NavigationProps } from "../../lib/navigation";
import EventList from "../../components/EventList";
import FilterHeader from "./FilterHeaderConnected";
import NoEvents from "./NoEvents";
import { bgColor } from "../../constants/colors";
import {
  EVENT_DETAILS,
  EVENT_CATEGORIES_FILTER,
  FILTER_MODAL
} from "../../constants/routes";
import locale from "../../data/locale";

export type Props = {
  events: EventDays,
  savedEvents: SavedEvents,
  addSavedEvent: string => void,
  removeSavedEvent: string => void,
  loading: boolean,
  refreshing: boolean,
  updateData: () => Promise<void>,
  getAssetSource: FieldRef => ImageSource,
  selectedCategories: Set<EventCategoryName>
};

type AllProps = Props & NavigationProps;

class EventsScreen extends Component<AllProps> {
  shouldComponentUpdate(nextProps: AllProps) {
    return nextProps.isFocused;
  }

  handleFilterCategoriesPress = () => {
    this.props.navigation.navigate(EVENT_CATEGORIES_FILTER);
  };

  handleFilterButtonPress = () => {
    this.props.navigation.navigate(FILTER_MODAL);
  };

  render() {
    const {
      navigation,
      updateData,
      events,
      savedEvents,
      addSavedEvent,
      removeSavedEvent,
      refreshing,
      getAssetSource
    } = this.props;
    return (
      <View style={styles.container}>
        <FilterHeader
          onFilterCategoriesPress={this.handleFilterCategoriesPress}
          selectedCategories={this.props.selectedCategories}
          onFilterButtonPress={this.handleFilterButtonPress}
        />
        {this.props.loading || events.length < 1 ? (
          <NoEvents />
        ) : (
          <EventList
            locale={locale}
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

export { EventsScreen };
export default withNavigationFocus(EventsScreen);
