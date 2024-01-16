import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from "react-native";
import { useState } from "react";
import DotCard from "../assets/icon/dot-card.svg"
import IconSearch from "../assets/icon/search-icon.svg"
import ArrowBackLeft from "../assets/icon/arrow_back_left.svg";
export default function ManagePrescriptions() {

    const [prescription, setPrescription] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.arrowBackContainer}>
                <Pressable style={({ pressed }) => pressed && styles.pressedItem}>
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


            <ScrollView style={styles.listPrescription}>
                    <View style={styles.cardPrescription}>
                        <DotCard ></DotCard>
                        <View style={styles.groupText}>
                            <Text style={styles.title}>
                                Cardiovascular prescription
                            </Text>
                            <Text style={styles.context}>
                                • Acebutolol (Sectral)
                            </Text>
                            <Text style={styles.context}>
                                • Atenolol (Tenormin)
                            </Text >
                            <Text style={styles.context}>
                                • Betaxolol (Kerlone)
                            </Text>
                        </View>
                    </View>
                    <View style={styles.cardPrescription}>
                        <DotCard></DotCard>
                        <View style={styles.groupText}>
                            <Text style={styles.title}>
                                Stomach prescription
                            </Text>
                            <Text style={styles.context}>
                                • Omeprazole Omeprazole Omeprazole Omeprazole Omeprazole Omeprazole Omeprazole Omeprazole Omeprazole
                            </Text>
                            <Text style={styles.context}>
                                • Pantoprazole sodium Pantoprazole sodium Pantoprazole sodium Pantoprazole sodium Pantoprazole sodiumPantoprazole sodium
                            </Text>
                            <Text style={styles.context}>
                                • Famotidine
                            </Text>
                        </View>
                    </View>



            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    arrowBackContainer: {
        paddingHorizontal: 20,
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
        width: "100%",

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
        marginTop: 15

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

    },
    groupText: {
        flexDirection: "column",
        gap: 8,
        paddingHorizontal: 15,

    },
}) 