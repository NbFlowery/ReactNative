import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import sproutURL from "../../assets/images/sprout.png";

const Logo = () => {
  return (
    <View>
      <Image source={sproutURL} style={styles.image} />
      <Text style={{ ...styles.main, marginBottom: 5 }}>매일의 투두로</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            ...styles.main,
            color: "#84A47D",
            fontWeight: "700",
            marginRight: 5,
          }}
        >
          나만의 꽃밭
        </Text>
        <Text style={styles.main}>만들기</Text>
      </View>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  main: {
    fontSize: 48,
    fontWeight: "400",
  },
});
