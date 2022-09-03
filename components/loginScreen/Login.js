import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";
import Logo from "./Logo";
import Main from "../mainScreen/Main";
import { CLIENT_ID } from "@env";

initializeApp(Constants.manifest.web.config.firebase);

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    // clientId: CLIENT_ID,
    expoClientId: CLIENT_ID,
    responseType: "id_token",
  });
  const [login, setLogin] = useState(false);

  const googleLogin = async (props) => {
    try {
      const auth = getAuth();
      const result = await promptAsync();
      const creds = GoogleAuthProvider.credential(result.params.id_token);
      const res = await signInWithCredential(auth, creds);
      const userName = res.user.displayName;
      setLogin(true);
      console.log("Sign-in successful.");
      console.log("userName:", userName);
    } catch {
      (e) => {
        console.log("login failed.")
        console.log(e);
      };
    }
  };

  return (
    <View style={styles.container}>
      {login ? (
        <Main />
      ) : (
        <View>
          <Logo />
          <View style={styles.googleLoginView}>
            <Text style={styles.googleLoginText} onPress={googleLogin}>
              구글로 계속하기
            </Text>
          </View>
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
  googleLoginView: {
    borderRadius: 10,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    marginTop: 80,
  },
  googleLoginText: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default Login;
