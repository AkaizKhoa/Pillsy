import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useContext, useEffect,  } from "react";
import LockPasswordIcon from "../assets/icon/forgotpassword_1_icon.svg";
import { useNavigation } from "@react-navigation/native";


import { BASE_URL } from "../config";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function ForgotPassword1() {
  const navigation = useNavigation();
  const [email, setEmail] = useState(null);

  // const handleSubmit = (email) => {
  //   validateForm();

  //   if (isFormValid) {
  //     axios
  //       .post(`${BASE_URL}/api/v1/accounts/private/manage-password`, {
  //         accountId: accountId,
  //         oldPassword: oldPassword,
  //         newPassword: newPassword,

  //       }, {
  //         headers: {
  //           'Authorization': 'Bearer ' + userToken
  //         }
  //       })
  //       .then((res) => {
  //         const statusCode = res.status;
  //         const responseData = res.data;
  //         console.log("Response Data:", responseData);

  //         if (statusCode === 200) {
  //           setModalVisible(true)
            
  //           console.log("Password changed successfully");
  //         } else {
  //           console.log("Password change failed");

  //         }
  //       }
  //       )
  //       .catch((e) => {
  //         console.log(`Change pass word error ${e}`);
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //     // Form is valid, perform the submission logic 
  //     console.log('Form submitted successfully!');
  //   } else {

  //     // Form is invalid, display error messages 
  //     console.log('Form has errors. Please correct them.');
  //   }
  // };




  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.screen}>
        <KeyboardAvoidingView style={styles.screen} behavior="position">
          <View style={styles.container}>
            <View style={styles.containerForgotPassword}>
              <LockPasswordIcon width={50} height={50} style={styles.icon} />
              <Text style={styles.forgotTitleText}>Forgot Password</Text>
              <Text style={styles.forgotDescriptionText}>
                Please enter your email address to request a password reset
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="user@gmail.com"
                  placeholderTextColor={"#000000"}
                  style={styles.input}
                />
              </View>

              {/* HANDLE TO NAVIGATE USER TO NEXT FORGOTPASSWORD_PAGE (Verification code)*/}
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  navigation.navigate("ForgotPassword3");
                }}
              >
                <Text style={styles.buttonText}>Send</Text>
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
    height: 500,
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
