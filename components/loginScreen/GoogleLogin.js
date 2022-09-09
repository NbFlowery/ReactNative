import React, { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { View, Text } from "react-native";
import Constants from "expo-constants";
import { CLIENT_ID } from "@env";
import loginStyle from "../../styles/loginStyle";
import LoginStore from "../../store/LoginStore";

initializeApp(Constants.manifest.web.config.firebase);

WebBrowser.maybeCompleteAuthSession();

const GoogleLogin = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    // clientId: CLIENT_ID,
    expoClientId: CLIENT_ID,
    responseType: "id_token",
  });
  const { login, setLogin } = LoginStore();

  const googleLogin = async () => {
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
        console.log("login failed.");
        console.log(e);
      };
    }
  };

  return (
    <View
      style={{
        ...loginStyle.loginView,
        backgroundColor: "#F5F5F5",
        marginTop: 60,
      }}
      onTouchStart={googleLogin}
    >
      <Text style={loginStyle.loginText}>구글로 계속하기</Text>
    </View>
  );
};

export default GoogleLogin;
