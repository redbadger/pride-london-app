// @flow
import React from "react";
import { View, StyleSheet, PixelRatio } from "react-native";
import Text from "../../components/Text";
import ActionButton from "../../components/ActionButton";
import text from "../../constants/text";
import { whiteColor } from "../../constants/colors";
import CategoriesPills from "../../components/CategoriesPills";

type Props = {
  onClose?: Function,
  onClearAll?: Function,
  selectedCategories: Set<string>
};

const Header = ({ onClose, onClearAll, selectedCategories }: Props) => (
  <View>
    <View style={styles.actionButtons}>
      <ActionButton label={text.cancel} onPress={onClose} />
      {selectedCategories.size > 0 && (
        <ActionButton label={text.clearAll} onPress={onClearAll} />
      )}
    </View>
    <Text type="h1" style={styles.filterTitle}>
      {text.filterTitle}
    </Text>
    <View style={styles.categoriesPills}>
      <CategoriesPills selectedCategories={selectedCategories} />
    </View>
  </View>
);

Header.defaultProps = {
  onClose: () => {},
  onClearAll: () => {}
};

const styles = StyleSheet.create({
  actionButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  categoriesPills: {
    width: "100%",
    height: 44 * PixelRatio.getFontScale(),
    marginBottom: 16
  },
  filterTitle: {
    color: whiteColor,
    marginTop: 14,
    marginBottom: 6
  }
});

export default Header;
