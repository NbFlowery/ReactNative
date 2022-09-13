import React from "react";
import { View, StyleSheet } from "react-native";
import Logo from "./Logo";
import Main from "../mainScreen/Main";
import GoogleLogin from "./GoogleLogin";
import LoginStore from "../../store/LoginStore";

const Login = () => {
  const { login } = LoginStore();

  return (
    <View style={styles.container}>
      {login ? (
        <Main />
      ) : (
        <View>
          <Logo />
          <GoogleLogin />
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
