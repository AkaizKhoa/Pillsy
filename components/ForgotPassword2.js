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
import React, { useContext, useState, useEffect } from "react";
import VerifyIcon from "../assets/icon/forgotpassword_2_icon.svg";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../config";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
export default function ForgotPassword2({ route }) {
  const navigation = useNavigation();
  const { email , tokenCheck } = route.params;
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const { userToken } = useContext(AuthContext)

  useEffect(() => {


    validateForm();
  }, [token]);


  const validateForm = () => {
    let errors = {};

    // Validate name field 
    if (!token) {
      errors.token = '*Token is required.';
    } else if (token.length <= 5 || token.length > 6) {
      errors.token = '*Token must 6 Number.';
    }


    // Set the errors and update form validity 
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const sendToken = (token) => {
    validateForm();

    if (isFormValid) {
      axios
        .get(`${BASE_URL}/api/v1/accounts/reset-password/?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`)
        .then((res) => {
          const statusCode = res.status;
          const responseData = res.data;
          console.log("Response Data:", responseData);

          if (statusCode === 200) {

            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Success',
              textBody: 'Check your Email tok get OTP.',
              button: 'Next',
              onPressButton: (() => {
                navigation.navigate("ForgotPassword3",
                  {
                    token: token,
                    email: email
                  });

              })
            })


            console.log("Token send token successfully");
          } else {
            console.log("Token send token failed");

          }
        }
        )
        .catch((e) => {
          console.log(`Token and email send token error ${e}`);
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Fail',
            textBody: 'Your token is fail. Go back to try again.',
            button: 'close',
          })
        })
        .finally(() => {
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
                <VerifyIcon width={50} height={50} style={styles.icon} />
                <Text style={styles.forgotTitleText}>Verification Code</Text>
                <Text style={styles.forgotDescriptionText}>
                  Please type the verification code send to user@gmail.com
                </Text>

                <View style={{ width: "80%", justifyContent: "flex-start" }}>
                  <Text style={styles.error}>{errors.token}</Text>
                </View>
                <View style={styles.inputContainer}>

                  <TextInput
                    placeholder="Enter verification code here..."
                    keyboardType="number-pad"
                    placeholderTextColor={"#000000"}
                    style={styles.input}
                    value={token}
                    onChangeText={(text) => setToken(text)}
                  />
                </View>

                {/* HANDLE TO NAVIGATE USER TO NEXT FORGOTPASSWORD PAGE (Create New Password)*/}
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => {
                    sendToken(token)
                  }}
                  disabled={!isFormValid}

                >
                  <Text style={styles.buttonText}>Verify</Text>
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
