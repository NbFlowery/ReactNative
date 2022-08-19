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
import { Button, View, Text, Image, StyleSheet } from "react-native";
import Constants from "expo-constants";
import Logo from "./Logo";

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

  const googleLogin = async (props) => {
    try {
      const auth = getAuth();
      const result = await promptAsync();
      const creds = GoogleAuthProvider.credential(result.params.id_token);
      const res = await signInWithCredential(auth, creds);
      const userName = res.user.displayName;
      const userImage = res.user.photoURL;
      setLogin(true);
      setUserName(userName);
      setUserImage(userImage);
      console.log("Sign-in successful.");
      console.log("userName: ", userName, "userImage: ", userImage);
    } catch {
      (e) => {
        console.log(e);
      };
    }
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
    <View style={styles.container}>
      {login ? (
        <View>
          <Button title="Logout" onPress={googleLogout} />
          <Text>로그인 되었습니다.</Text>
          <Text>안녕하세요, {userName}님!</Text>
          <Image
            style={{ width: 100, height: 100, borderRadius: 50 }}
            source={{ uri: userImage }}
          />
        </View>
      ) : (
        <View>
          <Logo />
          <View style={styles.googleLoginView}>
            <Text style={styles.googleLoginText} onPress={googleLogin}>구글로 계속하기</Text>
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
