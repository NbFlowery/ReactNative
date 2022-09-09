import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Logo from "./Logo";
import Main from "../mainScreen/Main";
import GoogleLogin from "./GoogleLogin";
import KakaoLogin from "./KakaoLogin";

const Login = () => {
  const [login, setLogin] = useState(false);

  return (
    <View style={styles.container}>
      {login ? (
        <Main />
      ) : (
        <View>
          <Logo />
          <GoogleLogin />
          <KakaoLogin />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },
});

export default Login;