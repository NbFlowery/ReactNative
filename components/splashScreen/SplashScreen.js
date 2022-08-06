import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import splashURL from "../../assets/images/splash.png";

export const Splash = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={splashURL}
        resizeMode="cover"
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    justifyContent: "center"
  },
});

export default Splash;