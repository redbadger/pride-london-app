// @flow
import React, { Component } from "react";
import { LayoutAnimation, StyleSheet, SectionList, View } from "react-native";
import type { SectionBase } from "react-native/Libraries/Lists/SectionList";
import { difference, equals, flatten, without } from "ramda";
import ContentPadding from "./ContentPadding";
import EventCard from "./EventCard";
import SectionHeader from "./SectionHeader";
import { whiteColor } from "../constants/colors";
import type { SavedEvents, Event, EventDays } from "../data/event-deprecated";
import {
  toFormat as formatDate,
  FORMAT_WEEKDAY_DAY_MONTH,
  FORMAT_YEAR_MONTH_DAY
} from "../lib/date";

type Props = {
  locale: string,
  events: EventDays,
  savedEvents: SavedEvents,
  addSavedEvent: string => void,
  removeSavedEvent: string => void,
  refreshing?: boolean,
  onRefresh?: () => void,
  onPress: (id: string) => void
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

const eventSections = (
  events: EventDays,
  locale: string
): Section[] =>
  events.map((it, index) => ({
    data: it,
    key: formatDate(it[0].fields.startTime[locale], FORMAT_YEAR_MONTH_DAY),
    index
  }));

const eventIds = (events: EventDays): string[] =>
  flatten(events.map(day => day.map(e => e.sys.id)));

class EventList extends Component<Props, State> {
  static defaultProps = {
    refreshing: false,
    onRefresh: undefined
  };

  // react/sort-comp doesn't support class properties: https://github.com/yannickcr/eslint-plugin-react/issues/1342
  // react/no-unused-state doesn't acknowledge usage of state in getDerivedStateFromProps: https://github.com/yannickcr/eslint-plugin-react/issues/1759

  state = { // eslint-disable-line react/sort-comp
    eventIds: [], // eslint-disable-line react/no-unused-state
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
    const { locale, refreshing, savedEvents } = this.props;
    const {
      locale: nextLocale,
      refreshing: nextRefreshing,
      savedEvents: nextSavedEvents
    } = nextProps;

    return (
      nextState.eventsAdded > 0 ||
      nextState.eventsRemoved > 0 ||
      nextState.eventsReordered ||
      locale !== nextLocale ||
      refreshing !== nextRefreshing ||
      savedEvents !== nextSavedEvents
    );
  }

  itemSeparator = () => <View style={styles.itemSeparator} />;

  sectionSeparator = () => <View style={styles.sectionSeparator} />;

  keyExtractor = (event: Event) => event.sys.id;

  renderItem = ({ item, index, section }: RenderItemInfo) => {
    const {
      savedEvents,
      addSavedEvent,
      removeSavedEvent,
      locale,
      onPress
    } = this.props;

    return (
      <ContentPadding>
        <EventCard
          id={item.sys.id}
          name={item.fields.name[locale]}
          locationName={item.fields.locationName[locale]}
          eventPriceLow={item.fields.eventPriceLow[locale]}
          eventPriceHigh={item.fields.eventPriceHigh[locale]}
          startTime={item.fields.startTime[locale]}
          endTime={item.fields.endTime[locale]}
          imageReference={item.fields.eventsListPicture[locale]}
          isSaved={savedEvents.has(item.sys.id)}
          addSavedEvent={addSavedEvent}
          removeSavedEvent={removeSavedEvent}
          onPress={onPress}
          testID={`event-card-${index}-${section.index}`}
        />
      </ContentPadding>
    );
  };

  renderSectionHeader = ({ section }: RenderSectionInfo) => {
    const { locale } = this.props;

    return (
      <SectionHeader
        title={formatDate(
          section.data[0].fields.startTime[locale],
          FORMAT_WEEKDAY_DAY_MONTH
        )}
      />
    );
  };

  renderSectionFooter = () => <View style={styles.sectionFooter} />;

  render() {
    const { events, locale, refreshing, onRefresh } = this.props;

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
        sections={eventSections(events, locale)}
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
