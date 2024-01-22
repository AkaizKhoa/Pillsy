import { View, Text, Image, StyleSheet, Button, Icon, TouchableOpacity, ScrollView, Pressable, } from "react-native";
import Vector2 from '../assets/Vector2.svg'
import IconThreeDot from 'react-native-vector-icons/Entypo'
import IconCamera from '../assets/icon/icon-camera.svg'
import IconCustomerFeedback from '../assets/icon/icon-customer-feedback.svg'
import IconCustomerSupport from '../assets/icon/icon-customer-support.svg'
import IconDoctorConnection from '../assets/icon/icon-doctor-connection.svg'
import IconManagePrescription from '../assets/icon/icon-manage-prescription.svg'
import IconPayment from '../assets/icon/icon-payment.svg'
import IconPillJourney from '../assets/icon/icon-pills-journey.svg'
import IconSchedule from '../assets/icon/icon-schedule.svg'

import DropShadow from "react-native-drop-shadow";
import { useFonts } from "expo-font";


import { useNavigation } from '@react-navigation/native';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export default function MainScreen() {

    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
        "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    });
    if (!fontsLoaded) {
        return undefined;
    }

    const { logout } = useContext(AuthContext);


    return (
        <View style={styles.container}>
            <View style={styles.containerVector}>
                <Vector2 style={styles.imageVector} width={"200%"}></Vector2>
            </View>

            <ScrollView style={styles.containerContext} showsVerticalScrollIndicator={false}>
                <View style={styles.containerText}>
                    <Text style={[styles.pillsy, { fontFamily: "Inter-Bold" }]}>Pillsy</Text>
                    <View style={styles.helloUserContainer}>
                        <Text style={styles.helloUserText}>Hello, <Text style={{ color: '#FF6AB2' }}>User's Name</Text> 🙋🏻‍♂️</Text>
                    </View>
                    <View style={[styles.boxWelcome, styles.shadowBoxWelcome]}>
                        <Text style={styles.textWelcome}>Welcome to Pillsy!</Text>
                    </View>
                </View>
                <Pressable onPress={ () => {
                    logout();
                }} style={{width: 100, height: 50, backgroundColor: "red"}}>
                    <Text style={{color: "#fff", fontSize:  20, alignItems:"center", textAlign: "center"}}>Logout</Text>
                </Pressable>

                <View col style={styles.containerFeatures}>
                    <View style={styles.containerFeature} >
                        <View style={styles.groupButton} >
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {

                                    navigation.navigate("Scan")

                                }}
                            >
                                <View style={styles.iconFeature}>
                                    <IconCamera ></IconCamera>
                                </View>
                            </TouchableOpacity>
                            <IconThreeDot style={styles.iconThreeDot} name="dots-three-horizontal" onPress={() => {
                                // Handle login button press
                            }}></IconThreeDot>
                        </View>
                        <Text style={styles.featureContent} >
                            Scan prescription
                        </Text>
                    </View>

                    <View style={styles.containerFeature} >
                        <View style={styles.groupButton} >
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {

                                    navigation.navigate("ManagePrescriptions")

                                }}
                            >
                                <View style={styles.iconFeature}>
                                    <IconManagePrescription ></IconManagePrescription>
                                </View>
                            </TouchableOpacity>
                            <IconThreeDot style={styles.iconThreeDot} name="dots-three-horizontal" onPress={() => {
                                // Handle login button press
                            }}></IconThreeDot>
                        </View>
                        <Text style={styles.featureContent}>
                            Manage Prescription
                        </Text>
                    </View>

                    <View style={styles.containerFeature} >
                        <View style={styles.groupButton} >
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {

                                    navigation.navigate("ReminderScheduling")


                                }}
                            >
                                <View style={styles.iconFeature}>
                                    <IconSchedule ></IconSchedule>
                                </View>
                            </TouchableOpacity>
                            <IconThreeDot style={styles.iconThreeDot} name="dots-three-horizontal" onPress={() => {
                                // Handle login button press
                            }}></IconThreeDot>
                        </View>
                        <Text style={styles.featureContent}>
                            Reminders-Scheduling
                        </Text>
                    </View>

                    <View style={styles.containerFeature} >
                        <View style={styles.groupButton} >
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    // Handle login button press
                                }}
                            >
                                <View style={styles.iconFeature}>
                                    <IconPillJourney ></IconPillJourney>
                                </View>
                            </TouchableOpacity>
                            <IconThreeDot style={styles.iconThreeDot} name="dots-three-horizontal" onPress={() => {
                                // Handle login button press
                            }}></IconThreeDot>
                        </View>
                        <Text style={styles.featureContent}>
                            Pills journey
                        </Text>
                    </View>

                    <View style={styles.containerFeature} >
                        <View style={styles.groupButton} >
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    // Handle login button press
                                }}
                            >
                                <View style={styles.iconFeature}>
                                    <IconDoctorConnection ></IconDoctorConnection>
                                </View>
                            </TouchableOpacity>
                            <IconThreeDot style={styles.iconThreeDot} name="dots-three-horizontal" onPress={() => {
                                // Handle login button press
                            }}></IconThreeDot>
                        </View>
                        <Text style={styles.featureContent}>
                            Doctor connection
                        </Text>
                    </View>

                    <View style={styles.containerFeature} >
                        <View style={styles.groupButton} >
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    // Handle login button press
                                }}
                            >
                                <View style={styles.iconFeature}>
                                    <IconPayment ></IconPayment>
                                </View>
                            </TouchableOpacity>
                            <IconThreeDot style={styles.iconThreeDot} name="dots-three-horizontal" onPress={() => {
                                // Handle login button press
                            }}></IconThreeDot>
                        </View>
                        <Text style={styles.featureContent}>
                            Payment
                        </Text>
                    </View>

                    <View style={styles.containerFeature} >
                        <View style={styles.groupButton} >
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    // Handle Customer FeedBack button press - navigate
                                    navigation.navigate("CustomerFeedBack1")
                                }}
                            >
                                <View style={styles.iconFeature}>
                                    <IconCustomerFeedback ></IconCustomerFeedback>
                                </View>
                            </TouchableOpacity>
                            <IconThreeDot style={styles.iconThreeDot} name="dots-three-horizontal" onPress={() => {
                                // Handle login button press
                            }}></IconThreeDot>
                        </View>
                        <Text style={styles.featureContent}>
                            Customer's feedback
                        </Text>
                    </View>
                    <View style={styles.containerFeature} >
                        <View style={styles.groupButton} >
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    // Handle Customer Support button press - navigate
                                    navigation.navigate("CustomerSupport1")
                                }}
                            >
                                <View style={styles.iconFeature}>
                                    <IconCustomerSupport ></IconCustomerSupport>
                                </View>
                            </TouchableOpacity>
                            <IconThreeDot style={styles.iconThreeDot} name="dots-three-horizontal" onPress={() => {
                                // Handle login button press
                            }}></IconThreeDot>
                        </View>
                        <Text style={styles.featureContent}>
                            Customer's support
                        </Text>
                    </View>



                </View>
            </ScrollView>
        </View>
    );
}




const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },

        containerVector: {
            position: "absolute",
            width: "100%",
            top: -200,
            right: 150
            // height:280,
            // backgroundColor:"#017AFE"
        },
        imageVector: {
        },
        containerContext: {

        },
        containerText: {
            padding: 40,
            flexDirection: "column",
            gap: 20
        },
        helloUserContainer: {
            alignItems: "flex-end",
        },
        helloUserText: {
            fontFamily: 'Inter-Bold',
            color: "white",
            fontSize: 20,
        },
        pillsy: {
            textTransform: "uppercase",
            color: "#fff",
            fontSize: 35,
            fontWeight: "700",


        },

        boxWelcome: {
            backgroundColor: "#fff",
            borderRadius: 20,
            shadowColor: "#333333",
            shadowOffset: {
                width: 0,
                height: 50
            },
            shadowOpacity: 1,
            shadowRadius: 4,

        },
        textWelcome: {
            color: "#000",
            padding: 4,
            fontSize: 17,
            fontWeight: "800",
            paddingLeft: 15
        },
        shadowBoxWelcome: {
            ...Platform.select({
                ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                },
                android: {
                    elevation: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                },
            }),
        },
        containerFeatures: {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 30,
            justifyContent: "center",
            paddingBottom: 40,
            paddingTop: 20
        },
        containerFeature: {
            width: 150,
            height: 150,
            backgroundColor: "#fff",
            borderRadius: 20,
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 15,
            // shadowOffset: { width: -10, height: 10 },
            // shadowColor: "#000",
            // shadowRadius: 10,
            // elevation: 10
            ...Platform.select({
                ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                },
                android: {
                    elevation: 10

                },
            }),
        },
        groupButton: {
            flexDirection: "row",
            justifyContent: "space-between"
        },
        button: {
            backgroundColor: '#017afe',
            width: 60,
            height: 60,
            borderRadius: 10,
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center"
        },
        iconFeature: {
        },
        iconThreeDot: {
            fontSize: 15
        },
        featureContent: {
            fontSize: 13,
            fontWeight: "700",
        }


    }
);