import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
//import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { OAuth2Client } from 'google-auth-library';
import { Button, View } from "react-native";

initializeApp({
  apiKey: "AIzaSyCeNq5z3LLxsygpOXdca7a5dAF_XCEf2_4",
  authDomain: "flowerytest-46ad1.firebaseapp.com",
  databaseURL: "https://flowerytest-46ad1-default-rtdb.firebaseio.com",
  projectId: "flowerytest-46ad1",
  storageBucket: "flowerytest-46ad1.appspot.com",
  messagingSenderId: "613491093797",
  appId: "1:613491093797:web:a74648987bd33ede4caacc",
  measurementId: "G-7N8GF6DVKT"
});

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "641257561708-ap726mmh0hvd6h6g34j0n2v1qartqadk.apps.googleusercontent.com",
    responseType: 'id_token'
  });

  const CLIENT_ID = "641257561708-ap726mmh0hvd6h6g34j0n2v1qartqadk.apps.googleusercontent.com"

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const credential = provider.setCustomParameters(id_token);
      signInWithCredential(auth, credential);

      const client = new OAuth2Client(CLIENT_ID);
      async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        console.log(userid);
      }
      verify().catch(console.error);
      console.log("login succeeded");
    } else {
      console.log("login failed");
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      ></Button>
    </View>
  );
}

export default Login;