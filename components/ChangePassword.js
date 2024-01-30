import React, { useState, useContext, useEffect,  } from "react";
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
  Modal,
  Pressable

} from "react-native";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { BASE_URL } from "../config";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

export default function ChangePassword() {
  const [secureTextEntryCurrentPassword, setSecureTextEntryCurrentPassword] =
    useState(true);
  const [secureTextEntryNewPassword, setSecureTextEntryNewPassword] =
    useState(true);
  const [
    secureTextEntryConfirmNewPassword,
    setSecureTextEntryConfirmNewPassword,
  ] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setComfirmPassword] = useState(null);
  const { userInfo } = useContext(AuthContext);
  const { userToken } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation();

  const accountId = userInfo.AccountId;

  useEffect(() => {


    validateForm();
  }, [oldPassword, newPassword, confirmPassword]);




  const validateForm = () => {
    let errors = {};

    // Validate name field 
    if (!oldPassword) {
      errors.oldPassword = '*OldPassword is required.';
    }

    // Validate email field 
    if (!newPassword) {
      errors.newPassword = '*NewPassword is required.';
    } else if (newPassword.length < 6) {
      errors.newPassword = '*NewPassword must be at least 6 characters.';
    }


    // Set the errors and update form validity 
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = (oldPassword, newPassword) => {
    validateForm();

    if (isFormValid) {
      setIsLoading(true);
      console.log('====================================');
      console.log(oldPassword, newPassword);
      console.log('====================================');
      axios
        .put(`${BASE_URL}/api/v1/accounts/private/manage-password`, {
          accountId: accountId,
          oldPassword: oldPassword,
          newPassword: newPassword,

        }, {
          headers: {
            'Authorization': 'Bearer ' + userToken
          }
        })
        .then((res) => {
          const statusCode = res.status;
          const responseData = res.data;
          console.log("Response Data:", responseData);

          if (statusCode === 200) {
            setModalVisible(true)
            
            console.log("Password changed successfully");
          } else {
            console.log("Password change failed");

          }
        }
        )
        .catch((e) => {
          console.log(`Change pass word error ${e}`);
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
    setModalVisible(true)
  };





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
                <Text style={styles.error}>{errors.oldPassword}</Text>

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
                      value={oldPassword}
                      onChangeText={text => setOldPassword(text)}
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
                <Text style={styles.error}>{errors.newPassword}</Text>

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
                      value={newPassword}
                      onChangeText={text => setNewPassword(text)}
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
                      value={confirmPassword}
                      onChangeText={text => setComfirmPassword(text)}
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
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                </View>
              </View>
            </View>
            {/* CONFIRMBUTTON */}
            <TouchableOpacity
              style={styles.containerButton}
              onPress={() => {
                // Add your action here
                handleSubmit(oldPassword, newPassword)

              }}
              disabled={!isFormValid}

            >
              <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }}>Confirm</Text>
            </TouchableOpacity>
            {/* Display error messages */}

          </View>
        </KeyboardAvoidingView>
      </ScrollView>



      <View style={styles.centeredView}>
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Your's password is changed successfully!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible),
                  navigation.navigate("MainScreen")
                }}>
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

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
  containerButton: {
    backgroundColor: "#A1A2D8",
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },




  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    
  },

// centeredViewTrue:{
//   justifyContent: 'center',
//   alignItems: 'center',
//   marginTop: 22,
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '100%',
//   backgroundColor: 'black',
//   opacity: 0.5,
// },


  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 13,
    fontWeight: "600"
  },
});
