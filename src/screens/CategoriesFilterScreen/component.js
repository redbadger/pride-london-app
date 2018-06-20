// @flow
import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { EventCategoryName } from "../../data/event";
import { lightNavyBlueColor } from "../../constants/colors";
import Button from "../../components/ButtonPrimary";
import ContentPadding from "../../components/ContentPadding";
import Header from "./Header";
import List from "./List";
import text from "../../constants/text";

export type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  numberOfEvents: number,
  categories: Set<EventCategoryName>,
  toggleCategoryFilter: (Set<EventCategoryName>, string) => void,
  onClearAll: () => void
};

class CategoriesFilterScreen extends PureComponent<Props> {
  handleClearAll = () => {
    this.props.onClearAll();
  };

  applyFilters = () => {
    this.props.navigation.goBack();
  };

  handleFilterChange = (categoryLabel: string) => {
    this.props.toggleCategoryFilter(this.props.categories, categoryLabel);
  };

  render() {
    const { numberOfEvents, categories } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <Header
          onBack={this.applyFilters}
          onClearAll={this.handleClearAll}
          selectedCategories={categories}
        />
        <View style={styles.list}>
          <List
            stagedCategories={categories}
            onPress={this.handleFilterChange}
          />
        </View>
        <View style={styles.footer}>
          <ContentPadding>
            <Button
              onPress={this.applyFilters}
              disabled={numberOfEvents <= 0}
              accessibilityLabel={text.filterPickerApplyLabel(numberOfEvents)}
              testID="apply-category-filter-button"
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
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: lightNavyBlueColor
  },
  list: {
    flex: 1
  },
  footer: {
    paddingVertical: 12,
    backgroundColor: lightNavyBlueColor
  }
});

export default CategoriesFilterScreen;
