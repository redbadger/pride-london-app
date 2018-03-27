// @flow
import React from "react";
import { StyleSheet, SectionList, TouchableOpacity, View } from "react-native";
import type { SectionBase } from "react-native/Libraries/Lists/SectionList";
import formatDate from "date-fns/format";

import ContentPadding from "./ContentPadding";
import Text from "./Text";
import type { Category, LocalizedFieldRef } from "../data/event";
import { filterBgColor } from "../constants/colors";

type Props = {
  locale: string,
  events: EventDays,
  refreshing?: boolean,
  onRefresh?: () => void,
  onPress: (eventName: string) => void,
  getAssetUrl: LocalizedFieldRef => string
};

const separator = style => () => <View style={style} />;

type ItemProps = { item: Event };
const renderItem = (styles, locale, onPress, getAssetUrl) => ({
  item: event
}: ItemProps) => (
  <ContentPadding>
    <TouchableOpacity
      style={styles.eventListItem}
      accessibilityTraits={["button"]}
      accessibilityComponentType="button"
      delayPressIn={50}
      onPress={() => onPress(event.sys.id)}
    />
  </ContentPadding>
);

type Section = SectionBase<Category> & { title: string };

// type SectionProps = { section: Section };
// const renderSectionHeader = styles => ({ section }: SectionProps) => (
//   <ContentPadding style={styles.sectionHeader}>
//     <Text type="h2" style={styles.sectionHeaderText}>
//       {section.title}
//     </Text>
//   </ContentPadding>
// );

// const eventSections = (events: EventDays, locale: string): Section[] =>
//   events.map(it => ({
//     data: it,
//     title: formatDate(it[0].fields.startTime[locale], "dddd D MMMM")
//   }));

const categorySections = (categories: Category, locale: string): Section[] =>
  events.map(it => ({
    data: it,
    title: formatDate(it[0].fields.startTime[locale], "dddd D MMMM")
  }));

const EventList = ({
  events,
  locale,
  refreshing,
  onRefresh,
  onPress,
  getAssetUrl
}: Props) => (
  <SectionList
    // stickySectionHeadersEnabled
    sections={eventSections(events, locale)}
    // renderSectionHeader={renderSectionHeader(styles)}
    // renderSectionFooter={separator(styles.sectionFooter)}
    renderItem={renderItem(styles, locale, onPress, getAssetUrl)}
    keyExtractor={event => event.sys.id}
    contentContainerStyle={styles.container}
    ItemSeparatorComponent={separator(styles.itemSeparator)}
    SectionSeparatorComponent={separator(styles.sectionSeparator)}
    refreshing={refreshing}
    onRefresh={onRefresh}
  />
);

EventList.defaultProps = {
  refreshing: false,
  onRefresh: undefined
};

const styles = StyleSheet.create({
  itemSeparator: {
    height: 12
  },
  sectionSeparator: {
    height: 6
  },
  container: {
    // paddingTop: 0,
    backgroundColor: filterBgColor
  },
  eventListItem: {
    // borderRadius: 5
    // // The below properties are required for ioS shadow
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 1,
    // shadowRadius: 3,
    // // The below properties are required for android shadow
    // borderWidth: 0,
    // elevation: 3,
    // backgroundColor: bgColor
  }
  //   sectionHeader: {
  //     height: 40,
  //     justifyContent: "center"
  //   },
  //   sectionHeaderText: {},
  //   sectionFooter: {
  //     height: 6
  //   }
});

export default EventList;
