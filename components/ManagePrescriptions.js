import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import DotCard from "../assets/icon/dot-card.svg";
import IconSearch from "../assets/icon/search-icon.svg";
import ArrowBackLeft from "../assets/icon/arrow_back_left.svg";
import Feather from "react-native-vector-icons/Feather";

import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../config";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { format, parseISO } from "date-fns";

export default function ManagePrescriptions() {
  const [prescription, setPrescription] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isDetailsVisible, setIsDetailsVisible] = useState({});
  const [listPres, setListPres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  const { userInfo } = useContext(AuthContext);
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    const abortController = new AbortController();
    const url = `${BASE_URL}/api/v1/prescription-management/prescriptions/patient/${userInfo.PatientId}/all-prescription`;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url, {
          signal: abortController.signal,
          headers: {
            Authorization: "Bearer " + userToken,
          },
        });
        console.log(response.data);
        const listPres = response.data;
        setListPres(listPres);
      } catch (error) {
        if (abortController.signal.aborted) {
          console.log("Data fetching cancelled");
        } else {
          // Handle error
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => abortController.abort("Data fetching cancelled");
  }, []);
  //Seacrch prescription filter
  const filteredListPres = listPres.filter(
    (item) =>
      item.createdDate &&
      format(parseISO(item.createdDate), "dd-MM-yyyy").includes(searchInput)
  );

  console.log(
    "%c Filtered List Prescriptions:",
    "color: blue; font-weight: bold;"
  );
  console.log(filteredListPres);
  return (
      <SafeAreaView style={{flex: 1, justifyContent: "center"}}>
        {isLoading ? (

       <ImageBackground source={require("../assets/edit_background_5.jpg")} style={{ flex: 1 }} resizeMode="cover">

       <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 20, }}>
         <View >
           <Text style={{ fontSize: 30, fontWeight: "700", color: "#fff", }}>P I L L S Y</Text>
         </View>
         <Image source={require("../assets/loading/giphy4.gif")} />
         <Text style={{ fontSize: 20, fontWeight: "600" }}>Chờ trong giây lát nhé....</Text>
         <View style={{ padding: 10, borderWidth: 1, borderColor: "#000", backgroundColor: "#B6FFFA", borderRadius: 10 }}>
           <Text style={{ fontSize: 18, fontWeight: "bold", color: "#211951" }}>
             Bạn có biết:
           </Text>
           <Text style={{ fontStyle: "italic", fontSize: 15, fontWeight: "500", }}>
           "Sức khỏe không phải là thứ chúng ta có thể mua. Tuy nhiên, nó có thể là một tài khoản tiết kiệm cực kỳ giá trị." - Anne Wilson Schaef.

           </Text>
         </View>
       </View>

     </ImageBackground>

      ) : (
    <View style={styles.container}>

        <View >
          <View style={styles.arrowBackContainer}>
            <Pressable
              style={({ pressed }) => pressed && styles.pressedItem}
              onPress={() => {
                navigation.navigate("MainScreen");
              }}
            >
              <ArrowBackLeft />
            </Pressable>
          </View>

          <View style={styles.containerTitle}>
            <Text style={styles.upperTitle}>Manage Prescriptions</Text>
          </View>
         <View style={{alignItems: "center"}}>
         <View style={styles.containerSearch}>
            <View style={styles.groupSeacrh}>
              <IconSearch style={styles.searchIcon} />
              <TextInput
                style={styles.inputSearch}
                value={searchInput}
                onChangeText={setSearchInput}
                placeholder="Search your date prescription"
              ></TextInput>
            </View>
          </View>
         </View>

          <FlatList
            contentContainerStyle={styles.listPrescription}
            data={filteredListPres}
            showsVerticalScrollIndicator={true}
            renderItem={({ item: data, index }) => {
              // console.log('Rendering item', index);
              const isItemDetailsVisible = isDetailsVisible[index];

              return (
                <View style={styles.cardPrescription}>
                  <DotCard />
                  <TouchableOpacity
                    style={styles.groupText}
                    onPress={() => {
                      setIsDetailsVisible((prevState) => ({
                        ...prevState,
                        [index]: !prevState[index],
                      }));
                    }}
                  >
                    <Text style={styles.title}>Đơn thuốc</Text>
                    <View style={styles.groupCreatedDate}>
                      <Text style={styles.contextTitle}>
                        Ngày scan đơn thuốc:{" "}
                      </Text>
                      <Text>
                        {/* {data.createdDate
                          ? format(parseISO(data.createdDate), "dd-MM-yyyy")
                          : "N/A"} */}
                          14/03/2024
                      </Text>
                    </View>
                    <View style={styles.context}>
                      <Text style={styles.contextTitle}>Triệu chứng: </Text>
                      <Text>{data.diagnosis}</Text>
                    </View>
                    <View style={styles.showMoreDetailContainer}>
                      <Feather
                        name={
                          isItemDetailsVisible ? "chevron-up" : "chevron-down"
                        }
                        size={24}
                        color="#282828"
                      />
                      {isItemDetailsVisible ? null : (
                        <Text>Click to show more detail</Text>
                      )}
                    </View>
                    {isItemDetailsVisible && (
                      <>
                        <Text style={styles.contextPill}>Các viên thuốc:</Text>
                        <FlatList
                          data={data.pills}
                          renderItem={({ item }) => (
                            <View style={styles.pillItem}>
                             <View style={{flexDirection:"row", paddingVertical: 10, flexWrap: "wrap"}}>
                             <Text style={{paddingRight: 10}}>
                                {" "}
                                ⚫ {item.pillName} |
                              </Text>
                              <Text style={styles.pillQuantity}>
                                {item.quantity} - {item.unit}
                              </Text>
                              <Text style={styles.pillDosage}>
                                {item.dosage_per_day}/Ngày
                              </Text>
                             </View>
                              <View style={styles.pillTimeline}>
                                <Text style={styles.HSD}>Thời hạn: </Text>
                                <Text style={styles.pillDate}>
                                  {" "}
                                  {item.dateStart
                                    ? format(
                                        parseISO(item.dateStart),
                                        "dd-MM-yyyy"
                                      )
                                    : "N/A"}{" "}
                                  -{" "}
                                  {item.dateEnd
                                    ? format(
                                        parseISO(item.dateEnd),
                                        "dd-MM-yyyy"
                                      )
                                    : "N/A"}
                                </Text>
                              </View>
                            </View>
                          )}
                          keyExtractor={(item, index) => index.toString()}
                        />
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(data, index) => index.toString()}
          />
        </View>
    </View>
      )}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowBackContainer: {
    width: 80,
    marginLeft: 20,
    marginTop: 50,
  },
  pressedItem: {
    opacity: 0.5,
  },
  containerTitle: {
    paddingHorizontal: 35,
    marginBottom: 25,
  },
  upperTitle: {
    fontSize: 30,
    color: "#03358C",
    fontWeight: "700",
    textAlign: "left",
  },

  containerSearch: {
    width: 400,
    marginBottom: 20
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
    flex: 1,
  },
  searchIcon: {
    flex: 1,
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
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 10,
    borderColor: "#279EFF",
  },

  shadowedContent: {},
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  context: {
    fontSize: 15,
    textAlign: "left",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap", // Add this line
  },
  contextTitle: {
    fontWeight: "bold",
  },
  contextPill: {
    fontSize: 15,
    textAlign: "left",
    width: "100%",
    fontWeight: "bold",
  },
  pillTimeline: {
    flexDirection: "row",
  },
  HSD: {
    fontWeight: "bold",
    color: "red",
  },
  groupText: {
    flexDirection: "column",
    gap: 8,
    paddingHorizontal: 15,
  },
  groupCreatedDate: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  showMoreDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
