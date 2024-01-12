import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Keyboard } from "react-native";
import { useFonts } from "expo-font";
import IconComplete from "../assets/icon/icon_complete_customer_feedback.svg";

export default function CustomerFeedBack2() {
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
      <IconComplete width={350} height={350} style={{ marginTop: 30 }} />
      <View style={styles.completeFeedBackContainer}>
        <Text style={[styles.completeText, { fontFamily: "Inter-Bold" }]}>
          Thank you
        </Text>
        <Text
          style={[styles.completeSuggestText, { fontFamily: "Inter-Bold" }]}
        >
          By making your voice heard, you help us improve Pillsy
        </Text>

        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.buttonStyle,
              pressed ? styles.pressedItem : null,
            ]}
          >
            <Text style={[styles.buttonText, { fontFamily: "Inter-Bold" }]}>
              Okay
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  pressedItem: {
    opacity: 0.5,
  },
  completeFeedBackContainer: {
    marginTop: 60,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  completeText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "800",
  },
  completeSuggestText: {
    width: 290,
    textAlign: "center",
    color: "#9899A0",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
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
