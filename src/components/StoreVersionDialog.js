// @flow
import { Component } from "react";
import { Alert, Linking } from "react-native";
import VersionCheck from "react-native-version-check";
import { connect } from "react-redux";
import type { Connector } from "react-redux";

import { appNameIos, appIdIos } from "../constants/app";
import { now, addDays, startOfDay, isBefore } from "../lib/date";
import {
  setAppUpdateAskLaterTime,
  getAppUpdateAskLaterTime
} from "../integrations/storage";
import text from "../constants/text";
import { notifyReporter } from "../actions/reporting";

type VersionInfo = {
  currentVersion: string,
  isNeeded: boolean,
  latestVersion: string
};

type Props = {
  onError: Error => void
};

class StoreVersionDialog extends Component<Props> {
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
      text.storeVersionDialog.updateAvailable,
      text.storeVersionDialog.newVersionDescription,
      [
        {
          text: text.storeVersionDialog.askMeLater,
          onPress: this.handleAskLater
        },
        {
          text: text.storeVersionDialog.cancel,
          style: "cancel"
        },
        {
          text: text.storeVersionDialog.ok,
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
      this.props.onError(e);
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

const mapDispatchToProps = dispatch => ({
  onError: error => dispatch(notifyReporter(error))
});

const connector: Connector<{}, Props> = connect(undefined, mapDispatchToProps);

export default connector(StoreVersionDialog);
