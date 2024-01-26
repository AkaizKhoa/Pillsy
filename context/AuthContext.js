import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { jwtDecode } from "jwt-decode";

import "core-js/stable/atob";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [profile, setProfile] = useState(null);
  const isLogggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      let userToken = await AsyncStorage.getItem("userToken");
      let storedProfile = await AsyncStorage.getItem("profile");
  
      userInfo = JSON.parse(userInfo);
      setUserToken(userToken);
      setUserInfo(userInfo);
  
      // Parse the stored profile back into an object
      setProfile(JSON.parse(storedProfile));
      console.log(userInfo);
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
    axios
      .post(`${BASE_URL}/api/v1/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        let userInfo = jwtDecode(res.data);
        setUserInfo(userInfo);
        setUserToken(res.data);
        fetchData()
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
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
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("profile");

    setIsLoading(false);
  };



  const fetchData = async () => {
    try {
      setIsLoading(true);
  
      const response = await axios.get(`${BASE_URL}/api/v1/patients/${userInfo.PatientId}`, {
        headers: {
          'Authorization': 'Bearer ' + userToken
        }
      });
  
      let profile = response.data;
      setProfile(profile);
  
      // Convert the profile object to a JSON string before storing in AsyncStorage
      AsyncStorage.setItem("profile", JSON.stringify(profile));
      console.log(profile);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo, profile }}>
      {children}
    </AuthContext.Provider>
  );
};