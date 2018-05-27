// @flow
import React, { Component } from "react";
import { FlatList, LayoutAnimation, StyleSheet, View } from "react-native";
import { equals, flatten } from "ramda";
import ContentPadding from "./ContentPadding";
import EventCard from "./EventCard";
import SectionHeader from "./SectionHeader";
import { whiteColor } from "../constants/colors";
import type { SavedEvents, Event, EventDays } from "../data/event";
import { toFormat as formatDate, FORMAT_WEEKDAY_DAY_MONTH } from "../lib/date";
import type { FieldRef } from "../data/field-ref";
import type { ImageSource } from "../data/get-asset-source";

type Props = {
  locale: string,
  events: EventDays,
  savedEvents: SavedEvents,
  addSavedEvent: string => void,
  removeSavedEvent: string => void,
  refreshing?: boolean,
  onRefresh?: () => void,
  onPress: (id: string) => void,
  getAssetSource: FieldRef => ImageSource
};

type Header = {
  title: string
};
type HeaderItem = {
  id: string,
  type: "header",
  header: Header
};
type EventItem = {
  id: string,
  type: "event",
  event: Event
};
type Item = HeaderItem | EventItem;
type RenderItemInfo = {
  item: Item // eslint-disable-line react/no-unused-prop-types
};

const eventIds = (events: EventDays): string[] =>
  flatten(events.map(day => day.map(e => e.sys.id)));

class EventList extends Component<Props> {
  static defaultProps = {
    refreshing: false,
    onRefresh: undefined
  };

  shouldComponentUpdate(nextProps: Props) {
    const { locale, refreshing, savedEvents } = this.props;
    const {
      locale: nextLocale,
      refreshing: nextRefreshing,
      savedEvents: nextSavedEvents
    } = nextProps;

    const ids = eventIds(this.props.events);
    const nextIds = eventIds(nextProps.events);

    return (
      !equals(ids, nextIds) ||
      locale !== nextLocale ||
      refreshing !== nextRefreshing ||
      savedEvents !== nextSavedEvents
    );
  }

  componentWillUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  keyExtractor = (item: Item) => item.id;

  renderItem = ({ item }: RenderItemInfo) => {
    const {
      savedEvents,
      addSavedEvent,
      removeSavedEvent,
      locale,
      onPress,
      getAssetSource
    } = this.props;

    if (item.type === "event") {
      return (
        <ContentPadding style={styles.eventItem}>
          <EventCard
            id={item.event.sys.id}
            name={item.event.fields.name[locale]}
            locationName={item.event.fields.locationName[locale]}
            eventPriceLow={item.event.fields.eventPriceLow[locale]}
            eventPriceHigh={item.event.fields.eventPriceHigh[locale]}
            startTime={item.event.fields.startTime[locale]}
            endTime={item.event.fields.endTime[locale]}
            image={getAssetSource(item.event.fields.eventsListPicture[locale])}
            isSaved={savedEvents.has(item.event.sys.id)}
            addSavedEvent={addSavedEvent}
            removeSavedEvent={removeSavedEvent}
            onPress={onPress}
          />
        </ContentPadding>
      );
    }

    return (
      <View style={styles.headerItem}>
        <SectionHeader title={item.header.title} />
      </View>
    );
  };

  render() {
    const { events, locale, refreshing, onRefresh } = this.props;

    const items: Item[] = [];
    const stickyHeaderIndices: number[] = [];

    events.forEach(day => {
      const header: Header = {
        title: formatDate(
          day[0].fields.startTime[locale],
          FORMAT_WEEKDAY_DAY_MONTH
        )
      };
      const headerItem: HeaderItem = {
        id: `header-${header.title}`,
        type: "header",
        header
      };
      stickyHeaderIndices.push(items.length);
      items.push(headerItem);
      items.push(
        ...day.map(event => ({
          id: `event-${event.sys.id}`,
          type: "event",
          event
        }))
      );
    });

    return (
      <FlatList
        stickySectionHeadersEnabled
        stickyHeaderIndices={stickyHeaderIndices}
        data={items}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        contentContainerStyle={styles.container}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    backgroundColor: whiteColor
  },
  headerItem: {
    marginBottom: 6
  },
  eventItem: {
    marginBottom: 12
  }
});

export default EventList;
