import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import React, { useState, useContext } from "react";
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
import { AuthContext } from "../../context/AuthContext";
import ProfileUserDetail from "../../components/ProfileUserDetail";
import ChangePassword from "../../components/ChangePassword";
import InputInformation1 from "../../components/InputInformation1";
import ForgotPassword1 from "../../components/ForgotPassword1";
import ForgotPassword2 from "../../components/ForgotPassword2";
import ForgotPassword3 from "../../components/ForgotPassword3";
import ReminderNotifications from "../../components/ReminderNotifications";
import PaymentPackage from "../../components/PaymentPackage";
import { PaymentTabs } from "./PaymentTabs";

const HomeNavigator = () => {
  const HomeStack = createNativeStackNavigator();

  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <HomeStack.Navigator
        initialRouteName="SignupLogin1"
        screenOptions={{
          headerTransparent: true,
          headerShown: false,
          contentStyle: { backgroundColor: "#FFF" },
          animation: "default",
        }}
      >
        {userToken !== null ? (
          <HomeStack.Screen name="MainScreen" component={TabNavigator} />
        ) : (
          <HomeStack.Screen name="SignupLogin1" component={SignupLogin1} />
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
          name="ReminderNotifications"
          component={ReminderNotifications}
        ></HomeStack.Screen>
        {/* in this screen have top tabs */}
        <HomeStack.Screen
          name="PaymentPackage"
          component={PaymentTabs}
        ></HomeStack.Screen>
        <HomeStack.Screen
          name="ProfileUserDetail"
          component={ProfileUserDetail}
          options={{
            headerShown: true,
            headerTitle: "Profile Detail",
            headerStyle: { backgroundColor: "#FFF" },
          }}
        ></HomeStack.Screen>
        <HomeStack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            headerShown: true,
            headerTitle: "",
            headerStyle: { backgroundColor: "#FFF" },
          }}
        ></HomeStack.Screen>
        <HomeStack.Screen
          name="InputInformation1"
          component={InputInformation1}
        ></HomeStack.Screen>
        <HomeStack.Screen
          name="ForgotPassword1"
          component={ForgotPassword1}
          options={{
            headerShown: true,
            headerTitle: "",
            headerStyle: { backgroundColor: "#FFF" },
          }}
        ></HomeStack.Screen>
        <HomeStack.Screen
          name="ForgotPassword2"
          component={ForgotPassword2}
          options={{
            headerShown: true,
            headerTitle: "",
            headerStyle: { backgroundColor: "#FFF" },
          }}
        ></HomeStack.Screen>
        <HomeStack.Screen
          name="ForgotPassword3"
          component={ForgotPassword3}
          options={{
            headerShown: true,
            headerTitle: "",
            headerStyle: { backgroundColor: "#FFF" },
          }}
        ></HomeStack.Screen>
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default HomeNavigator;
