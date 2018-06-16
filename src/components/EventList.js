// @flow
import React, { Component } from "react";
import { LayoutAnimation, StyleSheet, SectionList, View } from "react-native";
import type { SectionBase } from "react-native/Libraries/Lists/SectionList";
import { difference, equals, flatten, without } from "ramda";
import ContentPadding from "./ContentPadding";
import EventCard from "./EventCard";
import SectionHeader from "./SectionHeader";
import { whiteColor } from "../constants/colors";
import type { SavedEvents, Event, EventDays } from "../data/event";
import {
  toLondonFormat as formatDate,
  FORMAT_WEEKDAY_DAY_MONTH,
  FORMAT_YEAR_MONTH_DAY
} from "../lib/date";

type Props = {
  events: EventDays,
  savedEvents: SavedEvents,
  addSavedEvent: string => void,
  removeSavedEvent: string => void,
  refreshing?: boolean,
  onRefresh?: () => void,
  onPress: (id: string) => void,
  testID?: string
};

type State = {
  eventIds: string[],
  eventsAdded: number,
  eventsRemoved: number,
  eventsReordered: boolean
};

type Section = SectionBase<Event> & { index: number };

type RenderItemInfo = {
  item: Event, // eslint-disable-line react/no-unused-prop-types
  index: number,
  section: Section
};

type RenderSectionInfo = {
  section: Section // eslint-disable-line react/no-unused-prop-types
};

const eventSections = (events: EventDays): Section[] =>
  events.map((it, index) => ({
    data: it,
    key: formatDate(it[0].fields.startTime, FORMAT_YEAR_MONTH_DAY),
    index
  }));

const getId = (item: { id: string }): string => item.id;

const eventIds = (events: EventDays): string[] =>
  flatten(events.map(day => day.map(getId)));

class EventList extends Component<Props, State> {
  static defaultProps = {
    refreshing: false,
    onRefresh: undefined,
    testID: undefined
  };

  state = {
    eventIds: [],
    eventsAdded: 0,
    eventsRemoved: 0,
    eventsReordered: false
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const ids = prevState.eventIds;
    const nextIds = eventIds(nextProps.events);

    const additions = difference(nextIds, ids);
    const removals = difference(ids, nextIds);
    const reordered = !equals(
      without(additions, nextIds),
      without(removals, ids)
    );

    return {
      eventIds: nextIds,
      eventsAdded: additions.length,
      eventsRemoved: removals.length,
      eventsReordered: reordered
    };
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const { refreshing, savedEvents } = this.props;
    const {
      refreshing: nextRefreshing,
      savedEvents: nextSavedEvents
    } = nextProps;

    return (
      nextState.eventsAdded > 0 ||
      nextState.eventsRemoved > 0 ||
      nextState.eventsReordered ||
      refreshing !== nextRefreshing ||
      savedEvents !== nextSavedEvents
    );
  }

  itemSeparator = () => <View style={styles.itemSeparator} />;

  sectionSeparator = () => <View style={styles.sectionSeparator} />;

  keyExtractor = getId;
  sectionList = null;

  renderItem = ({ item, index, section }: RenderItemInfo) => {
    const {
      savedEvents,
      addSavedEvent,
      removeSavedEvent,
      onPress
    } = this.props;

    return (
      <ContentPadding>
        <EventCard
          id={item.id}
          name={item.fields.name}
          locationName={item.fields.locationName}
          eventPriceLow={item.fields.eventPriceLow}
          eventPriceHigh={item.fields.eventPriceHigh}
          startTime={item.fields.startTime}
          endTime={item.fields.endTime}
          imageReference={item.fields.eventsListPicture}
          isSaved={savedEvents.has(item.id)}
          addSavedEvent={addSavedEvent}
          removeSavedEvent={removeSavedEvent}
          onPress={onPress}
          testID={`event-card-${index}-${section.index}`}
        />
      </ContentPadding>
    );
  };

  renderSectionHeader = ({ section }: RenderSectionInfo) => (
    <SectionHeader
      title={formatDate(
        section.data[0].fields.startTime,
        FORMAT_WEEKDAY_DAY_MONTH
      )}
    />
  );

  renderSectionFooter = () => <View style={styles.sectionFooter} />;

  render() {
    const { events, refreshing, onRefresh, testID } = this.props;

    // There is a bug in Android, which causes the app to crash when
    // too many list item changes are animated at the same time. To
    // prevent the error we only animate single item changes.
    const changes = this.state.eventsAdded + this.state.eventsRemoved;
    if (changes === 1 && !this.state.eventsReordered) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    return (
      <SectionList
        stickySectionHeadersEnabled
        sections={eventSections(events)}
        renderSectionHeader={this.renderSectionHeader}
        renderSectionFooter={this.renderSectionFooter}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={this.itemSeparator}
        SectionSeparatorComponent={this.sectionSeparator}
        refreshing={refreshing}
        onRefresh={onRefresh}
        windowSize={10}
        testID={testID}
        ref={sectionList => {
          this.sectionList = sectionList;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  itemSeparator: {
    height: 12
  },
  sectionSeparator: {
    height: 6
  },
  container: {
    paddingTop: 0,
    backgroundColor: whiteColor
  },
  sectionFooter: {
    height: 6
  }
});

export default EventList;
