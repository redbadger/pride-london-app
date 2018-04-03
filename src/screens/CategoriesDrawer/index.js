// @flow
import React, { PureComponent } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";
import Text from "../../components/Text";
import {
  categoriesDrawerBgColor,
  categoriesDrawerCancelColor,
  whiteColor,
  darkBlueGreyTwoColor,
  eucalyptusGreenColor,
  lightNavyBlueColor
} from "../../constants/colors";
import text from "../../constants/text";

import ContentPadding from "../../components/ContentPadding";

type Props = {
  navigation: NavigationScreenProp<NavigationState>
};

class CategoriesDrawer extends PureComponent<Props> {
  handleClose = () => {
    this.props.navigation.navigate("DrawerClose");
  };

  handleShowCategories = () => {
    // TODO
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ContentPadding style={styles.contents}>
          <View>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={this.handleClose}
            >
              <Text type="h4" style={styles.cancelButtonText}>
                {text.cancel}
              </Text>
            </TouchableOpacity>
            <Text type="h1" style={styles.filterTitle}>
              {text.filterTitle}
            </Text>
            <View style={styles.selectedCategoriesPills}>
              <Text type="h2" style={styles.zeroSelected}>
                {text.zeroSelected}
              </Text>
            </View>
          </View>
          <View style={styles.categoriesList} />
          <View>
            <TouchableOpacity
              style={styles.showEventsButton}
              onPress={this.handleShowCategories}
            >
              <Text type="h2" style={styles.showEventsText}>
                {text.showEvents(213)}
              </Text>
            </TouchableOpacity>
          </View>
        </ContentPadding>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: categoriesDrawerBgColor
  },
  contents: {
    flex: 1,
    justifyContent: "space-between"
  },
  cancelButton: {
    marginTop: 10
  },
  cancelButtonText: {
    color: categoriesDrawerCancelColor
  },
  filterTitle: {
    color: whiteColor,
    marginTop: 14,
    marginBottom: 6
  },
  selectedCategoriesPills: {
    backgroundColor: darkBlueGreyTwoColor,
    paddingTop: 11,
    paddingBottom: 9,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 4,
    marginBottom: 16
  },
  zeroSelected: {
    color: eucalyptusGreenColor
  },
  categoriesList: {
    backgroundColor: eucalyptusGreenColor,
    flex: 1
  },
  showEventsButton: {
    backgroundColor: eucalyptusGreenColor,
    width: "100%",
    paddingTop: 13,
    paddingBottom: 11,
    borderRadius: 4,
    marginTop: 16,
    marginBottom: 16
  },
  showEventsText: {
    color: lightNavyBlueColor,
    textAlign: "center"
  }
});

export default CategoriesDrawer;
