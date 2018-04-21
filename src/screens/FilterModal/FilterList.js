// @flow
import React, { Fragment } from "react";
import { StyleSheet } from "react-native";
import SectionHeader from "../../components/SectionHeader";
import ScreenSizeProvider from "../../components/ScreenSizeProvider";
import CheckBox from "../../components/CheckBox";
import { getContentPadding } from "../../components/ContentPadding";
import tags from "../../data/tags";
import type { FilterCollection } from "../../data/event-filters";
import text from "../../constants/text";

type Props = {
  eventFilters: FilterCollection,
  handleCheckboxChange: (sectionName: string, sectionValue: string) => void
};

const FilterList = ({ eventFilters, handleCheckboxChange }: Props) => (
  <Fragment>
    {Object.keys(tags).map(
      sectionName =>
        eventFilters[sectionName] && (
          <Fragment key={sectionName}>
            <SectionHeader
              title={text.tags[sectionName]}
              hasShadow={false}
              badgeValue={
                eventFilters[sectionName].size > 0
                  ? eventFilters[sectionName].size
                  : null
              }
            />
            <ScreenSizeProvider>
              {size =>
                tags[sectionName].map(sectionValue => (
                  <CheckBox
                    key={sectionValue}
                    onChange={() =>
                      handleCheckboxChange(sectionName, sectionValue)
                    }
                    checked={eventFilters[sectionName].has(sectionValue)}
                    // $FlowFixMe
                    label={text.tags[sectionValue] || sectionValue}
                    style={[getContentPadding(size), styles.checkbox]}
                  />
                ))
              }
            </ScreenSizeProvider>
          </Fragment>
        )
    )}
  </Fragment>
);

const styles = StyleSheet.create({
  checkbox: { paddingVertical: 16 }
});

export default FilterList;
