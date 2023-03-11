import { ActivityIndicator, StyleSheet, View } from "react-native";

const RenderLoadingView = () => (
   <View style={styles.renderLoadingView}>
      <ActivityIndicator
         style={styles.loadingIcon}
         size={"large"}
         color={"#228bac"}
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
      transform: "scale(2)",
   },
});

export default RenderLoadingView;
