// @flow
import parseDate from "date-fns/parse";
import React from "react";
import { View, StyleSheet } from "react-native";

import PerformanceItem from "./Performance";
import ContentPadding from "./ContentPadding";
import Collapsible from "./Collapsible";
import Text from "./Text";

import { getTimePeriod } from "../selectors/events";
import type { Performance, PerformancePeriods } from "../data/event";
import {
  eventCardTextColor,
  sectionHeaderShadow,
  sectionHeaderBgColor
} from "../constants/colors";
import text from "../constants/text";

type Props = {
  locale: string,
  performances: PerformancePeriods
};

const sections = (performances: PerformancePeriods, locale: string) =>
  performances.map((a: Performance[]) => ({
    data: a,
    title: getTimePeriod(parseDate(a[0].fields.startTime[locale]))
  }));

const PerformanceList = ({ performances, locale }: Props) => (
  <View>
    <ContentPadding>
      <Text
        type="h2"
        color="lightNavyBlueColor"
        style={styles.title}
        accessibilityTraits={["header"]}
      >
        {text.eventDetailsSchedule}
      </Text>
    </ContentPadding>
    <View>
      {sections(performances, locale).map(section => (
        <View key={section.title}>
          <ContentPadding style={styles.sectionHeader}>
            <Text type="h3" style={styles.sectionHeaderText}>
              {section.title}
            </Text>
          </ContentPadding>
          <ContentPadding style={styles.section}>
            <Collapsible>
              {section.data.map(item => (
                <PerformanceItem
                  key={item.fields.startTime[locale]}
                  startTime={item.fields.startTime[locale]}
                  title={item.fields.title[locale]}
                />
              ))}
            </Collapsible>
          </ContentPadding>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  title: {
    marginBottom: 8
  },
  sectionHeader: {
    height: 40,
    justifyContent: "center",
    backgroundColor: sectionHeaderBgColor,
    paddingTop: 8,

    // The below properties are required for ioS shadow
    shadowColor: sectionHeaderShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    // The below properties are required for android shadow
    borderWidth: 0,
    elevation: 3
  },
  sectionHeaderText: {
    color: eventCardTextColor
  },
  section: {
    marginBottom: 20
  }
});

export default PerformanceList;
