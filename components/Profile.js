import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const Profile = () => {

  const { logout } = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        {/* UPPER */}
        <View style={styles.containerUpper}>
          <View style={styles.containeUpperText}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginLeft: 20,
                color: "white",
              }}
            >
              Account
            </Text>
          </View>
          <TouchableOpacity
            style={styles.touchAbleItemUpper}
            onPress={() => {
              navigation.navigate("ProfileUserDetail");
            }}
          >
            <View style={styles.containerUser}>
              <View style={styles.imageContainer}>
                {/* IF USER UPDATE THEIR IMAGE WILL BE DISPLAY AT HERE - IMPLEMET LOGIC LATER */}
                <Feather name="user" size={24} color="white" />
              </View>
              <View style={styles.userInfoContainer}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {userInfo.Username}

                </Text>
                <Text style={{ fontSize: 16, color: "#9DA7C0", marginTop: 5 }}>
                  {userInfo.Email}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {/* BELOW */}
        <View style={styles.containerBelow}>
          <TouchableOpacity
            style={{ ...styles.touchAbleItemBelow }}
            onPress={() => {
              Linking.openURL("https://www.facebook.com/pillsyhealth");
            }}
          >
            <View style={styles.containerMedia}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Follow Us On Social Media
              </Text>
              <View style={styles.containerMediaIcon}>
                <FontAwesome5 name="facebook" size={24} color="blue" />
              </View>
            </View>
          </TouchableOpacity>
          {/* Change Password */}
          <TouchableOpacity
            style={styles.touchAbleSettingItem}
            onPress={() => {
              navigation.navigate("ChangePassword");
            }}
          >
            <View style={styles.containerSettingsItem}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="lock" size={24} color="#282828" />
                <Text
                  style={{ fontSize: 16, color: "#282828", marginLeft: 10 }}
                >
                  Change Password
                </Text>
              </View>
              <Feather name="chevron-right" size={24} color="#282828" />
            </View>
          </TouchableOpacity>
          {/* Change Language */}
          <TouchableOpacity
            style={styles.touchAbleSettingItem2}
            onPress={() => {
              // Add your action here
            }}
          >
            <View style={styles.containerSettingsItem}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome name="language" size={24} color="#282828" />
                <Text
                  style={{ fontSize: 16, color: "#282828", marginLeft: 10 }}
                >
                  Change Language
                </Text>
              </View>
              <Feather name="chevron-right" size={24} color="#282828" />
            </View>
          </TouchableOpacity>
          {/* Change FontSize */}
          <TouchableOpacity
            style={styles.touchAbleSettingItem3}
            onPress={() => {
              // Add your action here
            }}
          >
            <View style={styles.containerSettingsItem}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="format-font-size-increase"
                  size={24}
                  color="#282828"
                />
                <Text
                  style={{ fontSize: 16, color: "#282828", marginLeft: 10 }}
                >
                  Change Fontsize
                </Text>
              </View>
              <Feather name="chevron-right" size={24} color="#282828" />
            </View>
          </TouchableOpacity>
          {/* LogOut */}
          <TouchableOpacity
            style={styles.touchAbleSettingItem4}
            onPress={() => {
              // Add your action here
              logout();

            }}
          >
            <View style={styles.containerSettingsItem2}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  touchAbleItemUpper: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    position: "absolute",
  },
  touchAbleItemBelow: {
    borderColor: "red",
    flex: 1,
    width: "100%",
    height: "13%",
    alignItems: "center",
    position: "absolute",
  },
  touchAbleSettingItem: {
    flex: 1,
    width: "100%",
    height: "10%",
    position: "absolute",
    top: 100,
  },
  touchAbleSettingItem2: {
    flex: 1,
    width: "100%",
    height: "10%",
    position: "absolute",
    top: 175,
  },
  touchAbleSettingItem3: {
    flex: 1,
    width: "100%",
    height: "10%",
    position: "absolute",
    top: 250,
  },
  touchAbleSettingItem4: {
    flex: 1,
    width: "60%",
    height: "10%",
    position: "absolute",
    top: 350,
    backgroundColor: "#A1A2D8",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    borderRadius: 40,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    flexDirection: "column",
    borderColor: "yellow",
  },
  containerUpper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A1A2D8",
    flexDirection: "column",
    width: "100%",
    height: 200,
    position: "relative",
    marginBottom: 80,
  },
  containerBelow: {
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    position: "relative",
  },
  containeUpperText: {
    textAlign: "center",
    width: "100%",
  },
  containerUser: {
    backgroundColor: "#FFF",
    width: "90%",
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    position: "absolute",
    top: 150,
  },
  containerMedia: {
    backgroundColor: "#FFF",
    width: "90%",
    padding: 20,
    borderRadius: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  containerMediaIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  containerSettingsItem: {
    width: "90%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  containerSettingsItem2: {
    width: "90%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  settingItem: {
    position: "absolute",
  },
  imageContainer: {
    backgroundColor: "#9DA7C0",
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  userInfoContainer: {
    marginLeft: 20,
  },
});
