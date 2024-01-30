import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, FlatList, Image } from "react-native";
import { useState, useEffect, useContext } from "react";
import DotCard from "../assets/icon/dot-card.svg"
import IconSearch from "../assets/icon/search-icon.svg"
import ArrowBackLeft from "../assets/icon/arrow_back_left.svg";

import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from "../config";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";


export default function ManagePrescriptions() {

    const [prescription, setPrescription] = useState("");
    const [listPres, setListPres] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const navigation = useNavigation();

    const { userInfo } = useContext(AuthContext);
    const { userToken } = useContext(AuthContext);


  
    useEffect(() => {
        const abortController = new AbortController();
        const url = `${BASE_URL}/api/v1/prescription-management/prescriptions/patient/${userInfo.PatientId}/all-prescription`;
    
        const fetchData = async () => {
          try {
            setIsLoading(true)
            const response = await axios.get(url, { signal: abortController.signal, headers: {
                'Authorization': 'Bearer ' + userToken
              } });
            console.log(response.data);
            const listPres = response.data
            setListPres(listPres)
          } catch (error) {
            if(abortController.signal.aborted){
              console.log('Data fetching cancelled');
            }else{
             // Handle error
            }
          }finally{
            setIsLoading(false)

          }
        };
    
        fetchData();
    
        return () => abortController.abort("Data fetching cancelled");
      }, []);
      

    return (
        <View style={styles.container}>
           {isLoading ? (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center", gap: 20}}>
                <Image source={require("../assets/loading/prescription.gif")} />
                <Text style={{fontSize: 20, fontWeight: "600"}}>Loading....</Text>
            </View>
           ): (
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


            <FlatList contentContainerStyle={styles.listPrescription} data={listPres}
            showsVerticalScrollIndicator={false}
                renderItem={({ item: data, index }) => (
                    <View style={styles.cardPrescription}>
                        <DotCard ></DotCard>
                        <View style={styles.groupText}>
                            <Text style={styles.title}>
                                Don thuoc
                            </Text>
                            <Text style={styles.context}>
                                Trieu chung: {data.diagnosis}
                            </Text>
                            <Text style={styles.context}>
                                {/* {item.detailPres[1]} */}
                            </Text >

                        </View>
                    </View>
                )}
                keyExtractor={(data, index) => index.toString()}
            />



            </View>
           )}


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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