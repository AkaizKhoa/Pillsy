import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { useFonts } from "expo-font";
import GoogleIcon from "../assets/icon/google_icon.svg";
import FaceBookIcon from "../assets/icon/facebook_icon.svg";
import AppleIcon from "../assets/icon/apple_icon.svg";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
export default function SignupLogin2() {
  const navigation = useNavigation();
  // using context
  const { login } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);


  useEffect(() => {


    validateForm();
  }, [email, password]);

  const validateForm = () => {
    let errors = {};

    // Validate name field 
    if (!email) {
      errors.email = '*Email is required.';
    }

    // Validate email field 
    if (!password) {
      errors.password = '*Password is required.';
    }


    // Set the errors and update form validity 
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return undefined;
  }





  return (
    <AlertNotificationRoot>

    <View style={styles.container}>
      <View style={styles.containerWelcome}>
        <Text style={[styles.welcome, { fontFamily: "Inter-Bold" }]}>
          Welcome!
        </Text>
        <Text style={[styles.continue, { fontFamily: "Inter-Bold" }]}>
          Sign in to continue
        </Text>
      </View>
      <View style={styles.containerInput}>
        <Text style={styles.error}>{errors.email}</Text>

        <TextInput
          style={[styles.input, { fontFamily: "Inter-Bold", marginBottom: 50 }]}
          placeholder="abc@gmail.com"
          placeholderTextColor={"#224E9A"}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.error}>{errors.password}</Text>

        <TextInput
          style={[styles.input, { fontFamily: "Inter-Bold" }]}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor={"#224E9A"}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={() => {
            validateForm();
            if (isFormValid) {
              login(email, password);
            } else {
              Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Login Fail',
                textBody: 'Please check your email or password.',
                button: 'close',
              })
            }

          }}
        >
          <Text style={[styles.buttonTextLogin, { fontFamily: "Inter-Bold" }]}>
            Login
          </Text>
        </TouchableOpacity>

      </View>
      <View style={styles.containerForgotPassword}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ForgotPassword1");
          }}
        >
          <Text
            style={[styles.forgotPasswordText, { fontFamily: "Inter-Bold" }]}
          >
            Forgot Password?
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
        <View style={styles.dontHaveAccContainer}>
          <Text style={[styles.dontHaveText, { fontFamily: "Inter-Bold" }]}>
            Don't have an account?
          </Text>
          <Text
            style={[styles.signUpText, { fontFamily: "Inter-Bold" }]}
            onPress={() => {
              navigation.navigate("SignupLogin3");
            }}
          >
            Sign up
          </Text>
        </View>
        
      </View>

       
    </View>
      </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  containerWelcome: {
    flexDirection: "column",
    marginTop: 70,
    marginLeft: 30,
  },
  welcome: {
    fontSize: 35,
    fontWeight: 700,
    color: "#03358C",
    marginBottom: 14,
  },
  continue: {
    color: "#9897CA",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: 700,
  },
  containerInput: {
    flexDirection: "column",
    marginTop: 100,
    marginHorizontal: 60,
    marginBottom: 60,
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
    paddingHorizontal: 100,
    borderRadius: 10,
    marginBottom: 14,
  },
  buttonLogin: {
    alignItems: "center",
    backgroundColor: "#03358C",
    textAlign: "center",
    elevation: 8,
    borderRadius: 10,
  },
  buttonTextLogin: {
    color: "#fff",
    fontWeight: "700",
    alignSelf: "center",
    textTransform: "uppercase",
    letterSpacing: 2,
    fontSize: 18,
    paddingVertical: 7,
  },
  containerForgotPassword: {
    alignItems: "center",
  },
  forgotPasswordText: {
    textAlign: "center",
    letterSpacing: 2,
    color: "#6079A6",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: 400,
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
  dontHaveAccContainer: {
    marginTop: 30,
    flexDirection: "row",
  },
  dontHaveText: {
    color: "#6079A6",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: 700,
    letterSpacing: 2,
    marginRight: 5,
  },
  signUpText: {
    color: "#3301E5",
    fontSize: 11,
    fontStyle: "normal",
    fontWeight: 700,
    letterSpacing: 2,
  },

  //error
  error: {
    color: 'red',
    fontSize: 13,
    fontWeight: "600"
  },
});
