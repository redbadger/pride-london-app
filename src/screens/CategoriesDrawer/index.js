// @flow
import React, { PureComponent } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";
import {
  categoriesDrawerBgColor,
  categoriesDrawerCancelColor
} from "../../constants/colors";
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
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
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
    paddingTop: 10
  },
  cancelButtonText: {
    color: categoriesDrawerCancelColor,
    fontFamily: "Roboto-Medium",
    fontSize: 16
  }
});

export default CategoriesDrawer;
