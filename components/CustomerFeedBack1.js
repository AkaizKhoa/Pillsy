import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useFonts } from "expo-font";
import ArrowBackLeft from "../assets/icon/arrow_back_left.svg";
import MessageIcon from "../assets/icon/message_icon.svg";
import StarFilled from "../assets/icon/star_filled.svg";
import StarNotFilled from "../assets/icon/star_not_fill.svg";

export default function CustomerFeedBack1() {
  //STAR HANDLE
  const [rating, setRating] = useState(4);

  const handlePress = (index) => {
    setRating(index + 1);
  };
  console.log(rating);
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
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return undefined;
  }
  return (
    <View style={styles.container}>
      <View style={styles.arrowBackContainer}>
        <Pressable style={({ pressed }) => pressed && styles.pressedItem}>
          <ArrowBackLeft />
        </Pressable>
      </View>
      <ScrollView style={styles.screen}>
        <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={styles.feedbackContainer}>
          <View style={styles.feedbackTextContainer}>
            <Text
              style={[styles.giveFeedbackText, { fontFamily: "Inter-Bold" }]}
            >
              Give feedback
            </Text>
            <Text
              style={[styles.rateFeedBackText, { fontFamily: "Inter-Medium" }]}
            >
              Rate your experience
            </Text>
          </View>

          <View style={styles.starFeedBackContainer}>
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePress(index)}
                style={styles.star}
              >
                {index < rating ? <StarFilled /> : <StarNotFilled />}
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.inputContainer}>
            <Text
              style={[styles.careToShareText, { fontFamily: "Inter-Medium" }]}
            >
              Care to share more about it ?
            </Text>
            <View style={styles.messageInputContainer}>
              <MessageIcon width={20} height={20} style={styles.iconStyle} />
              <View style={{ width: 250 }}>
                <TextInput
                  style={styles.inputMessageStyle}
                  multiline
                  value={message}
                  onChangeText={handleChangeMessage}
                  placeholder="Write your feedback"
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
                PUBLISH FEEDBACK
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
    flexDirection: "column",
    flex: 1,
  },
  arrowBackContainer: {
    marginLeft: 20,
  },
  pressedItem: {
    opacity: 0.5,
  },
  feedbackContainer: {
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  feedbackTextContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  giveFeedbackText: {
    marginLeft: 38,
    marginBottom: 68,
    color: "#03358C",
    fontSize: 30,
    fontWeight: "800",
  },
  rateFeedBackText: {
    marginLeft: 38,
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
  },
  starFeedBackContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  star: {
    marginRight: 10,
  },
  inputContainer: {
    width: "100%",
    marginTop: 30,
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
  },
  careToShareText: {
    marginLeft: 38,
    fontSize: 20,
  },

  iconStyle: {
    marginRight: 10,
  },

  messageInputContainer: {
    marginLeft: 48,
    marginTop: 40,
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
    marginTop: 20,
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
