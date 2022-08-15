import React, { useEffect, useState } from "react";
import Login from "./components/LoginScreen/Login";

import Main from "./components/mainScreen/Main";
import Splash from "./components/splashScreen/SplashScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // }, []);

  // return <>{isLoading ? <Splash /> : <Main />}</>;
  return <Login />
}
