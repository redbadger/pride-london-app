// @flow
import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { Event, EventCategoryName } from "../../data/event-deprecated";
import { lightNavyBlueColor } from "../../constants/colors";
import Button from "../../components/ButtonPrimary";
import ContentPadding from "../../components/ContentPadding";
import Header from "./Header";
import List from "./List";
import locale from "../../data/locale";

export type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  events: Event[],
  categories: Set<EventCategoryName>,
  toggleCategoryFilter: (Set<EventCategoryName>, string) => void,
  onClearAll: () => void,
  applyButtonText: string
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
    const { events, categories, applyButtonText } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <Header
          onBack={this.applyFilters}
          onClearAll={this.handleClearAll}
          selectedCategories={categories}
        />
        <View style={styles.list}>
          <List
            locale={locale}
            stagedCategories={categories}
            onPress={this.handleFilterChange}
          />
        </View>
        <View style={styles.footer}>
          <ContentPadding>
            <Button onPress={this.applyFilters} disabled={!events.length}>
              {applyButtonText}
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
