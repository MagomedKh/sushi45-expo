import { ActivityIndicator, StyleSheet, View } from "react-native";

const RenderLoadingView = () => (
   <View style={styles.renderLoadingView}>
      <ActivityIndicator
         style={styles.loadingIcon}
         size={"large"}
         color={"blue"}
      />
   </View>
);

const styles = StyleSheet.create({
   renderLoadingView: {
      position: "absolute",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
   },
   loadingIcon: {
      transform: "scale(1.75)",
   },
});

export default RenderLoadingView;
