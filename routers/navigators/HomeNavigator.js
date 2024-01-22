import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MainScreen from "../../components/MainScreen";
import Scan from "../../components/Scan";
import ManagePrescriptions from "../../components/ManagePrescriptions";
import CustomerSupport1 from "../../components/CustomerSupport1";
import CustomerFeedBack1 from "../../components/CustomerFeedBack1";
import ReminderScheduling from "../../components/ReminderScheduling";
import SignupLogin1 from "../../components/SignupLogin1";
import SignupLogin2 from "../../components/SignupLogin2";
import SignupLogin3 from "../../components/SignupLogin3";
import TabNavigator from "./TabNavigator";

const HomeNavigator = () => {
  const HomeStack = createNativeStackNavigator();

  const [auth, setAuth] = useState(true);

  return (
    <NavigationContainer>
      <HomeStack.Navigator
        initialRouteName="MainScreen"
        screenOptions={{
          headerTransparent: true,
          headerShown: false,
          contentStyle: { backgroundColor: "#FFF" },
          animation: "fade_from_bottom",
        }}
      >
        {auth ? (
          <HomeStack.Screen name="MainScreen" component={TabNavigator} />
        ) : (
          <HomeStack.Screen name="SignUpLogin1" component={SignupLogin1} />
        )}
        <HomeStack.Screen
          name="SignupLogin2"
          component={SignupLogin2}
        ></HomeStack.Screen>
        <HomeStack.Screen
          name="SignupLogin3"
          component={SignupLogin3}
        ></HomeStack.Screen>
        <HomeStack.Screen name="Scan" component={Scan}></HomeStack.Screen>
        <HomeStack.Screen
          name="ManagePrescriptions"
          component={ManagePrescriptions}
        ></HomeStack.Screen>
        <HomeStack.Screen
          name="CustomerSupport1"
          component={CustomerSupport1}
        ></HomeStack.Screen>
        <HomeStack.Screen
          name="CustomerFeedBack1"
          component={CustomerFeedBack1}
        ></HomeStack.Screen>
        <HomeStack.Screen
          name="ReminderScheduling"
          component={ReminderScheduling}
        ></HomeStack.Screen>
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default HomeNavigator;
