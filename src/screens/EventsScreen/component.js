// @flow
/* eslint react-native/no-inline-styles:0 */
import React, { Component } from "react";
import { StyleSheet, Animated, View } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { ViewLayoutEvent } from "react-native/Libraries/Components/View/ViewPropTypes";
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
  updateData: () => Promise<void>,
  selectedCategories: Set<EventCategoryName>,
  navigation: NavigationScreenProp<NavigationState>
};

class EventsScreen extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.eventListScrollValue = new Animated.Value(0);
    this.filterHeaderHeight = 10;
    this.clampedScrollValue = Animated.diffClamp(
      this.eventListScrollValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp"
      }),
      0,
      this.filterHeaderHeight
    );

    this.headerTranslate = this.clampedScrollValue.interpolate({
      inputRange: [0, this.filterHeaderHeight],
      outputRange: [0, -this.filterHeaderHeight],
      extrapolate: "clamp"
    });
  }

  shouldComponentUpdate(nextProps: Props) {
    // Intentionally do not check this.props.navigation
    return (
      nextProps.events !== this.props.events ||
      nextProps.savedEvents !== this.props.savedEvents ||
      nextProps.addSavedEvent !== this.props.addSavedEvent ||
      nextProps.removeSavedEvent !== this.props.removeSavedEvent ||
      nextProps.loading !== this.props.loading ||
      nextProps.updateData !== this.props.updateData ||
      nextProps.selectedCategories !== this.props.selectedCategories
    );
  }

  setFilterHeaderHeight = (e: ViewLayoutEvent) => {
    const { height } = e.nativeEvent.layout;
    this.filterHeaderHeight = height;
    this.clampedScrollValue = Animated.diffClamp(
      this.eventListScrollValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp"
      }),
      0,
      this.filterHeaderHeight
    );

    this.headerTranslate = this.clampedScrollValue.interpolate({
      inputRange: [0, this.filterHeaderHeight],
      outputRange: [0, -this.filterHeaderHeight],
      extrapolate: "clamp"
    });
  };

  handleFilterCategoriesPress = () => {
    this.props.navigation.navigate(EVENT_CATEGORIES_FILTER);
  };

  handleFilterButtonPress = () => {
    this.props.navigation.navigate(EVENT_ATTRIBUTE_FILTER);
  };

  handleDateFilterButtonPress = () => {
    this.props.navigation.navigate(EVENT_DATE_FILTER);
  };

  headerTranslate: number;
  filterHeaderHeight: number;
  eventListScrollValue: Animated.Value;
  clampedScrollValue: any;

  render() {
    const {
      navigation,
      updateData,
      events,
      savedEvents,
      addSavedEvent,
      removeSavedEvent
    } = this.props;

    console.log(render);

    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY: this.headerTranslate }],
            marginBottom: -this.filterHeaderHeight
          }
        ]}
      >
        <View onLayout={this.setFilterHeaderHeight}>
          <FilterHeader
            onFilterCategoriesPress={this.handleFilterCategoriesPress}
            selectedCategories={this.props.selectedCategories}
            onFilterButtonPress={this.handleFilterButtonPress}
            onDateFilterButtonPress={this.handleDateFilterButtonPress}
          />
        </View>
        {this.props.loading || events.length < 1 ? (
          <NoEvents />
        ) : (
          <EventList
            events={events}
            savedEvents={savedEvents}
            addSavedEvent={addSavedEvent}
            removeSavedEvent={removeSavedEvent}
            onRefresh={() => {
              updateData();
            }}
            onPress={(eventId: string) => {
              navigation.navigate(EVENT_DETAILS, { eventId });
            }}
            scrollEventThrottle={1}
            filterHeaderHeight={this.filterHeaderHeight}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { y: this.eventListScrollValue }
                  }
                }
              ],
              { useNativeDriver: true }
            )}
          />
        )}
      </Animated.View>
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
