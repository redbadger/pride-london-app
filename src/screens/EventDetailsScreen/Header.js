// @flow
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { eventDetailsHeaderBgColor } from "../../constants/colors";

type HeaderProps = {
  onBackButtonPress: () => void
};

const Header = ({ onBackButtonPress }: HeaderProps) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackButtonPress}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: eventDetailsHeaderBgColor
  },
  header: {
    height: 180,
    padding: 22
  }
});

export default Header;
