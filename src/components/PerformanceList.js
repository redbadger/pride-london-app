// @flow
import React from "react";
import { View, StyleSheet } from "react-native";

import PerformanceItem from "./Performance";
import ContentPadding from "./ContentPadding";
import Collapsible from "./Collapsible";
import LayoutColumn from "./LayoutColumn";
import Text from "./Text";
import SectionDivider from "./SectionDivider";

import { getTimePeriod } from "../selectors/events";
import type { Performance, PerformancePeriods } from "../data/event";
import { sectionHeaderShadow, sectionHeaderBgColor } from "../constants/colors";
import text from "../constants/text";

type Props = {
  locale: string,
  performances: PerformancePeriods
};

const sections = (performances: PerformancePeriods, locale: string) =>
  performances.map((a: Performance[]) => ({
    data: a,
    title: getTimePeriod(a[0].fields.startTime[locale])
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
    <LayoutColumn spacing={20}>
      {sections(performances, locale).map(section => (
        <View key={section.title}>
          <ContentPadding style={styles.sectionHeader}>
            <Text type="h3" color="lightNavyBlueColor">
              {section.title}
            </Text>
          </ContentPadding>
          <ContentPadding>
            <Collapsible>
              {section.data.map((item, i, all) => (
                <View key={item.fields.startTime[locale]}>
                  <PerformanceItem
                    startTime={item.fields.startTime[locale]}
                    title={item.fields.title[locale]}
                  />
                  {i !== all.length - 1 && <SectionDivider />}
                </View>
              ))}
            </Collapsible>
          </ContentPadding>
        </View>
      ))}
    </LayoutColumn>
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
  }
});

export default PerformanceList;
