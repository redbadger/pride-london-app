// @flow
import React, { PureComponent, Fragment } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import type { NavigationScreenProp } from "react-navigation";
import Button from "../../components/Button";
import Touchable from "../../components/Touchable";
import ContentPadding, {
  calculateHorizontalPadding
} from "../../components/ContentPadding";
import SectionHeader from "../../components/SectionHeader";
import CheckBox from "../../components/CheckBox";
import {
  interestButtonTextColor,
  filterBgColor,
  bgColor,
  filterModalShadow,
  filterModalTitleColor
} from "../../constants/colors";
import tags from "../../data/tags";
import text from "../../constants/text";
import type { FilterCollection } from "../../reducers/event-filters";

export type TagFilter = { [string]: Set<string> };

const CancelButton = ({ onPress }: { onPress: () => void }) => (
  <Touchable onPress={onPress}>
    <Text style={{ color: interestButtonTextColor }}>Cancel</Text>
  </Touchable>
);

type Props = {
  navigation: NavigationScreenProp<{}>,
  applyButtonText: string,
  eventFilters: FilterCollection,
  onChange: TagFilter => void,
  onApply: () => void,
  onCancel: () => void
};

class FilterModal extends PureComponent<Props> {
  static navigationOptions = {
    title: "Filter Events",
    headerLeft: CancelButton,
    headerStyle: {
      backgroundColor: filterBgColor,
      paddingHorizontal: calculateHorizontalPadding()
    },
    headerTitleStyle: { color: filterModalTitleColor, fontWeight: "bold" }
  };

  componentDidMount() {
    this.didBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      this.props.onCancel
    );
  }

  componentWillUnmount() {
    this.didBlurSubscription.remove();
  }

  didBlurSubscription: {
    remove: () => void
  };

  toggleTagFilter = (selectedValues: Set<string>, sectionValue: string) => {
    const values: Set<string> = new Set([...selectedValues]);
    if (!values.delete(sectionValue)) {
      values.add(sectionValue);
    }
    return values;
  };

  render() {
    const { applyButtonText, onApply, onChange, eventFilters } = this.props;
    return (
      <SafeAreaView style={styles.flex} forceInset={{ bottom: "always" }}>
        <ScrollView style={styles.flex}>
          {Object.keys(tags).map(
            sectionName =>
              eventFilters[sectionName] && (
                <Fragment key={sectionName}>
                  <SectionHeader
                    title={text.tags[sectionName]}
                    hasShadow={false}
                  />
                  <ContentPadding>
                    {tags[sectionName].map(sectionValue => (
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
                        label={text.tags[sectionValue] || sectionValue}
                      />
                    ))}
                  </ContentPadding>
                </Fragment>
              )
          )}
        </ScrollView>
        <View style={styles.footer}>
          <ContentPadding>
            <Button
              text={applyButtonText}
              onPress={() => {
                onApply();
                this.props.navigation.goBack();
              }}
            />
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
    height: 60,
    paddingVertical: 8,
    backgroundColor: bgColor,

    // ios shadow
    shadowColor: filterModalShadow,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.6,
    shadowRadius: 5,

    // android shadow
    borderWidth: 0,
    elevation: 3,
    marginTop: 6
  }
});

export default FilterModal;
