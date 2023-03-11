import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import OneSignal from "react-native-onesignal";
import { ConfirmProvider } from "react-native-confirm-dialog";
import { OneSignal_AppId } from "./config.json";
import ContentView from "./components/contentView";
import { StatusBar } from "expo-status-bar";

export default function App() {
   useEffect(() => {
      OneSignal.setAppId(OneSignal_AppId);
   }, []);

   return (
      <ConfirmProvider>
         <StatusBar />
         <View style={styles.container}>
            <ContentView />
         </View>
      </ConfirmProvider>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      paddingTop: 30,
   },
});
