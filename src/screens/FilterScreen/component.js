// @flow
import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import ShadowedScrollView from "../../components/ShadowedScrollView";
import Button from "../../components/ButtonPrimary";
import ContentPadding from "../../components/ContentPadding";
import FilterSectionList from "./FilterSectionList";
import { bgColor } from "../../constants/colors";
import type { FilterCollection, Area } from "../../data/event-filters";
import Header from "./Header";
import type { EventFiltersPayload } from "../../actions/event-filters";
import text from "../../constants/text";

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  eventFilters: FilterCollection,
  numberOfEvents: number,
  numTagFiltersSelected: number,
  onChange: EventFiltersPayload => void
};

const toggleTagFilter = (
  selectedValues: Set<string> | Set<Area>,
  sectionValue: string
) => {
  const values: Set<string> = new Set([...selectedValues]);
  if (!values.delete(sectionValue)) {
    values.add(sectionValue);
  }
  return values;
};

const emptyFilters: EventFiltersPayload = {
  timeOfDay: new Set(),
  area: new Set(),
  price: new Set(),
  audience: new Set(),
  venueDetails: new Set(),
  accessibilityOptions: new Set()
};

class FilterScreen extends PureComponent<Props> {
  clearTagFilters = () => this.props.onChange(emptyFilters);

  handleCheckboxChange = (sectionName: string, sectionValue: string) => {
    this.props.onChange({
      [sectionName]: toggleTagFilter(
        this.props.eventFilters[sectionName],
        sectionValue
      )
    });
  };

  handleApplyButtonPress = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { eventFilters, numberOfEvents, numTagFiltersSelected } = this.props;
    return (
      <SafeAreaView
        style={styles.flex}
        forceInset={{ bottom: "always", top: "never" }}
      >
        <Header
          onClearPress={this.clearTagFilters}
          onBackPress={this.handleApplyButtonPress}
          showClear={numTagFiltersSelected > 0}
        />
        <ShadowedScrollView style={styles.flex} shadowOpacity={0.6}>
          <FilterSectionList
            eventFilters={eventFilters}
            handleCheckboxChange={this.handleCheckboxChange}
          />
        </ShadowedScrollView>
        <View style={styles.footer}>
          <ContentPadding>
            <Button
              onPress={this.handleApplyButtonPress}
              disabled={numberOfEvents <= 0}
              accessibilityLabel={text.filterPickerApplyLabel(numberOfEvents)}
              testID="apply-area-and-price-filter-button"
            >
              {text.filterPickerApply(numberOfEvents)}
            </Button>
          </ContentPadding>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: bgColor
  },
  footer: {
    paddingVertical: 12,
    backgroundColor: bgColor
  }
});

export default FilterScreen;
