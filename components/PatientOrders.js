import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useContext, useLayoutEffect } from "react";
import DotCard from "../assets/icon/dot-card.svg";
import ArrowBackLeft from "../assets/icon/arrow_back_left.svg";

import { useNavigation, useIsFocused } from "@react-navigation/native";
import { BASE_URL } from "../config";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { format, parseISO } from "date-fns";

// const fakeData = [
//   {
//     orderID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     totalPrice: 2,
//     orderDetails: [
//       {
//         subscriptionPackage: {
//           packageType: "Premium",
//           period: 90,
//           currencyUnit: "USD",
//           createdDate: "2024-03-08T14:38:28.268Z",
//         },
//       },
//     ],
//   },
// ];

export default function PatientOrders() {
  const [order, setOrder] = useState("");
  const [listOrder, setListOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  const navigation = useNavigation();

  const { userInfo } = useContext(AuthContext);
  const { userToken } = useContext(AuthContext);

  //   orderDetails[0].subscriptionPackage.packageType period unitPrice currencyUnit

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  useEffect(() => {
    const abortController = new AbortController();

    const url = `${BASE_URL}/api/orders/all-orders/patient/${userInfo.PatientId}`;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url, {
          signal: abortController.signal,
          headers: {
            Authorization: "Bearer " + userToken,
          },
        });
        // console.log(response.data);
        const listOrderData = response.data;
        listOrderData.sort(
          (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
        );
        setListOrder(listOrderData);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setListOrder([]);
        }

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
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* <Image source={require("../assets/loading/order.gif")} /> */}
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.arrowBackContainer}>
            <Pressable style={({ pressed }) => pressed && styles.pressedItem}
              onPress={() => {
                navigation.navigate("MainScreen")

              }}>
              <ArrowBackLeft />
            </Pressable>
          </View>
          <View style={styles.containerTitle}>
            <Text style={styles.upperTitle} >Patient Orders</Text>
          </View>
          
          <FlatList
            contentContainerStyle={styles.listOrdercription}
            data={listOrder}
            showsVerticalScrollIndicator={true}
            renderItem={({ item, index }) => {
              let sPackage = item.orderDetails[0].subscriptionPackage;
              let createdDate = new Date(item.createdDate);
              let newDate = new Date(
                createdDate.getTime() + sPackage.period * 24 * 60 * 60 * 1000
              );
              return (
                <View style={styles.cardPrescription}>
                  <DotCard />
                  <View style={styles.groupText}>
                    <View style={styles.borderBoxText}>
                    <Text style={styles.title}>
                      Package {sPackage.packageType || "N/A"}
                    </Text>
                      </View>
                    <View style={styles.groupCreatedDate}>
                      <Text style={styles.contextTitle}>Ngày đăng kí: </Text>
                      <Text>
                        {sPackage?.createdDate
                          ? format(
                              parseISO(sPackage?.createdDate),
                              "dd-MM-yyyy"
                            )
                          : "N/A"}
                      </Text>
                    </View>
                    <View style={styles.groupCreatedDate}>
                      <Text style={styles.contextTitle}>Ngày hết hạn: </Text>
                      <Text>
                        {sPackage?.period
                          ? format(newDate, "dd-MM-yyyy")
                          : "N/A"}
                      </Text>
                    </View>
                    <View style={styles.context}>
                      <Text style={styles.contextTitle}> {sPackage.status === true ? 'Đã duyệt' : 'Chưa duyệt'} thanh toán: </Text>
                      <Text>
                        {sPackage.unitPrice} {sPackage.currencyUnit}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
            keyExtractor={(data, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
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
  },
  upperTitle: {
    fontSize: 30,
    color: "#03358C",
    fontWeight: "700",
    textAlign: "left",
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
    flex: 1,
  },
  listOrdercription: {
    paddingHorizontal: 35,
    margin: 10,
    marginBottom: 30,
  },
  cardPrescription: {
    width: "100%",
    height: "auto",
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 20,
    borderColor:'#0C356A'
    
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
  borderBoxText:{
    borderWidth: 1,
    borderColor: '#2E4F4F',
    backgroundColor: "#87CBB9",
    borderRadius: 10,
    alignItems: "center"
  }
});
