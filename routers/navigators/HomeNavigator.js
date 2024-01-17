import { View, Text } from "react-native";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../../components/MainScreen";
import { NavigationContainer } from "@react-navigation/native";
import Scan from "../../components/Scan";
import ManagePrescriptions from "../../components/ManagePrescriptions";

const HomeNavigator = () => {

  const HomeStack = createNativeStackNavigator();

  const [auth, setAuth] = useState(false);


  return (
    <NavigationContainer>
      <HomeStack.Navigator initialRouteName="MainScreen"  screenOptions={{headerTransparent: true, headerShown: false }}>
        <HomeStack.Screen name="MainScreen" component={MainScreen} ></HomeStack.Screen>
        <HomeStack.Screen name="Scan" component={Scan} ></HomeStack.Screen>
        <HomeStack.Screen name="ManagePrescriptions" component={ManagePrescriptions}></HomeStack.Screen>


      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default HomeNavigator;
