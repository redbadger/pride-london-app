// @flow
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Text from "../../components/Text";
import text from "../../constants/text";
import {
  whiteColor,
  darkBlueGreyTwoColor,
  eucalyptusGreenColor
} from "../../constants/colors";

type Props = {
  onClose: Function,
  onClearAll: Function
};

type ActionButtonProps = {
  label: string,
  onPress: Function
};

const ActionButton = ({ label, onPress }: ActionButtonProps) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <Text type="h4" style={styles.actionButtonText}>
      {label}
    </Text>
  </TouchableOpacity>
);

const Header = ({ onClose, onClearAll }: Props) => (
  <View>
    <View style={styles.actionButtons}>
      <ActionButton label={text.cancel} onPress={onClose} />
      <ActionButton label={text.clearAll} onPress={onClearAll} />
    </View>
    <Text type="h1" style={styles.filterTitle}>
      {text.filterTitle}
    </Text>
    <View style={styles.selectedCategoriesPills}>
      <Text type="h2" style={styles.zeroSelected}>
        {text.zeroSelected}
      </Text>
    </View>
  </View>
);

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
    color: eucalyptusGreenColor
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
  }
});

export default Header;
