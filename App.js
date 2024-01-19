import { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
  View,
} from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import SignupLogin1 from "./components/SignupLogin1";
import SignupLogin2 from "./components/SignupLogin2";
import SignupLogin3 from "./components/SignupLogin3";
import MainScreen from "./components/MainScreen";
import CustomerSupport1 from "./components/CustomerSupport1";
import CustomerSupport2 from "./components/CustomerSupport2";
import CustomerFeedBack1 from "./components/CustomerFeedBack1";
import Scan from "./components/Scan";
import CustomerFeedBack2 from "./components/CustomerFeedBack2";
import ManagePrescriptions from "./components/ManagePrescriptions";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeNavigator from "./routers/navigators/HomeNavigator";
import ReminderScheduling from "./components/ReminderScheduling";

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  //Responsive
  const { width, height } = useWindowDimensions();
  //Responsive Value
  const marginTopDistance = height < 400 ? 5 : 0;
  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
          "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View
        style={[styles.container, { marginTop: marginTopDistance }]}
        onLayout={onLayoutRootView}
      >
        {/* <HomeNavigator></HomeNavigator> */}
        <ReminderScheduling></ReminderScheduling>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
