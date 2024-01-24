import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

import { AuthContext } from "../context/AuthContext";


export default function ProfileUserDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  const { userInfo } = useContext(AuthContext);
  const { userToken } = useContext(AuthContext);

  


  useEffect(() => {
    // Define an async function inside the useEffect
    const fetchData = async () => {
      try {
        setIsLoading(true);
  
        // You can await asynchronous operations here
        const response = await axios.get(`${BASE_URL}/api/v1/patients/${userInfo.AccountId}`, {
          headers: {
            'Authorization': 'Bearer ' + userToken
          }
        });
  
        // Process the data or update the state
        console.log(JSON.stringify(response));
      } catch (error) {
        // Handle errors if necessary
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    // Call the async function immediately
    fetchData();
  
    // Specify dependencies if needed, like userInfo.AccountId or userToken
  }, []);
  



  

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.containerUserPhoto}>
          <TouchableOpacity
            onPress={() => {
              // Update User Image
            }}
          >
            <View style={styles.containerImage}>
              {/* IF USER UPDATE THEIR IMAGE WILL BE DISPLAY AT HERE - IMPLEMET LOGIC LATER */}
              <Feather name="user" size={24} color="white" />
            </View>
            {/* <View style={styles.iconCamera}>
                <Feather name="camera" size={16} color="black" />
              </View> */}
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ textAlign: "center" }}></Text>
        </View>

        <View style={styles.containerUserInformation}>
          <View style={styles.userInformationTitle}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              User Information
            </Text>
          </View>
          <View style={styles.userInformationDetailBox}>
            {/* FULL NAME */}
            <View style={styles.userInformationBoxItem}>
              <Text style={{ fontSize: 14, color: "#858C94" }}>Full Name</Text>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                User's Name
              </Text>
            </View>
            {/* EMAIL */}
            <View style={styles.userInformationBoxItem}>
              <Text style={{ fontSize: 14, color: "#858C94" }}>Email</Text>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                username@gmail.com
              </Text>
            </View>
            {/* AGE */}
            <View style={styles.userInformationBoxItem}>
              <Text style={{ fontSize: 14, color: "#858C94" }}>Age</Text>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                User's Age
              </Text>
            </View>
            {/* GENDER */}
            <View style={[styles.userInformationBoxItem, { marginBottom: 0 }]}>
              <Text style={{ fontSize: 14, color: "#858C94" }}>Gender</Text>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                User's Gender
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  container: {
    flex: 1,
    alignItems: "center",
    margin: 20,
  },
  containerUserPhoto: {
    // position: "relative",
  },
  containerUserInformation: {
    width: "100%",
    marginTop: 20,
  },
  containerImage: {
    backgroundColor: "#9DA7C0",
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  //   iconCamera: {
  //     backgroundColor: "#FFF",
  //     padding: 5,
  //     borderRadius: 50,
  //     top: 50,
  //     left: 40,
  //     position: "absolute",
  //   },
  userInformationTitle: {},
  userInformationDetailBox: {
    flexDirection: "column",
    width: "100%",
    marginTop: 10,
    padding: 15,
    borderRadius: 20,
    backgroundColor: "#FFF",
  },
  userInformationBoxItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

});