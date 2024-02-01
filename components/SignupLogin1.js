import { View, Text, Image, StyleSheet, Button, SafeAreaView, TouchableOpacity } from "react-native";

import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../context/AuthContext";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import React, {useContext} from "react";

export default function SignupLogin1() {
  const {error} = useContext(AuthContext);
    
    const navigation = useNavigation();

    return (
    <AlertNotificationRoot>
        <View style={styles.container}>
        {{error} ? Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Fail!',
          textBody: 'Something is wrong. Try again with email and password valid.',
        }) : ""}
            <View style={styles.containerPillsy}>
                <Image style={styles.pillsyImage} source={require('../assets/PillSy-Text.png')}></Image>
            </View>
            <View style={styles.containerDoctor}>
                <Image style={styles.doctorImage} source={require('../assets/doctorImage.png')}></Image>
                <View style={styles.context}>
                    <Text style={styles.hello}>Hello!</Text>
                    <Text style={styles.introduction} >The best place to accompany you on your medication journey</Text>
                </View>
            </View>

            <View style={styles.containerButton}>
                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={() => {
                        
                        navigation.navigate("SignupLogin2")

                    }}>
                    <Text style={styles.buttonTextLogin}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonSignUp}
                    onPress={() => {
                        
                    navigation.navigate("SignupLogin3")

                    }}>
                    <Text style={styles.buttonTextSignUp}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
        </AlertNotificationRoot>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: "column",
    },
    containerPillsy: {
        alignItems: "center",
        marginTop: 140,
    },
    pillsyImage: {
        width: 200,
        height: 73

    },
    containerDoctor: {
        flexDirection: "column",
        alignItems: "center"
    },
    doctorImage: {
        width: 280,
    },
    context: {
        alignItems: "center",
    },
    hello: {
        fontSize: 30,
        fontWeight: "700",
    },
    introduction: {
        fontSize: 15,
        fontWeight: "700",
        color: "#969696",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 50

    },
    containerButton: {
        // flexDirection: "column",
        gap: 30,
        paddingHorizontal: 100,
        borderRadius: 10,

    },
    buttonLogin: {
        backgroundColor: '#001B48',
        textAlign: "center",
        elevation: 8,
        borderRadius: 10,

    },
    buttonTextLogin: {
        color: '#fff',
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        fontSize: 18,
        paddingVertical: 7
    },

    buttonSignUp: {
        backgroundColor: '#fff',
        elevation: 8,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#001B48'

    },
    buttonTextSignUp: {
        color: '#001B48',
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        fontSize: 18,
        paddingVertical: 7
    },

});
