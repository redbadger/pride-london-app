// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import Text, { scaleWithFont } from "../../components/Text";
import CommonHeader from "../../components/Header";
import ContentPadding from "../../components/ContentPadding";
import ActionButton from "../../components/ActionButton";
import text from "../../constants/text";
import { whiteColor } from "../../constants/colors";
import CategoriesPills from "../../components/CategoriesPills";
import type { EventCategoryName } from "../../data/event";

type Props = {
  onBack: Function,
  onClearAll?: Function,
  selectedCategories: Set<EventCategoryName>
};

const Header = ({ onBack, onClearAll, selectedCategories }: Props) => (
  <View>
    <CommonHeader
      leftElement={<CommonHeader.BackButton onPress={onBack} />}
      rightElement={
        selectedCategories.size > 0 && (
          <ActionButton label={text.reset} onPress={onClearAll} />
        )
      }
    />
    <ContentPadding>
      <Text type="h1" style={styles.filterTitle}>
        {text.filterTitle}
      </Text>
      <View style={styles.categoriesPills}>
        <CategoriesPills selectedCategories={selectedCategories} />
      </View>
    </ContentPadding>
  </View>
);

Header.defaultProps = {
  onClearAll: () => {}
};

const styles = StyleSheet.create({
  categoriesPills: {
    width: "100%",
    height: scaleWithFont("h3", 44),
    marginBottom: 16
  },
  filterTitle: {
    color: whiteColor,
    marginTop: 4,
    marginBottom: 6
  }
});

export default Header;
