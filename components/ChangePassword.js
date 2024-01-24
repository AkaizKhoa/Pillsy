import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function ChangePassword() {
  const [secureTextEntryCurrentPassword, setSecureTextEntryCurrentPassword] =
    useState(true);
  const [secureTextEntryNewPassword, setSecureTextEntryNewPassword] =
    useState(true);
  const [
    secureTextEntryConfirmNewPassword,
    setSecureTextEntryConfirmNewPassword,
  ] = useState(true);
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
          <View style={styles.container}>
            <View style={styles.containerText}>
              <Text
                style={{ fontWeight: "700", fontSize: 20, marginBottom: 10 }}
              >
                Change Password
              </Text>
              <Text style={{ fontSize: 16, textAlign: "left" }}>
                Password must be at least 8 characters and include 4 characters:
                uppercase letters, lowercase letters, numbers, special
                characters.
              </Text>
            </View>

            <View style={styles.containerChangePassword}>
              <View style={styles.containerInputOuter}>
                {/* CURRENT PASSWORD */}
                <View style={styles.containerInput}>
                  <View style={styles.containerInputLeft}>
                    <Feather
                      name="lock"
                      size={24}
                      color="#282828"
                      style={{ marginRight: 10 }}
                    />
                    <TextInput
                      placeholder="Current Password"
                      secureTextEntry={secureTextEntryCurrentPassword}
                      style={styles.inputItem}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      setSecureTextEntryCurrentPassword(
                        (prevState) => !prevState
                      )
                    }
                  >
                    <Feather
                      name={secureTextEntryCurrentPassword ? "eye" : "eye-off"}
                      size={24}
                      color="#282828"
                    />
                  </TouchableOpacity>
                </View>
                {/* NEW PASSWORD */}
                <View style={styles.containerInput}>
                  <View style={styles.containerInputLeft}>
                    <Feather
                      name="lock"
                      size={24}
                      color="#282828"
                      style={{ marginRight: 10 }}
                    />
                    <TextInput
                      placeholder="New Password"
                      secureTextEntry={secureTextEntryNewPassword}
                      style={styles.inputItem}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      setSecureTextEntryNewPassword((prevState) => !prevState)
                    }
                  >
                    <Feather
                      name={secureTextEntryNewPassword ? "eye" : "eye-off"}
                      size={24}
                      color="#282828"
                    />
                  </TouchableOpacity>
                </View>
                {/* CONFIRM NEW PASSWORD */}
                <View style={styles.containerInput}>
                  <View style={styles.containerInputLeft}>
                    <Feather
                      name="lock"
                      size={24}
                      color="#282828"
                      style={{ marginRight: 10 }}
                    />
                    <TextInput
                      placeholder="Confirm New Password"
                      secureTextEntry={secureTextEntryConfirmNewPassword}
                      style={styles.inputItem}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      setSecureTextEntryConfirmNewPassword(
                        (prevState) => !prevState
                      )
                    }
                  >
                    <Feather
                      name={
                        secureTextEntryConfirmNewPassword ? "eye" : "eye-off"
                      }
                      size={24}
                      color="#282828"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* CONFIRMBUTTON */}
              <TouchableOpacity 
              style={styles.containerButton}
              onPress={() => {
                // Add your action here
              }}
              >
                <Text style={{fontSize: 18, fontWeight: "700", color: "white"}}>Confirm</Text>
              </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
    flexDirection: "column",
    marginTop: Platform.OS === "ios" ? 20 : 80,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  containerText: {
    flexDirection: "column",
    width: "100%",
  },
  containerChangePassword: {
    marginTop: 20,
    width: "100%",
    justifyContent: "space-between",
  },
  containerInput: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginBottom: 40,
    paddingBottom: 10,
    borderWidth: 0.5,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  containerInputLeft: {
    flexDirection: "row",
    width: "90%",
  },
  containerInputOuter: {
    marginTop: 20,
  },
  inputItem: {
    fontSize: 18,
    maxWidth: "85%",
  },
  containerButton:{
    backgroundColor: "#A1A2D8",
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
