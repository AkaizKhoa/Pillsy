import { View, Text, Image, StyleSheet, Button, SafeAreaView, TouchableOpacity } from "react-native";

export default function SignupLogin1() {
    return (
        <View style={styles.container}>
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
                        // Handle login button press
                    }}>
                    <Text style={styles.buttonTextLogin}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonSignUp}
                    onPress={() => {
                        // Handle sign-up button press
                    }}>
                    <Text style={styles.buttonTextSignUp}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
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
