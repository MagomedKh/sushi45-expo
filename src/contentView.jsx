import { useEffect, useRef } from "react";
import {
   StyleSheet,
   View,
   BackHandler,
   Platform,
   Linking,
   Text,
   Button,
} from "react-native";
import { WebView } from "react-native-webview";
import RenderLoadingView from "./renderLoadingView";
import { baseUrl } from "./config.json";

const ContentView = () => {
   const webViewRef = useRef();
   const currentUrlRef = useRef();

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
      if (
         !request.url ||
         request.url.startsWith("http") ||
         request.url.startsWith("/") ||
         request.url.startsWith("#") ||
         request.url.startsWith("javascript") ||
         request.url.startsWith("about:blank")
      ) {
         return true;
      }

      if (request.url.startsWith("blob")) {
         Alert.alert("Link cannot be opened.");
         return false;
      }

      if (
         request.url.startsWith("tel:") ||
         request.url.startsWith("mailto:") ||
         request.url.startsWith("maps:") ||
         request.url.startsWith("geo:") ||
         request.url.startsWith("sms:")
      ) {
         Linking.openURL(request.url).catch((er) => {
            Alert.alert("Failed to open Link: " + er.message);
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
         <Button
            onClick={() => {
               alert(3);
               Linking.openURL("/menu");
            }}
            title={"sdfas"}
         >
            {/* <Text>dsfsd</Text> */}
         </Button>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginTop: 30,
   },
});

export default ContentView;
