// @flow
import React, { PureComponent, Fragment } from "react";
import { View, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import type { NavigationScreenProp } from "react-navigation";
import ShadowedScrollView from "../../components/ShadowedScrollView";
import Button from "../../components/ButtonPrimary";
import ContentPadding, {
  getContentPadding
} from "../../components/ContentPadding";
import SectionHeader from "../../components/SectionHeader";
import CheckBox from "../../components/CheckBox";
import ScreenSizeProvider from "../../components/ScreenSizeProvider";
import { bgColor } from "../../constants/colors";
import tags from "../../data/tags";
import text from "../../constants/text";
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

  toggleTagFilter = (
    selectedValues: Set<string> | Set<Area>,
    sectionValue: string
  ) => {
    const values: Set<string> = new Set([...selectedValues]);
    if (!values.delete(sectionValue)) {
      values.add(sectionValue);
    }
    return values;
  };

  clearTagFilters = () =>
    this.props.onChange(
      Object.keys(tags).reduce((acc, key) => ({ ...acc, [key]: new Set() }), {})
    );

  render() {
    const {
      applyButtonText,
      onApply,
      onChange,
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
        <ShadowedScrollView style={styles.flex} shadowOpacity={0.4}>
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
                          onChange={() => {
                            onChange({
                              [sectionName]: this.toggleTagFilter(
                                eventFilters[sectionName],
                                sectionValue
                              )
                            });
                          }}
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
        </ShadowedScrollView>
        <View style={styles.footer}>
          <ContentPadding>
            <Button
              onPress={() => {
                onApply();
                navigation.goBack();
              }}
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
  },
  checkbox: { paddingVertical: 16 }
});

export default FilterModal;
