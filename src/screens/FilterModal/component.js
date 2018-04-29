// @flow
import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import type { NavigationScreenProp } from "react-navigation";
import ShadowedScrollView from "../../components/ShadowedScrollView";
import Button from "../../components/ButtonPrimary";
import ContentPadding from "../../components/ContentPadding";
import FilterSectionList from "./FilterSectionList";
import { bgColor } from "../../constants/colors";
import tags from "../../data/tags";
import type { FilterCollection, Area } from "../../data/event-filters";
import Header from "./Header";

export type TagFilter = { [string]: Set<string> };

type Props = {
  navigation: NavigationScreenProp<{}>,
  applyButtonText: string,
  eventFilters: FilterCollection,
  numEventsSelected: number,
  numTagFiltersSelected: number,
  onChange: TagFilter => void,
  onApply: () => void,
  onCancel: () => void
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

class FilterModal extends PureComponent<Props> {
  componentDidMount() {
    const { navigation, onCancel } = this.props;
    this.didBlurSubscription = navigation.addListener("willBlur", onCancel);
  }

  componentWillUnmount() {
    this.didBlurSubscription.remove();
  }

  didBlurSubscription: {
    remove: () => void
  };

  clearTagFilters = () =>
    this.props.onChange(
      Object.keys(tags).reduce((acc, key) => ({ ...acc, [key]: new Set() }), {})
    );

  handleCheckboxChange = (sectionName: string, sectionValue: string) => {
    this.props.onChange({
      [sectionName]: toggleTagFilter(
        this.props.eventFilters[sectionName],
        sectionValue
      )
    });
  };

  handleApplyButtonPress = () => {
    this.props.onApply();
    this.props.navigation.goBack();
  };

  render() {
    const {
      applyButtonText,
      eventFilters,
      navigation,
      numEventsSelected,
      numTagFiltersSelected
    } = this.props;
    return (
      <SafeAreaView
        style={styles.flex}
        forceInset={{ bottom: "always", top: "never" }}
      >
        <Header
          onClearPress={this.clearTagFilters}
          onCancelPress={() => navigation.goBack()}
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
              disabled={numEventsSelected === 0}
            >
              {applyButtonText}
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

export default FilterModal;
