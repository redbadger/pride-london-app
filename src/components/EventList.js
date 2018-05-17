// @flow
import React, { Component } from "react";
import { StyleSheet, SectionList, View } from "react-native";
import type { SectionBase } from "react-native/Libraries/Lists/SectionList";
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

const separator = style => () => <View style={style} />;

type ItemProps = { item: Event };

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
}: RenderItemArgs) => ({ item }: ItemProps) => (
  <ContentPadding>
    <EventCard
      id={item.sys.id}
      name={item.fields.name[locale]}
      locationName={item.fields.locationName[locale]}
      eventPriceLow={item.fields.eventPriceLow[locale]}
      eventPriceHigh={item.fields.eventPriceHigh[locale]}
      startTime={item.fields.startTime[locale]}
      endTime={item.fields.endTime[locale]}
      image={getAssetSource(item.fields.eventsListPicture[locale])}
      isSaved={isSavedEvent(item.sys.id)}
      addSavedEvent={addSavedEvent}
      removeSavedEvent={removeSavedEvent}
      onPress={onPress}
    />
  </ContentPadding>
);

type Section = SectionBase<Event> & { title: string };

type SectionProps = { section: Section };
const renderSectionHeader = ({ section }: SectionProps) => (
  <SectionHeader title={section.title} />
);

const eventSections = (events: EventDays, locale: string): Section[] =>
  events.map(it => ({
    data: it,
    title: formatDate(it[0].fields.startTime[locale], "dddd D MMMM")
  }));

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

    return (
      <SectionList
        stickySectionHeadersEnabled
        sections={eventSections(events, locale)}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={separator(styles.sectionFooter)}
        renderItem={renderItem({
          isSavedEvent,
          addSavedEvent,
          removeSavedEvent,
          locale,
          onPress,
          getAssetSource
        })}
        keyExtractor={event => event.sys.id}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={separator(styles.itemSeparator)}
        SectionSeparatorComponent={separator(styles.sectionSeparator)}
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
