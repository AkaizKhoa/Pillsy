import React, { useState, useContext, useEffect, } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image
} from "react-native";
import { useFonts } from "expo-font";
import ArrowBackLeft from "../assets/icon/arrow_back_left.svg";
import UserIcon from "../assets/icon/user_icon.svg";
import EmailIcon from "../assets/icon/email_icon.svg";
import MessageIcon from "../assets/icon/message_icon.svg";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../config";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import DatePicker from "react-native-modern-datepicker"
import { getToday, getFormatedDate } from "react-native-modern-datepicker";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

import moment from 'moment';
export default function InputInformation1({ route }) {
  //Navigation
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false)

  // AGE HANDLER
  // const [age, setAge] = useState("");
  // const [isAgeValid, setIsAgeValid] = useState(true);
  // const handleAgeChange = (newAge) => {
  //   if (newAge >= 1 && newAge <= 100) {
  //     setIsAgeValid(true);
  //   } else {
  //     setIsAgeValid(false);
  //   }
  //   setAge(newAge);
  // };
  // GENDER HANDLER
  const [openDate, setOpenDate] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});

  const today = new Date();
  // const endDate = getFormatedDate(today.setDate(today.getDate()), 'DD/MM/YYYY')

  let endDate = moment(today.setDate(today.getDate()), 'DD-MM-YYYY').format('DD-MM-YYYY')

  const { email, password } = route.params;
  const [gender, setGender] = React.useState([]);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");

  const genderData = [
    { key: "Nữ", value: "Nữ" },
    { key: "Nam", value: "Nam" },
    { key: "Khác", value: "Khác" },
  ];
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {


    validateForm();
  }, [firstName, lastName, dateOfBirth, gender, phoneNumber, address]);



  const validateForm = () => {
    let errors = {};

    // Validate name field 
    if (!firstName) {
      errors.firstName = '*FirstName is required.';
    }
    if (!lastName) {
      errors.lastName = '*LastName is required.';
    }

    if (!dateOfBirth) {
      errors.dateOfBirth = '*DateOfBirth is required.';
    }
    if (!address) {
      errors.address = '*Address is required.';
    }
    if (!phoneNumber) {
      errors.phoneNumber = '*PhoneNumber is required.';
    } else if (phoneNumber.length > 10 || phoneNumber.length < 9) {
      errors.phoneNumber = '*Phone number must have 10 digits'
    }
    if (gender.length === 0) {
      errors.gender = '*Gender is required.';
    }


    // Set the errors and update form validity 
    setErrors(errors);
    console.log("So loi co dc: ", Object.keys(errors).length);

    setIsFormValid(Object.keys(errors).length === 0);
  };

  const signUp =  async (firstName, lastName, dateOfBirth, gender, phoneNumber, address) => {
     validateForm();
    console.log(errors);
    console.log(isFormValid);
    console.log(dateOfBirth);
    setIsLoading(true);
    if (isFormValid) {
      await axios
        .post(`${BASE_URL}/api/v1/patients/sign-up`, {
          email: email,
          password: password,
          role: "Patient",
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: dateOfBirth,
          gender: gender,
          phoneNumber: phoneNumber,
          address: address

        })
        .then((res) => {

          const responseData = res.data;
          console.log("Response Data:", responseData);

          if (res.status === 200) {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Create Account is success!',
              textBody: 'You are ready to using Pillsy. ',
              button: 'close',
              onPressButton: navigation.navigate("SignupLogin2")
            })

            console.log("SignUp successfully");
          } else {
            console.log("SignUp failed");

          }
        }
        )
        .catch((e) => {
          console.log(`SignUp error ${e}`);
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'SignUp is fail!',
            textBody: 'Something error, please check your email again',
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


  function handleOnPress() {
    setOpenDate(!openDate)

  }
  function handleChangeDate(propDate) {
    const selectedDate = moment(propDate, 'YYYY/MM/DD');
    const currentDate = moment();

    // Kiểm tra xem ngày sinh được chọn có lớn hơn ngày hiện tại không
    if (selectedDate.isAfter(currentDate)) {
      // Nếu có, hiển thị thông báo lỗi và không cho phép ghi nhận ngày đó
      Alert.alert(
        'Error',
        'Please select a valid date of birth.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    } else {
      // Nếu không, ghi nhận ngày sinh
      const formattedDate = selectedDate.format('DD/MM/YYYY');
      console.log(formattedDate);
      setDateOfBirth(formattedDate);
      setOpenDate(false); // Đóng modal ngày sinh sau khi chọn
    }
  }







  // FONT
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return undefined;
  }











  return (
    <AlertNotificationRoot>

      {isLoading ? ( <ImageBackground source={require("../assets/edit_background_3.jpg")} style={{ flex: 1 }} resizeMode="cover">

<View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 20, }}>
  <View >
    <Text style={{ fontSize: 30, fontWeight: "700", color: "#fff", }}>P I L L S Y</Text>
  </View>
  <Image source={require("../assets/loading/giphy5.gif")} />
  <Text style={{ fontSize: 20, fontWeight: "600" }}>Chờ trong giây lát nhé....</Text>
  <View style={{ padding: 10, borderWidth: 1, borderColor: "#000", backgroundColor: "#B6FFFA", borderRadius: 10 }}>
    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#211951" }}>
      Bạn có biết:
    </Text>
    <Text style={{ fontStyle: "italic", fontSize: 15, fontWeight: "500", }}>
    "Sức khỏe không phải là thứ chúng ta có thể mua. Tuy nhiên, nó có thể là một tài khoản tiết kiệm cực kỳ giá trị." - Anne Wilson Schaef.

    </Text>
  </View>
</View>

</ImageBackground>) : (<View style={styles.container}>
        <View style={styles.arrowBackContainer}>
          <Pressable
            style={({ pressed }) => pressed && styles.pressedItem}
            onPress={() => {
              navigation.navigate("SignupLogin3")

            }}
          >
            <ArrowBackLeft />
          </Pressable>
        </View>
        <ScrollView style={styles.screen}>
          <KeyboardAvoidingView style={styles.screen} behavior="position">
            <View style={styles.contactContainer}>
              <Text style={[styles.contactText, { fontFamily: "Inter-Bold" }]}>
                Who are you?
              </Text>
              <Text
                style={[styles.contactSuggestText, { fontFamily: "Inter-Bold" }]}
              >
                Please provide more information about yourself
              </Text>

              <View style={styles.inputContainer}>
                <View style={styles.firstNameInputContainer}>
                  <Text style={styles.labelInput}>First Name</Text>
                  <Text style={styles.error}>{errors.firstName}</Text>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Your first name"
                    value={firstName}
                    onChangeText={text => setFirstName(text)}
                  />
                </View>
                <View style={styles.lastNameInputContainer}>
                  <Text style={styles.labelInput}>Last Name</Text>
                  <Text style={styles.error}>{errors.lastName}</Text>

                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Your last name"
                    value={lastName}
                    onChangeText={text => setLastName(text)}
                  />
                </View>
                <View style={styles.addressInputContainer}>
                  <Text style={styles.labelInput}>Address</Text>
                  <Text style={styles.error}>{errors.address}</Text>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Your address "
                    value={address}
                    onChangeText={text => setAddress(text)}
                  />
                </View>
                <View style={styles.phoneNumberInputContainer}>
                  <Text style={styles.labelInput}>PhoneNumber</Text>
                  <Text style={styles.error}>{errors.phoneNumber}</Text>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Your phoneNumber "
                    keyboardType="number-pad"
                    value={phoneNumber}
                    onChangeText={text => {
                      // Validate the input to ensure it is within the desired range
                      const number = parseInt(text, 10);
                      if (!isNaN(number) && (number <= 10 || number > 9)) {
                        setPhoneNumber(text);
                      }
                    }}
                  />
                </View>
                <View style={styles.dateOfBirthInputContainer}>
                  <Text style={styles.labelInput}>Date Of Birth</Text>
                  <Text style={styles.error}>{errors.dateOfBirth}</Text>

                  <View style={styles.selectedDob}>
                    <Pressable onPress={handleOnPress}>
                      <Text style={styles.selectedDateText}>Selected your date of birth</Text>
                    </Pressable>
                  </View>
                  <Text style={styles.resultDOB}>{dateOfBirth}</Text>
                  <Modal animationType="slide"
                    transparent={true}
                    visible={openDate}>
                    <View style={styles.centeredDateView}>
                      <View style={styles.modalDateView}>
                        <DatePicker
                          mode="calendar"
                          selected={dateOfBirth}
                          onDateChange={handleChangeDate}
                          maximumDate={endDate}
                        >

                        </DatePicker>


                        <Pressable onPress={handleOnPress}>
                          <Text>Close</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>

                </View>

                <View style={styles.emailInputContainer}>
                  <Text style={styles.labelInput}>Gender</Text>
                  <Text style={styles.error}>{errors.gender}</Text>

                  <SelectList
                    setSelected={setGender}
                    data={genderData}
                    label="Gender"
                    placeholder="Your Gender"
                    boxStyles={{
                      minWidth: 300,
                      maxWidth: 300,
                      maxHeight: 50,
                      backgroundColor: "#F3F3F3",
                    }}
                    maxHeight={100}
                    dropdownStyles={{ backgroundColor: "#F3F3F3" }}

                  />
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={({ pressed }) => [
                    styles.buttonStyle,
                    pressed ? styles.pressedItem : null,
                  ]}
                  onPress={
                    () => { signUp(firstName, lastName, dateOfBirth, gender, phoneNumber, address) }
                  }
                  disabled={!isFormValid}
                >
                  <Text style={[styles.buttonText, { fontFamily: "Inter-Bold" }]}>
                    Complete
                  </Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>

        </ScrollView>

      </View>)}
    </AlertNotificationRoot>

  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flexDirection: "column",
    flex: 1,
  },
  arrowBackContainer: {
    marginLeft: 20,
    marginTop: 20
  },
  pressedItem: {
    opacity: 0.5,
  },
  contactContainer: {
    marginTop: 30,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  contactText: {
    color: "#03358C",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
  },
  contactSuggestText: {
    width: 250,
    textAlign: "center",
    color: "#575757",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  firstNameInputContainer: {
    flexDirection: "column",
    borderColor: "#000",
  },
  lastNameInputContainer: {
    flexDirection: "column",
    borderColor: "#000",
  },
  addressInputContainer: {
    flexDirection: "column",
    borderColor: "#000",
  },
  phoneNumberInputContainer: {
    flexDirection: "column",
    borderColor: "#000",
  },

  dateOfBirthInputContainer: {
    marginTop: 10,
  },
  selectedDob: {
    backgroundColor: "#F3F3F3",
    width: 300,
    height: 50,
    paddingLeft: 10,
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 10
  },
  selectedDateText: {
    color: "#000"
  },
  resultDOB: {

  },
  labelInput: {
    color: "#575757",
    marginBottom: 10,
  },
  inputStyle: {
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 50,
    padding: 10,
  },
  inputErrorStyle: {
    borderColor: "red",
    borderWidth: 1,
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 50,
    padding: 10,
  },
  errorText: {
    color: "red",
  },
  iconStyle: {
    marginRight: 10,
  },

  emailInputContainer: {
    marginTop: 20,
    flexDirection: "column",
    borderColor: "#000",
  },

  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#017AFE",
    width: 300,
    height: 35,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.5,
  },








  //Modal Date
  centeredDateView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalDateView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },


  //error
  error: {
    color: 'red',
    fontSize: 13,
    fontWeight: "600"
  },
});
