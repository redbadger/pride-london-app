// @flow
import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ImageBackground
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";

type Props = {
  onBackButtonPress: () => void,
  imageUrl: string
};

const Header = ({ onBackButtonPress, imageUrl }: Props) => (
  <ImageBackground
    style={styles.header}
    source={{ uri: imageUrl }}
    resizeMode="cover"
  >
    <SafeAreaView style={styles.content}>
      <StatusBar barStyle="default" animated />
      <TouchableOpacity onPress={onBackButtonPress}>
        <Text>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  </ImageBackground>
);

const styles = StyleSheet.create({
  header: {
    flex: 1,
    height: 180
  },
  content: {
    padding: 22
  }
});

export default Header;
