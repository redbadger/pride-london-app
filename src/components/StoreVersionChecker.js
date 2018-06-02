// @flow
import { Component } from "react";
import { Alert, Linking } from "react-native";
import VersionCheck from "react-native-version-check";
import { appNameIos, appIdIos } from "../constants/app";

class StoreVersionChecker extends Component<{}> {
  async componentDidMount() {
    const versionInfo = await VersionCheck.needUpdate();

    if (versionInfo.isNeeded) {
      this.handleAppStoreAlert();
    }
  }

  handleAppStoreAlert = () =>
    Alert.alert(
      "New Update Available",
      "A new version of the app is available from the store. Do you want to update now?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: this.handleAppStoreLink
        }
      ]
    );

  handleAppStoreLink = async () => {
    try {
      Linking.openURL(
        await VersionCheck.getStoreUrl({ appName: appNameIos, appID: appIdIos })
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("Error fetching app store version: ", e);
    }
  };

  render() {
    return null;
  }
}

export default StoreVersionChecker;
