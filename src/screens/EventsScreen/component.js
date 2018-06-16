// @flow
import React, { Component } from "react";
import type { ElementRef } from "react";
import { StyleSheet, View } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type {
  EventCategoryName,
  SavedEvents,
  EventDays
} from "../../data/event";
import EventList from "../../components/EventList";
import FilterHeader from "./FilterHeaderConnected";
import NoEvents from "./NoEvents";
import { bgColor } from "../../constants/colors";
import {
  EVENT_DETAILS,
  EVENT_ATTRIBUTE_FILTER,
  EVENT_CATEGORIES_FILTER,
  EVENT_DATE_FILTER
} from "../../constants/routes";

export type Props = {
  events: EventDays,
  savedEvents: SavedEvents,
  addSavedEvent: string => void,
  removeSavedEvent: string => void,
  loading: boolean,
  refreshing: boolean,
  updateData: () => Promise<void>,
  selectedCategories: Set<EventCategoryName>,
  navigation: NavigationScreenProp<NavigationState>
};

const DEFAULT_SEPARATOR_HEIGHT: number = 40;

class EventsScreen extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    // Intentionally do not check this.props.navigation
    return (
      nextProps.events !== this.props.events ||
      nextProps.savedEvents !== this.props.savedEvents ||
      nextProps.addSavedEvent !== this.props.addSavedEvent ||
      nextProps.removeSavedEvent !== this.props.removeSavedEvent ||
      nextProps.loading !== this.props.loading ||
      nextProps.refreshing !== this.props.refreshing ||
      nextProps.updateData !== this.props.updateData ||
      nextProps.selectedCategories !== this.props.selectedCategories
    );
  }

  handleFilterCategoriesPress = () => {
    this.props.navigation.navigate(EVENT_CATEGORIES_FILTER);
  };

  handleFilterButtonPress = () => {
    this.props.navigation.navigate(EVENT_ATTRIBUTE_FILTER);
  };

  handleDateFilterButtonPress = () => {
    this.props.navigation.navigate(EVENT_DATE_FILTER);
  };

  scrollEventListToTop = () => {
    const eventList = this.eventListRef.current;
    if (eventList && eventList.sectionList) {
      eventList.sectionList.scrollToLocation({
        itemIndex: 0,
        sectionIndex: 0,
        viewOffset: DEFAULT_SEPARATOR_HEIGHT,
        viewPosition: 0,
        animated: false
      });
    }
  };

  // $FlowFixMe
  eventListRef: ElementRef<typeof EventList> = React.createRef();

  render() {
    const {
      navigation,
      updateData,
      events,
      savedEvents,
      addSavedEvent,
      removeSavedEvent,
      refreshing
    } = this.props;
    return (
      <View style={styles.container}>
        <FilterHeader
          onFilterCategoriesPress={this.handleFilterCategoriesPress}
          selectedCategories={this.props.selectedCategories}
          onFilterButtonPress={this.handleFilterButtonPress}
          onDateFilterButtonPress={this.handleDateFilterButtonPress}
          scrollEventListToTop={this.scrollEventListToTop}
        />
        {this.props.loading || events.length < 1 ? (
          <NoEvents />
        ) : (
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
            ref={this.eventListRef}
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
