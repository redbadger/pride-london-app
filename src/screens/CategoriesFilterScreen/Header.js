// @flow
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Text from "../../components/Text";
import text from "../../constants/text";
import { whiteColor } from "../../constants/colors";
import CategoriesPills from "../../components/CategoriesPills";

type Props = {
  onClose?: Function,
  onClearAll?: Function,
  selectedCategories: Set<string>
};

type ActionButtonProps = {
  label: string,
  onPress?: Function
};

const ActionButton = ({ label, onPress }: ActionButtonProps) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <Text type="h4" style={styles.actionButtonText}>
      {label}
    </Text>
  </TouchableOpacity>
);

ActionButton.defaultProps = {
  onPress: () => {}
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
    <CategoriesPills
      style={styles.categoriesPills}
      selectedCategories={selectedCategories}
    />
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
  actionButton: {
    width: 60
  },
  actionButtonText: {
    color: whiteColor
  },
  categoriesPills: {
    marginBottom: 16
  },
  filterTitle: {
    color: whiteColor,
    marginTop: 14,
    marginBottom: 6
  }
});

export default Header;
