// @flow
import React from "react";
import { StyleSheet, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import ActionButton from "../../components/ActionButton";
import Text from "../../components/Text";
import ContentPadding from "../../components/ContentPadding";
import { lightNavyBlueColor, whiteColor } from "../../constants/colors";
import text from "../../constants/text";

type Props = {
  onClearPress: () => void,
  onCancelPress: () => void,
  showClear: boolean
};

const Header = ({ onClearPress, onCancelPress, showClear }: Props) => (
  console.log(showClear ? 1 : 0),
  (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <ContentPadding style={styles.content}>
        <ActionButton label={text.cancel} onPress={onCancelPress} />
        <View style={styles.titleWrapper}>
          <Text type="h2" style={styles.titleText}>
            {text.filterEvents}
          </Text>
        </View>
        <ActionButton
          key={showClear ? 1 : 0}
          label={text.clearAll}
          onPress={onClearPress}
          style={showClear ? styles.show : styles.hide}
        />
      </ContentPadding>
    </SafeAreaView>
  )
);

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: lightNavyBlueColor
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleWrapper: { paddingTop: 4 },
  titleText: { color: whiteColor },
  show: { opacity: 1 },
  hide: { opacity: 0 }
});

export default Header;
