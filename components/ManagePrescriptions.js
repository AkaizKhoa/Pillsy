import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, FlatList, Image, ImageBackground, SafeAreaView } from "react-native";
import { useState, useEffect, useContext } from "react";
import DotCard from "../assets/icon/dot-card.svg"
import IconSearch from "../assets/icon/search-icon.svg"
import ArrowBackLeft from "../assets/icon/arrow_back_left.svg";

import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from "../config";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { format, parseISO } from 'date-fns';

export default function ManagePrescriptions() {

    const [prescription, setPrescription] = useState("");
    const [listPres, setListPres] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    const { userInfo } = useContext(AuthContext);
    const { userToken } = useContext(AuthContext);



    useEffect(() => {
        const abortController = new AbortController();
        const url = `${BASE_URL}/api/v1/prescription-management/prescriptions/patient/${userInfo.PatientId}/all-prescription`;

        const fetchData = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(url, {
                    signal: abortController.signal, headers: {
                        'Authorization': 'Bearer ' + userToken
                    }
                });
                console.log(response.data);
                const listPres = response.data
                setListPres(listPres)
            } catch (error) {
                if (abortController.signal.aborted) {
                    console.log('Data fetching cancelled');
                } else {
                    // Handle error
                }
            } finally {
                setIsLoading(false)

            }
        };

        fetchData();

        return () => abortController.abort("Data fetching cancelled");
    }, []);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading ? (
                <ImageBackground source={require("../assets/edit_background_6.jpg")} style={{ flex: 1 }} resizeMode="cover">

                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 20, }}>
                        <View >
                            <Text style={{ fontSize: 30, fontWeight: "700", color: "#000", }}>P I L L S Y</Text>
                        </View>
                        <Image source={require("../assets/loading/giphy4.gif")} />
                        <Text style={{ fontSize: 20, fontWeight: "600" }}>Chờ trong giây lát nhé....</Text>
                        <View style={{ padding: 10, borderWidth: 1, borderColor: "#000", backgroundColor: "#B6FFFA", borderRadius: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#211951" }}>
                                Bạn có biết:
                            </Text>
                            <Text style={{ fontStyle: "italic", fontSize: 15, fontWeight: "500", }}>
                                "Tuổi thọ của bạn phụ thuộc vào sức khỏe, còn sức khỏe như thế nào sẽ do bạn quyết định."

                            </Text>
                        </View>
                    </View>

                </ImageBackground>
            ) : (
                <View style={styles.container}>

                    <View>
                        <View style={styles.arrowBackContainer}>
                            <Pressable style={({ pressed }) => pressed && styles.pressedItem}
                                onPress={() => {
                                    navigation.navigate("MainScreen")

                                }}>
                                <ArrowBackLeft />
                            </Pressable>
                        </View>

                        <View style={styles.containerTitle}>
                            <Text style={styles.upperTitle}>Manage Prescriptions</Text>
                        </View>
                        <View style={styles.containerSearch}>
                            <View style={styles.groupSeacrh}>
                                <IconSearch style={styles.searchIcon} />
                                <TextInput style={styles.inputSearch} value={prescription} onChangeText={setPrescription}   >
                                </TextInput>
                            </View>
                        </View>


                        <FlatList
                            contentContainerStyle={styles.listPrescription}
                            data={listPres}
                            showsVerticalScrollIndicator={true}
                            renderItem={({ item: data, index }) => (
                                <View style={styles.cardPrescription}>
                                    <DotCard />
                                    <View style={styles.groupText}>
                                        <Text style={styles.title}>
                                            Đơn thuốc
                                        </Text>
                                        <View style={styles.groupCreatedDate}>
                                            <Text style={styles.contextTitle}>Ngày scan đơn thuốc: </Text>
                                            <Text>{data.createdDate ? format(parseISO(data.createdDate), 'dd-MM-yyyy') : 'N/A'}</Text>

                                        </View>
                                        <View style={styles.context}>
                                            <Text style={styles.contextTitle}>Triệu chứng: </Text>
                                            <Text>{data.diagnosis}</Text>
                                        </View>
                                        <Text style={styles.contextPill}>
                                            Các viên thuốc:
                                        </Text>
                                        <FlatList
                                            data={data.pills}
                                            renderItem={({ item }) => (
                                                <View style={styles.pillItem}>
                                                    <Text style={styles.pillName}> ⚫ {item.pillName}</Text>
                                                    <Text style={styles.pillQuantity}>{item.quantity} {item.unit}</Text>
                                                    <Text style={styles.pillDosage}>{item.dosage_per_day}/Ngày</Text>
                                                    <View style={styles.pillTimeline}>
                                                        <Text style={styles.HSD}>Thời hạn: </Text>
                                                        <Text style={styles.pillDate}> {item.dateStart ? format(parseISO(item.dateStart), 'dd-MM-yyyy') : 'N/A'} - {item.dateEnd ? format(parseISO(item.dateEnd), 'dd-MM-yyyy') : 'N/A'}</Text>
                                                    </View>


                                                </View>
                                            )}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                    </View>
                                </View>
                            )}
                            keyExtractor={(data, index) => index.toString()}
                        />




                    </View>

                </View>
            )}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowBackContainer: {
        width: 80,
        marginLeft: 20,
        marginTop: 50

    },
    pressedItem: {
        opacity: 0.5,
    },
    containerTitle: {
        paddingHorizontal: 35,
        marginBottom: 25
    },
    upperTitle: {
        fontSize: 30,
        color: "#03358C",
        fontWeight: "700",
        textAlign: "left"
    },

    containerSearch: {
        width: 400,

    },

    groupSeacrh: {
        paddingHorizontal: 10,
        marginHorizontal: 35,
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",


    },
    inputSearch: {
        width: "100%",
        height: 40,
        marginLeft: 5,
        flex: 1,
    },
    searchIcon: {
        flex: 1
    },
    listPrescription: {
        paddingHorizontal: 35,
        marginTop: 15,
        margin: 10,
    },
    cardPrescription: {
        width: "100%",
        height: "auto",
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,


    },

    shadowedContent: {

    },
    title: {
        fontSize: 20,
        fontWeight: "700"
    },
    context: {
        fontSize: 15,
        textAlign: "left",
        width: "100%",
        flexDirection: "row"

    },
    contextTitle: {
        fontWeight: "bold"
    },
    contextPill: {
        fontSize: 15,
        textAlign: "left",
        width: "100%",
        fontWeight: "bold"
    },
    pillTimeline: {
        flexDirection: "row"
    },
    HSD: {
        fontWeight: "bold",
        color: "red"
    },
    groupText: {
        flexDirection: "column",
        gap: 8,
        paddingHorizontal: 15,

    },
    groupCreatedDate: {
        flexDirection: "row",
        flexWrap: "wrap"

    }
}) 