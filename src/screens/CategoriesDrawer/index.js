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
  eucalyptusGreenColor
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

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ContentPadding>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={this.handleClose}
          >
            <Text style={styles.cancelButtonText}>{text.cancel}</Text>
          </TouchableOpacity>
          <Text type="h1" style={styles.filterTitle}>
            {text.filterTitle}
          </Text>
          <View style={styles.selectedCategoriesPills}>
            <Text style={styles.zeroSelected}>{text.zeroSelected}</Text>
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
  cancelButton: {
    marginTop: 10
  },
  cancelButtonText: {
    color: categoriesDrawerCancelColor,
    fontFamily: "Roboto-Medium",
    fontSize: 16
  },
  filterTitle: {
    color: whiteColor,
    marginTop: 14,
    marginBottom: 6
  },
  selectedCategoriesPills: {
    backgroundColor: darkBlueGreyTwoColor,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 4,
    marginBottom: 16
  },
  zeroSelected: {
    fontFamily: "Poppins-SemiBold",
    color: eucalyptusGreenColor,
    fontSize: 18
  }
});

export default CategoriesDrawer;
