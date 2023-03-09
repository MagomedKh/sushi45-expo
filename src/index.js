import { Linking, Platform, StyleSheet, View } from "react-native";
import ContentView from "./contentView";
import OneSignal_AppId from "./config.json";
import { useEffect } from "react";
import OneSignal from "react-native-onesignal";

// OneSignal.setAppId(OneSignal_AppId);

// setNotificationReceivedHandler((notification) => {
//    console.log(notification);
// });

// setNotificationOpenedHandler((notification) => {
//    console.log(notification);
// });

// async function registerForPushNotificationsAsync() {
//    if (Device.isDevice) {
//       const { status } = await Notifications.requestPermissionsAsync();
//       console.log(status);
//       if (status !== "granted") {
//          alert("Permission to receive push notifications was not granted");
//          return;
//       }
//    } else {
//       alert("Must use physical device for Push Notifications");
//    }
//    if (Platform.OS === "android") {
//       Notifications.setNotificationChannelAsync("default", {
//          name: "default",
//          importance: Notifications.AndroidImportance.MAX,
//          vibrationPattern: [0, 250, 250, 250],
//          lightColor: "#FF231F7C",
//       });
//    }

//    const token = (await Notifications.getExpoPushTokenAsync()).data;
//    console.log(token);
// }

export default function App() {
   OneSignal.setAppId(OneSignal_AppId);
   OneSignal.promptForPushNotificationsWithUserResponse();
   alert("from app.js ");
   //Method for handling notifications opened
   OneSignal.setNotificationOpenedHandler((notification) => {
      console.log("OneSignal: notification opened:", notification);
      Linking.openURL("./");
   });
   return (
      <View style={styles.container}>
         <ContentView />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
   },
});
