import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { router } from "expo-router";
import { Button, Image } from "@rneui/themed";

const NotificationPermission = () => {
  const [_, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    if (!Device.isDevice) {
      Alert.alert("Error", "Must use a physical device for push notifications");
      return;
    }

    const { status } = await Notifications.getPermissionsAsync();
    if (status === "granted") {
      setHasPermission(true);
      router.replace("/notification");
    }
  };

  const requestPermission = async () => {
    if (__DEV__) {
      Alert.alert(
        "By Passing Notification",
        "On Development we will bypassing the notification permission dialog"
      );
      return router.replace("/");
    }
    if (!Device.isDevice) return;

    const { status } = await Notifications.requestPermissionsAsync();
    setHasPermission(status === "granted");

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "You need to enable notifications in settings."
      );
    } else {
      return router.replace("/");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          source={require("../../../assets/images/notification-icon.png")}
          style={{ height: 100, width: 100 }}
        />
        <Text style={styles.title}>Get the most out of Blott ✅</Text>
        <Text style={styles.description}>
          Allow notifications to stay in the loop with your payments, requests,
          and groups.
        </Text>
      </View>
      <Button
        title="Continue"
        onPress={requestPermission}
        buttonStyle={styles.continueBtn}
      />
    </View>
  );
};

export default NotificationPermission;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 30,
    marginTop: 20,
    textAlign: "center",
    color: "#1E1F20",
  },
  description: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
    textAlign: "center",
    color: "#737373",
  },
  continueBtn: {
    width: 330,
    borderRadius: 24,
    alignSelf: "center",
    backgroundColor: "#523AE4",
  },
});
