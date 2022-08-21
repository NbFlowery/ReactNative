import React, { useEffect, useState } from "react";
import Login from "./components/loginScreen/Login";
import Splash from "./components/splashScreen/SplashScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return <>{isLoading ? <Splash /> : <Login />}</>;

}
