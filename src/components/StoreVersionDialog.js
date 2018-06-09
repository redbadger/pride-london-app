// @flow
import { Component } from "react";
import { Alert, Linking } from "react-native";
import VersionCheck from "react-native-version-check";
import { appNameIos, appIdIos } from "../constants/app";
import { now, addDays, startOfDay, isBefore } from "../lib/date";
import {
  setAppUpdateAskLaterTime,
  getAppUpdateAskLaterTime
} from "../integrations/storage";

type VersionInfo = {
  currentVersion: string,
  isNeeded: boolean,
  latestVersion: string
};

class StoreVersionDialog extends Component<{}> {
  async componentDidMount() {
    const versionInfo: VersionInfo = await VersionCheck.needUpdate();
    const askLaterTime = await getAppUpdateAskLaterTime();
    const updateMessageSuppressed =
      !!askLaterTime && isBefore(now(), askLaterTime);

    const showAppStoreAlert = versionInfo.isNeeded && !updateMessageSuppressed;
    if (showAppStoreAlert) {
      this.handleAppStoreAlert();
    }
  }

  handleAppStoreAlert = () =>
    Alert.alert(
      "New Update Available",
      "A new version of the app is available from the store. Do you want to update now?",
      [
        { text: "Ask me later", onPress: this.handleAskLater },
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

  handleAskLater = async () => {
    const askLaterTime = startOfDay(addDays(now(), 1));
    await setAppUpdateAskLaterTime(askLaterTime);
  };

  render() {
    return null;
  }
}

export default StoreVersionDialog;
