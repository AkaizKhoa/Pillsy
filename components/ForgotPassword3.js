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
import React, { useContext, useState, useEffect } from "react";
import VerifyIcon from "../assets/icon/forgotpassword_2_icon.svg";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

import axios from "axios";
import { BASE_URL } from "../config";

export default function ForgotPassword3({route}) {
  const navigation = useNavigation();
  const {email, token} = route.params
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setComfirmPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {


    validateForm();
  }, [ newPassword, confirmPassword]);

  const validateForm = () => {
    let errors = {};


    // Validate email field 
    if (!newPassword) {
      errors.newPassword = '*NewPassword is required.';
    } else if (newPassword.length < 6) {
      errors.newPassword = '*NewPassword must be at least 6 characters.';
    }
    
    if (!confirmPassword) {
      errors.confirmPassword = '*Confirm Password is required.';
    }else if (confirmPassword !== newPassword) {
      errors.confirmPassword = '*Confirm Password is not match';
    }


    // Set the errors and update form validity 
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };



  const createNewPassword = (newPassword, confirmPassword) => {
    validateForm();

    if (isFormValid) {
      setIsLoading(true);
      console.log('====================================');
      console.log(newPassword, confirmPassword);
      console.log('====================================');
      axios
        .post(`${BASE_URL}/api/v1/accounts/reset-password`, {
          password: newPassword,
          confirmPassword: confirmPassword,
          email: email,
          token: token

        })
        .then((res) => {
          // const statusCode = res.status;
          const responseData = res.data;
          console.log("Response Data:", responseData);
          console.log("Status" , res.status);
          if (res.status === 200) {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Create new password is success!',
              textBody: 'Password is ready to use. Go to Login',
              button: 'close',
              onPressButton: () => {
                navigation.navigate('SignupLogin2'); // Thực hiện điều hướng sau khi đóng Dialog
              },
            })
            setNewPassword(null);
            setComfirmPassword(null);
            console.log("Password changed successfully");
          } else {
            return
          }
        }
        )
        .catch((e) => {
          console.log(`Create new password error ${e}`);
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Create new password is fail!',
            textBody: 'Something error , try again',
            button: 'close',
            
          })
        })
        .finally(() => {
          setIsLoading(false);
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
              <Text style={styles.forgotTitleText}>New Password</Text>
              <Text style={styles.forgotDescriptionText}>
                Please type the new password and confirm new password
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="New Password"
                  placeholderTextColor={"#000000"}
                  style={styles.input}
                  value={newPassword}
                  onChangeText={(text) => setNewPassword(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Confirm New Password"
                  placeholderTextColor={"#000000"}
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={(text) => setComfirmPassword(text)}
                />
              </View>

              {/* HANDLE TO NAVIGATE USER TO NEXT FORGOTPASSWORD PAGE (Create New Password)*/}
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  createNewPassword(newPassword, confirmPassword)
                }}
              >
                <Text style={styles.buttonText}>Confirm</Text>
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
