// @flow
import React, { Fragment } from "react";
import { StyleSheet } from "react-native";
import CheckBox from "../../components/CheckBox";
import { getContentPadding } from "../../components/ContentPadding";
import tags from "../../data/tags";
import text from "../../constants/text";
import type { ScreenSize } from "../../components/ScreenSizeProvider";
import type { TagFilterSet } from "../../data/event-filters";

type Props = {
  sectionName: string,
  handleCheckboxChange: (sectionName: string, sectionValue: string) => void,
  sectionFilters: TagFilterSet,
  size: ScreenSize
};

const FilterList = ({
  sectionName,
  handleCheckboxChange,
  sectionFilters,
  size
}: Props) => (
  <Fragment>
    {tags[sectionName].map(sectionValue => (
      <CheckBox
        key={sectionValue}
        onChange={() => handleCheckboxChange(sectionName, sectionValue)}
        checked={sectionFilters.has(sectionValue)}
        label={text.tags[sectionValue] || sectionValue}
        style={[getContentPadding(size), styles.checkbox]}
      />
    ))}
  </Fragment>
);

const styles = StyleSheet.create({
  checkbox: { paddingVertical: 16 }
});

export default FilterList;
