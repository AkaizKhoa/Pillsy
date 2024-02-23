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
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

import { BASE_URL } from "../config";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function ForgotPassword1() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState(null);
  const [tokenCheck, setTokenCheck] = useState(null)
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const {userToken} = useContext(AuthContext)


  useEffect(() => {
    validateForm();
  }, [email]);


  const validateForm = () => {
    let errors = {};

    // Validate name field 
    if (!email) {
      errors.email = '*Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email format.';
    }


    // Set the errors and update form validity 
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const sendEmail = (email) => {
    validateForm();
    console.log("Email: ", email);
    console.log("Request Payload:", { email });

    if (isFormValid) {
      setIsLoading(true)
      axios
        .post(`${BASE_URL}/api/v1/accounts/forgot-password?email=${encodeURIComponent(email)}`)
        .then((res) => {
          const statusCode = res.status;
          const responseData = res.data;
          console.log("Response Data:", responseData);

          if (statusCode === 200) {
            console.log('====================================');
            console.log(tokenCheck);
            console.log('====================================');
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Success',
              textBody: 'Check your Email to get OTP.',
              button: 'Next',
              onPressButton: (() => {
              navigation.navigate("ForgotPassword2", {
              email: email,
              tokenCheck: tokenCheck
            });
            
              })
            })
            
            console.log(" Email send token successfully");
          } else {
            console.log(" Email send token failed");
          
          }
        }
        )
        .catch((e) => {
          console.log(` Email send token error ${e}`);
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Fail',
            textBody: 'Your email is not exist. Try again.',
            button: 'Close',
          })
        })
        .finally(() => {
          setIsLoading(false)
        });
      // Form is valid, perform the submission logic 
      console.log('Form submitted successfully!');
    } else {

      // Form is invalid, display error messages 
      console.log('Form has errors. Please correct them.');
    }
  };




  return (
    <AlertNotificationRoot>
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
              <View style={{width: "80%", justifyContent: "flex-start"}}>
              <Text style={styles.error}>{errors.email}</Text>
              </View>
              <View style={styles.inputContainer}>

                <TextInput
                  placeholder="user@gmail.com"
                  placeholderTextColor={"#000000"}
                  style={styles.input}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>

              {/* HANDLE TO NAVIGATE USER TO NEXT FORGOTPASSWORD_PAGE (Verification code)*/}
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  sendEmail(email)
                }}
                 disabled={!isFormValid}

              >
                <Text style={styles.buttonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
    </AlertNotificationRoot>
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

  error: {
    color: 'red',
    fontSize: 13,
    fontWeight: "600"
  },
});
