import React, { useEffect, useState } from "react";

import Main from "/ReactNative/components/mainScreen/Main.js";
import Splash from "/ReactNative/components/splashScreen/SplashScreen.js";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return <>{isLoading ? <Splash /> : <Main />}</>;
}
