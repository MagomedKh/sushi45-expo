import { Platform, StyleSheet, View } from "react-native";
import ContentView from "./contentView";
import OneSignal_AppId from "./config.json";
import { useEffect } from "react";
import OneSignal from "onesignal-expo-plugin";

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
   alert("sadfas");
   OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
         console.log(
            "OneSignal: notification will show in foreground:",
            notificationReceivedEvent
         );
         let notification = notificationReceivedEvent.getNotification();
         console.log("notification: ", notification);
         const data = notification.additionalData;
         console.log("additionalData: ", data);
         // Complete with null means don't show a notification.
         notificationReceivedEvent.complete(notification);
      }
   );

   //Method for handling notifications opened
   OneSignal.setNotificationOpenedHandler((notification) => {
      console.log("OneSignal: notification opened:", notification);
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
