import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  // const [userInfo, setUserInfo] = useState(null);

  const isLogggedIn = async () => {
    try {
      // setIsLoading(true);
      // let userInfo = await AsyncStorage.getItem("userInfo");
      // let userToken = await AsyncStorage.getItem("userToken");
      // userInfo = JSON.parse(userInfo);
      // if (userInfo) {
        // setUserToken(userToken);
        // setUserInfo(userInfo);
      // }



      setIsLoading(true);
      // let userInfo = await AsyncStorage.getItem("userInfo");
      let userToken = await AsyncStorage.getItem("userToken");
      // userInfo = JSON.parse(userInfo);
        setUserToken(userToken);
        // setUserInfo(userInfo);

    } catch (error) {
      console.log(`isLogged in error ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLogggedIn();
  }, []);

  const login = (email, password) => {
    setIsLoading(true);
    console.log(email);
    console.log(password);
    axios
      .post(`${BASE_URL}/api/v1/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        // let userInfo = res.data;
        // setUserInfo(userInfo);
        // setUserToken(userInfo.data.token);
        setUserToken(res.data);

        // AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        // AsyncStorage.setItem("userToken", userInfo.data.token);
        AsyncStorage.setItem("userToken", res.data);

      })
      .catch((e) => {
        console.log(`Login error ${e}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    // AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};