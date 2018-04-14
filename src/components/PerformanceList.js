// @flow
import parseDate from "date-fns/parse";
import React from "react";
import { View, SectionList, StyleSheet, Text } from "react-native";
import type { SectionBase } from "react-native/Libraries/Lists/SectionList";

import PerformanceItem from "./Performance";
import ContentPadding from "./ContentPadding";

import { getTimePeriod } from "../selectors/events";
import type { Performance, PerformancePeriods } from "../data/event";
import {
  bgColor,
  eventCardTextColor,
  sectionHeaderShadow,
  sectionHeaderBgColor,
  eventCardShadow
} from "../constants/colors";

type Section = SectionBase<Performance> & { title: string };

type SectionProps = { section: Section };
const sectionHeader = styles => ({ section }: SectionProps) => (
  <ContentPadding style={styles.sectionHeader}>
    <Text type="h2" style={styles.sectionHeaderText}>
      {section.title}
    </Text>
  </ContentPadding>
);

type Props = {
  locale: string,
  performances: PerformancePeriods
};

const separator = style => () => <View style={style} />;

const sections = (
  performances: PerformancePeriods,
  locale: string
): Section[] =>
  performances.map((a: Performance[]) => ({
    data: a,
    title: getTimePeriod(parseDate(a[0].fields.startTime[locale]))
  }));

const PerformanceList = ({ performances, locale }: Props) => (
  <SectionList
    sections={sections(performances, locale)}
    renderSectionHeader={sectionHeader(styles)}
    renderSectionFooter={separator(styles.sectionFooter)}
    renderItem={({ item, index }) => (
      <PerformanceItem
        style={styles.item}
        key={index}
        startTime={item.startTime}
        title={item.title}
      >
        {item}
      </PerformanceItem>
    )}
    keyExtractor={performance => performance.sys.id}
    contentContainerStyle={styles.container}
    ItemSeparatorComponent={separator(styles.itemSeparator)}
    SectionSeparatorComponent={separator(styles.sectionSeparator)}
  />
);

const styles = StyleSheet.create({
  itemSeparator: {
    height: 12
  },
  sectionSeparator: {
    height: 6
  },
  container: {
    paddingTop: 0,
    backgroundColor: bgColor
  },
  item: {
    borderRadius: 5,
    // The below properties are required for ioS shadow
    shadowColor: eventCardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    // The below properties are required for android shadow
    borderWidth: 0,
    elevation: 3,
    backgroundColor: bgColor
  },
  sectionHeader: {
    height: 40,
    justifyContent: "center",
    backgroundColor: sectionHeaderBgColor,

    // The below properties are required for ioS shadow
    shadowColor: sectionHeaderShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    // The below properties are required for android shadow
    borderWidth: 0,
    elevation: 3,
    marginBottom: 6
  },
  sectionHeaderText: {
    color: eventCardTextColor
  },
  sectionFooter: {
    height: 6
  }
});

export default PerformanceList;
