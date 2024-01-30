import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useFonts } from "expo-font";
import ArrowBackLeft from "../assets/icon/arrow_back_left.svg";
import UserIcon from "../assets/icon/user_icon.svg";
import EmailIcon from "../assets/icon/email_icon.svg";
import MessageIcon from "../assets/icon/message_icon.svg";
import { useNavigation } from "@react-navigation/native";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";

export default function InputInformation1() {
  //Navigation
  //   const navigation = useNavigation();

  // AGE HANDLER
  const [age, setAge] = useState("");
  const [isAgeValid, setIsAgeValid] = useState(true);
  const handleAgeChange = (newAge) => {
    if (newAge >= 1 && newAge <= 100) {
      setIsAgeValid(true);
    } else {
      setIsAgeValid(false);
    }
    setAge(newAge);
  };
  // GENDER HANDLER
  const [gender, setGender] = React.useState([]);
  const genderData = [
    { key: "Male", value: "Male" },
    { key: "Female", value: "Female" },
  ];

  // FONT
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return undefined;
  }
  return (
    <View style={styles.container}>
      <View style={styles.arrowBackContainer}>
        <Pressable
          style={({ pressed }) => pressed && styles.pressedItem}
          //     onPress={() => {
          //       navigation.navigate("MainScreen")

          //   }}
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
              <View style={styles.fullNameInputContainer}>
                <Text style={styles.labelInput}>Full Name</Text>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Your full name"
                />
              </View>

              <View style={styles.emailInputContainer}>
                <Text style={styles.labelInput}>Email</Text>

                <TextInput
                  style={styles.inputStyle}
                  keyboardType="email-address"
                  placeholder="Your email"
                />
              </View>

              <View style={styles.emailInputContainer}>
                <Text style={styles.labelInput}>Age</Text>
                <TextInput
                  style={
                    isAgeValid ? styles.inputStyle : styles.inputErrorStyle
                  }
                  keyboardType="number-pad"
                  placeholder="Your Age"
                  value={age}
                  onChangeText={handleAgeChange}
                />
                {!isAgeValid && (
                  <Text style={styles.errorText}>
                    Age must be between 1 and 100
                  </Text>
                )}
              </View>

              <View style={styles.emailInputContainer}>
                <Text style={styles.labelInput}>Gender</Text>
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
              >
                <Text style={[styles.buttonText, { fontFamily: "Inter-Bold" }]}>
                  Complete
                </Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    marginTop: 60,
    flexDirection: "column",
    flex: 1,
  },
  arrowBackContainer: {
    marginLeft: 20,
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

  fullNameInputContainer: {
    flexDirection: "column",
    borderColor: "#000",
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
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
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
});
