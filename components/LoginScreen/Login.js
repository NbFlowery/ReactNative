import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { Button, View, Text, Image } from "react-native";
import Constants from "expo-constants";

initializeApp(Constants.manifest.web.config.firebase);

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "641257561708-ap726mmh0hvd6h6g34j0n2v1qartqadk.apps.googleusercontent.com",
    responseType: "id_token",
  });
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState();
  const [userImage, setUserImage] = useState();

  const googleLogin = async () => {
    const auth = getAuth();
    const result = await promptAsync();
    if (result === null) {
      console.log("failed to login.");
    } else {
      console.log("login succeded.")
    }
    const creds = GoogleAuthProvider.credential(result.params.id_token);
    const res = await signInWithCredential(auth, creds);
    const userName = res.user.displayName;
    const userImage = res.user.photoURL;
    setLogin(true);
    setUserName(userName);
    setUserImage(userImage);
    console.log("userName: ", userName, "userImage: ", userImage);
  };

  const googleLogout = async () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        setLogin(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {login ? (
        <View>
          <Button title='Logout' onPress={googleLogout} />
          <Text>로그인 되었습니다.</Text>
          <Text>안녕하세요, {userName}님!</Text>
          <Image
            style={{ width: 100, height: 100, borderRadius: 50 }}
            source={{ uri: userImage }}
          />
        </View>
      ) : (
        <View>
          <Button title='Login' onPress={googleLogin} />
          <Text>로그인 하세요.</Text>
        </View>
      )}
    </View>
  );
};

export default Login;
