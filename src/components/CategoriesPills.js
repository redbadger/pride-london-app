// @flow
import React from "react";
import { View, StyleSheet, ScrollView, PixelRatio } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import CategoryPill from "./CategoryPill";
import Text from "./Text";
import text from "../constants/text";

import {
  darkBlueGreyTwoColor,
  eucalyptusGreenColor,
  blackZeroColor,
  blackThirtyColor
} from "../constants/colors";
import type { EventCategoryName } from "../data/event";

type Props = {
  selectedCategories: Set<EventCategoryName>,
  style?: ViewStyleProp,
  onPress?: Function
};

const createAccessibilityLabel = (
  listPrefix: string,
  pillsList: Set<EventCategoryName>
) => {
  return pillsList.size > 0
    ? `${listPrefix} ${[...pillsList].join(", ")}`
    : text.categoryFilterEmpty;
};

class CategoriesPills extends React.PureComponent<Props> {
  static defaultProps = {
    style: {}
  };

  onTouchStart = () => {
    this.shouldTriggerPress = true;
  };

  onScroll = () => {
    this.shouldTriggerPress = false;
  };

  onTouchEnd = (e: any) => {
    if (this.shouldTriggerPress && this.props.onPress) {
      this.props.onPress(e);
    }
  };

  scrollView: ?Object;
  shouldTriggerPress: boolean = false;

  scrollToLastPill = () => {
    if (!this.scrollView) {
      return;
    }

    this.scrollView.scrollToEnd({ animated: false });
  };

  render() {
    const { style, selectedCategories } = this.props;

    return (
      <View
        style={[styles.selectedCategoriesPills, style]}
        accessible
        accessibilityLabel={createAccessibilityLabel(
          text.categoryFilterContents,
          selectedCategories
        )}
      >
        {selectedCategories.size === 0 ? (
          <Text type="h3" style={styles.zeroSelected}>
            {text.zeroSelected}
          </Text>
        ) : (
          <View style={styles.scrollView}>
            <LinearGradient
              style={[styles.scrollShadow, styles.scrollShadowLeft]}
              end={{ x: 0, y: 0.5 }}
              start={{ x: 1.0, y: 0.5 }}
              colors={[blackZeroColor, blackThirtyColor]}
            />
            <ScrollView
              ref={(ref: ?Object) => {
                this.scrollView = ref;
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              onContentSizeChange={this.scrollToLastPill}
              onTouchStart={this.onTouchStart}
              onScroll={this.onScroll}
              onTouchEnd={this.onTouchEnd}
            >
              {Array.from(selectedCategories).map(name => (
                <CategoryPill
                  key={name}
                  name={name}
                  style={styles.categoryPill}
                  labelForAccessibility={createAccessibilityLabel(
                    text.categoryFilterContents,
                    selectedCategories
                  )}
                />
              ))}
            </ScrollView>
            <LinearGradient
              style={[styles.scrollShadow, styles.scrollShadowRight]}
              end={{ x: 1.0, y: 0.5 }}
              start={{ x: 0, y: 0.5 }}
              colors={[blackZeroColor, blackThirtyColor]}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selectedCategoriesPills: {
    backgroundColor: darkBlueGreyTwoColor,
    flex: 1,
    alignItems: "center",
    height: 44 * PixelRatio.getFontScale(),
    borderRadius: 4,
    flexDirection: "row"
  },
  categoryPill: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 6,
    marginRight: 2
  },
  zeroSelected: {
    color: eucalyptusGreenColor,
    paddingTop: 4,
    paddingLeft: 8
  },
  scrollView: {
    width: "100%"
  },
  scrollShadow: {
    position: "absolute",
    top: 0,
    width: 15,
    height: 44 * PixelRatio.getFontScale(),
    zIndex: 10,
    borderRadius: 4
  },
  scrollShadowLeft: {
    left: 0
  },
  scrollShadowRight: {
    right: 0
  }
});

export default CategoriesPills;
