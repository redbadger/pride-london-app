// @flow
import React, { Fragment } from "react";
import SectionHeader from "../../components/SectionHeader";
import ScreenSizeProvider from "../../components/ScreenSizeProvider";
import FilterList from "./FilterList";
import tags from "../../data/tags";
import type { FilterCollection } from "../../data/event-filters";
import text from "../../constants/text";

type Props = {
  eventFilters: FilterCollection,
  handleCheckboxChange: (sectionName: string, sectionValue: string) => void
};

const FilterSectionList = ({ eventFilters, handleCheckboxChange }: Props) => (
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
              {size => (
                <FilterList
                  sectionName={sectionName}
                  sectionFilters={eventFilters[sectionName]}
                  size={size}
                  handleCheckboxChange={handleCheckboxChange}
                />
              )}
            </ScreenSizeProvider>
          </Fragment>
        )
    )}
  </Fragment>
);

export default FilterSectionList;
