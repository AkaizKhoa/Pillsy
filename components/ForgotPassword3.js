import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform
} from "react-native";
import React from "react";
import VerifyIcon from "../assets/icon/forgotpassword_2_icon.svg";
import { useNavigation } from "@react-navigation/native";

export default function ForgotPassword3() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.screen}>
        <KeyboardAvoidingView style={styles.screen} behavior="position">
          <View style={styles.container}>
            <View style={styles.containerForgotPassword}>
              <VerifyIcon width={50} height={50} style={styles.icon} />
              <Text style={styles.forgotTitleText}>New Password</Text>
              <Text style={styles.forgotDescriptionText}>
                Please type the new password and confirm new password
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="New Password"
                  placeholderTextColor={"#000000"}
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Confirm New Password"
                  placeholderTextColor={"#000000"}
                  style={styles.input}
                />
              </View>

              {/* HANDLE TO NAVIGATE USER TO NEXT FORGOTPASSWORD PAGE (Create New Password)*/}
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  navigation.navigate("ForgotPassword3");
                }}
              >
                <Text style={styles.buttonText}>Verify</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    top: 100,
    height: Platform.OS === "ios" ? 500 : 600,
  },
  containerForgotPassword: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  icon: {
    marginBottom: 40,
  },
  forgotTitleText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  forgotDescriptionText: {
    fontSize: 16,
    color: "#9796A1",
    textAlign: "center",
  },
  inputContainer: {
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    backgroundColor: "#F7F7F7",
    borderColor: "#C5C5C5",
    width: 300,
    height: 50,
    borderRadius: 5,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#03358C",
    width: 300,
    height: 50,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
