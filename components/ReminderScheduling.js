import { StyleSheet, Text, View, Pressable, ScrollView, FlatList, TouchableOpacity, Animated } from "react-native";
import React, { useRef, useState } from "react";
import ArrowBackLeft from "../assets/icon/arrow_back_left.svg";
import RedDot from "../assets/icon/red-dot.svg"


export default function ReminderScheduling() {

    const dataDate=[
        {
            id: 1,
            day: "18",
            numberTh:"Mon"

        },
        {
            id: 2,
            day: "19",
            numberTh:"Mon"

        },
        {
            id: 3,
            day: "20",
            numberTh:"Mon"

        },
        {
            id: 4,
            day: "21",
            numberTh:"Mon"

        },
        {
            id: 5,
            day: "22",
            numberTh:"Mon"

        },
        {
            id: 6,
            day: "23",
            numberTh:"Mon"

        },
        {
            id: 7,
            day: "24",
            numberTh:"Mon"

        },
        {
            id: 8,
            day: "25",
            numberTh:"Mon"

        },

    ]





    const [selectedStep, setSelectedStep] = useState(0);
    const progress1 = useRef(new Animated.Value(0)).current;
    const progress2 = useRef(new Animated.Value(0)).current;
    const progress3 = useRef(new Animated.Value(0)).current;
    const start1 = () => {
        Animated.timing(progress1, {
            toValue: 130,
            duration: 2000,
            useNativeDriver: false,
        }).start();
    };
    const start2 = () => {
        Animated.timing(progress2, {
            toValue: 130,
            duration: 2000,
            useNativeDriver: false,
        }).start();
    };
    const start3 = () => {
        Animated.timing(progress3, {
            toValue: 130,
            duration: 2000,
            useNativeDriver: false,
        }).start();
    };

    return (
        <View style={styles.container}>
            <View style={styles.arrowBackContainer}>
                <Pressable style={({ pressed }) => pressed && styles.pressedItem}
                    onPress={() => {
                        navigation.navigate("MainScreen")

                    }}>
                    <ArrowBackLeft />
                </Pressable>
            </View>

            <View style={styles.containerTitle}>
                <Text style={styles.upperTitle} >Reminders and Scheduling</Text>
            </View>

            <View style={styles.containerText}>
                <Text style={styles.yourSchedule}>Your schedule</Text>
            </View>

            <View style={styles.containerListDay}>
                <FlatList data={dataDate} horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listDay}
                
                renderItem={({item}) => (
                    <Pressable style={styles.groupDay}>
                    <Text style={styles.dayText}>{item.numberTh}</Text>
                    <Text style={styles.dayNumber}>{item.day}</Text>
                </Pressable>
                )}
                />
            </View>

            <View style={styles.groupDateMonthYear}>
                <RedDot></RedDot>
                <Text style={styles.textDateMonthYear}>
                    Monday 09-18-2023</Text>
            </View>

            <View>

                <ScrollView style={{}}>
                    <View style={{ width: '100%', paddingHorizontal: 40 }}>
                        {/* group 1 */}
                        <View style={{
                            width: "100%",
                            height: 100,
                            borderRadius: 25,
                            backgroundColor: selectedStep > 0 ? '#017AFE' : '#fff',
                            justifyContent: 'space-evenly',
                            alignItems: 'center', flexDirection: "row",
                            marginVertical: 15
                        }}>
                            <View style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 15,
                                    borderWidth: 4,
                                    borderColor: "#fff",
                                    backgroundColor: selectedStep > 0 ? '#0F67FE' : '#f2f2f2',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 35
                                }}>

                            </View>
                            <View style={{ width: "100%", justifyContent: "space-evenly", alignItems: "center", flexDirection: "row" }}>
                                <Text style={{ color: selectedStep > 0 ? '#fff' : '#000', fontSize: 16, fontWeight: "600" }}>
                                    8:00
                                </Text>
                                <View style={{ width: 160, }}>
                                    <Text style={{ color: selectedStep > 0 ? '#fff' : '#000', fontWeight: "600", fontSize: 14 }}>
                                        Task Name
                                    </Text>
                                    <Text numberOfLines={2} style={{ color: selectedStep > 0 ? '#fff' : '#000', fontSize: 10 }}>
                                        Details
                                    </Text>
                                </View>
                            </View>

                        </View>

                        {/* group 2 */}


                        <View style={{
                            width: "100%",
                            height: 100,
                            borderRadius: 25,
                            backgroundColor: selectedStep > 1 ? '#017AFE' : '#fff',
                            justifyContent: 'space-evenly',
                            alignItems: 'center', flexDirection: "row",
                            marginVertical: 15
                        }}>
                            <View style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 15,
                                    borderWidth: 4,
                                    borderColor: "#fff",
                                    backgroundColor: selectedStep > 1 ? '#0F67FE' : '#f2f2f2',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 35
                                }}>

                            </View>
                            <View style={{ width: "100%", justifyContent: "space-evenly", alignItems: "center", flexDirection: "row" }}>
                                <Text style={{ color: selectedStep > 1 ? '#fff' : '#000', fontSize: 16, fontWeight: "600" }}>
                                    9:00
                                </Text>
                                <View style={{ width: 160, }}>
                                    <Text style={{ color: selectedStep > 1 ? '#fff' : '#000', fontWeight: "600", fontSize: 14 }}>
                                        Task Name
                                    </Text>
                                    <Text numberOfLines={2} style={{ color: selectedStep > 1 ? '#fff' : '#000', fontSize: 10 }}>
                                        Details
                                    </Text>
                                </View>
                            </View>

                        </View>
                        

                    </View>
                    <View
                        style={{
                            width: '100%',
                            padding: 50,
                            position: 'absolute',
                            top: 0,
                        }}>
                        <Animated.View
                            style={{
                                width: 2,
                                height: progress1,
                                marginTop: 10,
                                backgroundColor: '#0F67FE',
                                marginLeft: 16

                            }}></Animated.View>

                        <Animated.View
                            style={{
                                width: 2,
                                height: progress2,
                                marginTop: 10,
                                backgroundColor: '#0F67FE',
                                marginLeft: 16
                            }}></Animated.View>
                        <Animated.View
                            style={{
                                width: 2,
                                height: progress3,
                                marginTop: 10,
                                backgroundColor: '#0F67FE',
                                marginLeft: 16
                            }}></Animated.View>
                    </View>
                    <TouchableOpacity
                        style={{
                            marginTop: 100,
                            height: 50,
                            width: 200,
                            backgroundColor: 'orange',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            alignSelf: 'center',
                        }}
                        onPress={() => {
                            if (selectedStep == 1) {
                                start1();
                            }
                            if (selectedStep == 2) {
                                start2();
                            }
                            if (selectedStep == 3) {
                                start3();
                            }
                            if (selectedStep == 0) {
                                setSelectedStep(selectedStep + 1);
                            } else {
                                setTimeout(() => {
                                    setSelectedStep(selectedStep + 1);
                                }, 3000);
                            }
                        }}>
                        <Text>Next Step</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        gap: 10,
        backgroundColor: "#f1f4f8"
    },
    arrowBackContainer:{
        paddingHorizontal: 20
    },
    containerTitle: {
        paddingHorizontal: 35,
    },
    upperTitle: {
        fontSize: 30,
        color: "#03358C",
        fontWeight: "700",
        textAlign: "left"
    },
    containerText: {
        paddingHorizontal: 35,

    },
    yourSchedule: {
        fontSize: 20,
        fontWeight: "600",
        textAlign: "left"
    },
    containerListDay: {
        width: "100%",
        // borderWidth: 1,
        // borderColor: "yellow",

    },
    listDay: {
        // borderWidth: 1,
        // borderColor: "green",
        flexDirection: "row",
        justifyContent: "space-evenly",
        gap: 10,
        paddingHorizontal: 10
    },
    groupDay: {
        backgroundColor:"#FF2D55",
        width: 60,
        height: 75,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",

    },
    dayText: {
        fontWeight: "600",
        color: "#8C94A6"
    },
    dayNumber: {
        fontWeight: "600"

    },
    groupDateMonthYear: {
        paddingHorizontal: 35,
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    textDateMonthYear: {
        fontSize: 20,
        fontWeight: "600",
        textAlign: "left"
    }
});
