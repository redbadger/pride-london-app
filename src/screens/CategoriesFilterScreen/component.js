// @flow
import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { EventCategoryName } from "../../data/event";
import type { Event } from "../../data/event-deprecated";
import { lightNavyBlueColor } from "../../constants/colors";
import text from "../../constants/text";
import Button from "../../components/ButtonPrimary";
import ContentPadding from "../../components/ContentPadding";
import Header from "./Header";
import List from "./List";

export type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  events: Event[],
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
    const { events, categories } = this.props;
    const buttonLabel =
      categories.size > 0 ? text.showEvents(events.length) : text.showAllEvents;

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
            <Button onPress={this.applyFilters} disabled={!events.length}>
              {buttonLabel}
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
