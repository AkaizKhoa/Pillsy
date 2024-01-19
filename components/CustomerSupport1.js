import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import { useFonts } from "expo-font";
import ArrowBackLeft from "../assets/icon/arrow_back_left.svg";
import UserIcon from "../assets/icon/user_icon.svg";
import EmailIcon from "../assets/icon/email_icon.svg";
import MessageIcon from "../assets/icon/message_icon.svg";
import { useNavigation } from "@react-navigation/native";

export default function CustomerSupport1() {
  //Navigation
  const navigation = useNavigation();
  // MESSAGE HANDLE
  const [message, setMessage] = useState("");
  const charLimit = 250;
  const handleChangeMessage = (inputText) => {
    if (inputText.length <= charLimit) {
      setMessage(inputText);
    } else {
      Keyboard.dismiss();
    }
  };
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
        <Pressable style={({ pressed }) => pressed && styles.pressedItem}
        onPress={() => {
          navigation.navigate("MainScreen")

      }}
        >
          <ArrowBackLeft />
        </Pressable>
      </View>
      <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={styles.contactContainer}>
          <Text style={[styles.contactText, { fontFamily: "Inter-Bold" }]}>
            Contact us
          </Text>
          <Text
            style={[styles.contactSuggestText, { fontFamily: "Inter-Bold" }]}
          >
            If you have any questions we are happy to help
          </Text>

          <View style={styles.inputContainer}>
            <View style={styles.fullNameInputContainer}>
              <UserIcon width={20} height={20} style={styles.iconStyle} />
              <TextInput style={styles.inputStyle} placeholder="Full name" />
            </View>
            <View style={styles.emailInputContainer}>
              <EmailIcon width={20} height={20} style={styles.iconStyle} />
              <TextInput
                style={styles.inputStyle}
                keyboardType="email-address"
                placeholder="Your email"
              />
            </View>
            <View style={styles.messageInputContainer}>
              <MessageIcon width={20} height={20} style={styles.iconStyle} />
              <View style={{ width: 250 }}>
                <TextInput
                  style={styles.inputMessageStyle}
                  multiline
                  value={message}
                  onChangeText={handleChangeMessage}
                  placeholder="Write your message"
                />
                <Text style={styles.charCount}>
                  {message.length}/{charLimit}
                </Text>
              </View>
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
                Send Message
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
    marginTop: 60,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  contactText: {
    color: "#03358C",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "800",
  },
  contactSuggestText: {
    width: 250,
    textAlign: "center",
    color: "#575757",
    fontSize: 20,
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
    flexDirection: "row",
    borderColor: "#000",
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  inputStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    height: 30,
  },
  iconStyle: {
    marginRight: 10,
  },

  emailInputContainer: {
    marginTop: 20,
    flexDirection: "row",
    borderColor: "#000",
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  messageInputContainer: {
    marginTop: 20,
    flexDirection: "row",
    borderColor: "#000",
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
  },
  inputMessageStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    height: 80,
    paddingVertical: 0,
  },
  charCount: {
    textAlign: "right",
    color: "#888",
    marginRight: 10,
    fontSize: 12,
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
