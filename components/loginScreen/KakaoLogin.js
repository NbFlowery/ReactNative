import React from "react";
import { View, Text } from "react-native";
import loginStyle from "../../styles/loginStyle";

const KakaoLogin = () => {
  return (
    <View
      style={{
        ...loginStyle.loginView,
        backgroundColor: "#FFE661",
        marginTop: 20,
      }}
    >
      <Text style={loginStyle.loginText}>카카오로 계속하기</Text>
    </View>
  );
};

export default KakaoLogin;
