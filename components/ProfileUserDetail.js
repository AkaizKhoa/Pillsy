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
  import React, { useState } from "react";
  
  export default function ProfileUserDetail() {
  
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
              <View style={[styles.userInformationBoxItem, {marginBottom: 0}]}>
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