import React, {useState} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import GoogleIcon from "../assets/icon/google_icon.svg";
import FaceBookIcon from "../assets/icon/facebook_icon.svg";
import AppleIcon from "../assets/icon/apple_icon.svg";
import ArrowBackLeft from "../assets/icon/arrow_back_left.svg";
import { useNavigation } from '@react-navigation/native';

export default function SignupLogin3() {

  const navigation = useNavigation();


  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);


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
            navigation.navigate("SignupLogin1")

        }}>
          <ArrowBackLeft />
        </Pressable>
      </View>
      <View style={styles.containerHi}>
        <Text style={[styles.hiText, { fontFamily: "Inter-Bold" }]}>Hi!</Text>
        <Text style={[styles.createNewAccText, { fontFamily: "Inter-Bold" }]}>
          Create a new account
        </Text>
      </View>
      <View style={styles.containerInput}>
        <View>
          <Text style={styles.labelInput}>Email</Text>
          <TextInput
            style={[
              styles.input,
              { fontFamily: "Inter-Bold", marginBottom: 20 },
            ]}
            placeholder="abc@gmail.com"
            keyboardType="email-address"
            placeholderTextColor={"#224E9A"}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View>
          <Text style={styles.labelInput}>Password</Text>
          <TextInput
            style={[
              styles.input,
              { fontFamily: "Inter-Bold", marginBottom: 20 },
            ]}
            placeholder="●●●●●●●"
            secureTextEntry={true}
            placeholderTextColor={"#224E9A"}
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View>
          <Text style={styles.labelInput}>Confirm Password</Text>
          <TextInput
            style={[styles.input, { fontFamily: "Inter-Bold" }]}
            placeholder="●●●●●●●"
            secureTextEntry={true}
            placeholderTextColor={"#224E9A"}
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.buttonSignUp}
          onPress={() => {
            navigation.navigate("InputInformation1", {
              email: email,
              password: password
            })
          }}
        >
          <Text style={[styles.buttonTextSignUp, { fontFamily: "Inter-Bold" }]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerOr}>
        <Text>━━━━━━━━━ </Text>
        <Text style={[styles.orText, { fontFamily: "Inter-Bold" }]}>or</Text>
        <Text> ━━━━━━━━━</Text>
      </View>
      <View style={styles.containerSocialMedia}>
        <Text style={[styles.socialLoginText, { fontFamily: "Inter-Bold" }]}>
          Social Media Login
        </Text>
        <View style={styles.containerSocialMediaIcon}>
          <GoogleIcon width={40} height={40} style={styles.icon} />
          <FaceBookIcon width={40} height={40} style={styles.icon} />
          <AppleIcon width={40} height={40} style={styles.icon} />
        </View>
        <View style={styles.alreadyHaveAccContainer}>
          <Text style={[styles.alreadyHaveText, { fontFamily: "Inter-Bold" }]}>
            Already have an account?
          </Text>
          <Text style={[styles.signInText, { fontFamily: "Inter-Bold" }]}
            onPress={() => {
              navigation.navigate("SignupLogin2")

          }}>
            Sign in
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flexDirection: "column",
  },
  arrowBackContainer: {
    marginLeft: 20,
  },
  pressedItem: {
    opacity: 0.5,
  },
  containerHi: {
    flexDirection: "column",
    marginTop: 20,
    marginLeft: 40,
  },
  hiText: {
    fontSize: 35,
    fontWeight: 700,
    color: "#03358C",
    marginBottom: 14,
  },
  createNewAccText: {
    color: "#9897CA",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: 700,
  },
  containerInput: {
    flexDirection: "column",
    marginTop: 30,
    marginHorizontal: 60,
    marginBottom: 60,
  },
  labelInput: {
    color: "#575757",
  },
  input: {
    borderWidth: 1,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "transparent",
    padding: 10,
    width: 244.002,
    color: "#224E9A",
    fontSize: 18,
  },
  containerButton: {
    paddingHorizontal: 80,
    borderRadius: 10,
    marginBottom: 14,
    alignContent: "center",
    justifyContent: "center",
  },
  buttonSignUp: {
    backgroundColor: "#fff",
    elevation: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#03358C",
  },
  buttonTextSignUp: {
    color: "#03358C",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    fontSize: 18,
    paddingVertical: 7,
    letterSpacing: 2,
  },
  containerOr: {
    marginTop: 29,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  orText: {
    textAlign: "center",
    fontSize: 16,
    letterSpacing: 2,
    color: "#03358C",
  },
  containerSocialMedia: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  socialLoginText: {
    color: "#7270B6",
    textAlign: "center",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: 700,
    letterSpacing: 2,
    marginBottom: 19,
  },
  containerSocialMediaIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginHorizontal: 20,
  },
  alreadyHaveAccContainer: {
    marginTop: 30,
    flexDirection: "row",
  },
  alreadyHaveText: {
    color: "#6079A6",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: 700,
    letterSpacing: 2,
    marginRight: 5,
  },
  signInText: {
    color: "#3301E5",
    fontSize: 11,
    fontStyle: "normal",
    fontWeight: 700,
    letterSpacing: 2,
  },
});
