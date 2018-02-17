// @flow
import React from "react";
import { Button, SafeAreaView, PushNotificationIOS } from "react-native";
// import NotificationsIOS from "react-native-notifications";

const triggerNotification = () => {
  PushNotificationIOS.scheduleLocalNotification({
    fireDate: new Date(Date.now() + 5 * 1000).toISOString(),
    alertBody: "Local notificiation!",
    alertTitle: "Local Notification Title",
    soundName: "chime.aiff",
    silent: false,
    category: "SOME_CATEGORY",
    userInfo: {}
  });
};

const ParadeScreen = () => (
  <SafeAreaView>
    <Button title="Trigger Notification" onPress={triggerNotification} />
  </SafeAreaView>
);

export default ParadeScreen;
