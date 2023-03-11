import { useEffect, useRef } from "react";
import {
   StyleSheet,
   View,
   BackHandler,
   Platform,
   Linking,
   Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import { useConfirm } from "react-native-confirm-dialog";
import { baseUrl } from "../config.json";
import RenderLoadingView from "./renderLoadingView";

const ContentView = () => {
   const webViewRef = useRef();
   const currentUrlRef = useRef();
   const confirm = useConfirm();

   const handleAndroidBackPress = () => {
      if (webViewRef.current && currentUrlRef.current !== baseUrl) {
         webViewRef.current.goBack();
         return true;
      } else {
         return false;
      }
   };

   const handleLoadProgress = (e) => {
      currentUrlRef.current = e.nativeEvent.url;
   };

   const handleShouldStartLoadWithRequest = (request) => {
      if (request.url.startsWith("tel:")) {
         confirm({
            title: `Позвонить на номер: ${request.url.slice(4)}`,
            confirmLabel: "Позвонить",
            cancelLabel: "Нет",
            onConfirm: () => {
               Linking.openURL(request.url).catch((er) => {
                  Alert.alert("Failed to open Link: " + er.message);
               });
            },
         });
         return false;
      }
      return true;
   };

   useEffect(() => {
      if (Platform.OS === "android") {
         BackHandler.addEventListener(
            "hardwareBackPress",
            handleAndroidBackPress
         );

         return () => {
            BackHandler.removeEventListener(
               "hardwareBackPress",
               handleAndroidBackPress
            );
         };
      }
   }, []);

   return (
      <View style={styles.container}>
         <WebView
            source={{
               uri: baseUrl,
               headers: { "X-application": "android" },
            }}
            ref={webViewRef}
            onLoadProgress={handleLoadProgress}
            startInLoadingState={true}
            renderLoading={RenderLoadingView}
            onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
            originWhitelist={["*"]}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});

export default ContentView;
