// @flow
import React, { Component } from "react";
import { LayoutAnimation, StyleSheet, FlatList, View } from "react-native";
import formatDate from "date-fns/format";
import { concat, equals } from "ramda";
import ContentPadding from "./ContentPadding";
import EventCard from "./EventCard";
import SectionHeader from "./SectionHeader";
import { whiteColor } from "../constants/colors";
import type { SavedEvents, Event, EventDays } from "../data/event";
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

type ItemProps = {
  item: {
    id: string,
    event?: Event,
    header?: {
      title: string
    }
  }
};

type RenderItemArgs = {
  isSavedEvent: string => boolean,
  addSavedEvent: string => void,
  removeSavedEvent: string => void,
  locale: string,
  onPress: (eventName: string) => void,
  getAssetSource: FieldRef => ImageSource
};

export const renderItem = ({
  isSavedEvent,
  addSavedEvent,
  removeSavedEvent,
  locale,
  onPress,
  getAssetSource
}: RenderItemArgs) => ({ item }: ItemProps) =>
  item.event ? (
    <View>
      <ContentPadding>
        <EventCard
          id={item.event.sys.id}
          name={item.event.fields.name[locale]}
          locationName={item.event.fields.locationName[locale]}
          eventPriceLow={item.event.fields.eventPriceLow[locale]}
          eventPriceHigh={item.event.fields.eventPriceHigh[locale]}
          startTime={item.event.fields.startTime[locale]}
          endTime={item.event.fields.endTime[locale]}
          image={getAssetSource(item.event.fields.eventsListPicture[locale])}
          isSaved={
            item.event && item.event.sys && isSavedEvent(item.event.sys.id)
          }
          addSavedEvent={addSavedEvent}
          removeSavedEvent={removeSavedEvent}
          onPress={onPress}
        />
      </ContentPadding>
      <View style={styles.itemSeparator} />
    </View>
  ) : (
    <View>
      <SectionHeader title={item.header ? item.header.title : ""} />
      <View style={styles.sectionFooter} />
    </View>
  );

const eventIds = (events: EventDays): string[] =>
  events.map(day => day.map(e => e.sys.id)).reduce(concat, []);

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

  render() {
    const {
      events,
      savedEvents,
      addSavedEvent,
      removeSavedEvent,
      locale,
      refreshing,
      onRefresh,
      onPress,
      getAssetSource
    } = this.props;

    const isSavedEvent = id => savedEvents.has(id);
    const items = [];
    const stickyHeaderIndices = [];
    events.forEach(day => {
      const headerTitle = formatDate(
        day[0].fields.startTime[locale],
        "dddd D MMMM"
      );
      stickyHeaderIndices.push(items.length);
      items.push({
        id: `header-${headerTitle}`,
        header: {
          title: headerTitle
        }
      });

      items.push(
        ...day.map(event => ({
          id: `event-${event.sys.id}`,
          event
        }))
      );
    });

    return (
      <FlatList
        stickySectionHeadersEnabled
        stickyHeaderIndices={stickyHeaderIndices}
        data={items}
        renderItem={renderItem({
          isSavedEvent,
          addSavedEvent,
          removeSavedEvent,
          locale,
          onPress,
          getAssetSource
        })}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    );
  }
}

const styles = StyleSheet.create({
  itemSeparator: {
    height: 12
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
