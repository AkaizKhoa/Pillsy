import React, { useState, useContext, useLayoutEffect, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Pressable,
  Linking,
  ActivityIndicator,
} from "react-native";
import ArrowBackLeft from "../assets/icon/arrow_back_left.svg";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

import axios from "axios"; // Import axios for making HTTP requests
import { BASE_URL } from "../config";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { format, parseISO } from "date-fns";
// import CC from 'currency-converter-lt'

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { set } from "date-fns";

const Tab = createMaterialTopTabNavigator();

export default function PaymentPackage() {
  const { userInfo } = useContext(AuthContext);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigation = useNavigation();
  const [isOrderListLoading, setIsOrderListLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [activePackageId, setActivePackageId] = useState(0);
  const [statusPakage, setStatusPakage] = useState(false)
  const isFocused = useIsFocused();
  const { userToken } = useContext(AuthContext);
  const [orderInfo, setOrderInfo] = useState(null);
  const packages = [
   
    {
      id: 2,
      name: "Premium",
      number: 1,
      price: 2,
      subscriptionId: "3ce50d83-b7b8-4790-a71a-19e799d53bc3",
    },
    // { id: 3, name: "goi basic plan 3", number: 1, price: 3000 },
  ];

  const handleSelectPackage = (packageId) => {
    const packageInfo = packages.find((packages) => packages.id === packageId);
    setSelectedPackage(packageInfo);
  };

  const handlePayment = () => {
    if (selectedPackage) {
      setIsPaying(true);
      axios
        .post(
          `${BASE_URL}/api/payments/bank-transfer?name=${selectedPackage.name}&number=${selectedPackage.number}&price=${selectedPackage.price}&subscriptionId=${selectedPackage.subscriptionId}`,
          null,
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        )
        .then((res) => {
          const responseData = res.data;
          setIsPaying(false);
          if (res.status === 200) {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: "Payment is Ready to scan!",
              textBody: "You are ready to using Pillsy. ",
              button: "Go to QR code",
              onPressButton: () => {
                Dialog.hide(); // Ẩn Dialog trước khi mở URL
                Linking.openURL(responseData.linkCheckout);
              },
            });
            console.log("Payment successfully");
          } else {
            console.log("Payment failed");
          }
        })
        .catch((e) => {
          console.log(`Payment error ${e}`);
          setIsPaying(false);
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Payment is fail!",
            textBody: "Something error , try again",
            button: "close",
          });
        });
    } else {
      alert("Please select a package before proceeding with payment.");
    }
  };

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
        setIsOrderListLoading(true);
        const response = await axios.get(url, {
          signal: abortController.signal,
          headers: {
            Authorization: "Bearer " + userToken,
          },
        });
        const listOrder = response.data;
        console.log(listOrder.status);
        listOrder.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );
        const firstItem = listOrder[0];
        let sPackage = firstItem.orderDetails[0].subscriptionPackage;
        setStatusPakage(firstItem.status)

        let createdDate = new Date(firstItem.createdDate);
        let expDate = new Date(
          createdDate.getTime() + sPackage.period * 24 * 60 * 60 * 1000
        );
        let currentDate = new Date();
        if (currentDate > expDate) {
          setActivePackageId(0);
        } else {
          const pkg = packages.find(
            (p) => p.subscriptionId === sPackage.subscriptionId
          );
          setActivePackageId(pkg.id);
          const expDateStr = expDate.toString();
          setOrderInfo({
            ...firstItem,
            expireDate: expDateStr,
            daysToExpire: Math.floor(
              (expDate - currentDate) / (1000 * 60 * 60 * 24)
            ),
          });
        }
        setIsOrderListLoading(false);
      } catch (error) {
        if (abortController.signal.aborted) {
          console.log("Data fetching cancelled");
        } else {
          // Handle error
        }
        setIsOrderListLoading(false);
        setActivePackageId(0);
        setOrderInfo(null);
      } finally {
        setIsOrderListLoading(false);
        console.log(statusPakage);
      }
    };

    fetchData();

    return () => abortController.abort("Data fetching cancelled");
  }, [isFocused]);

  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
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
          <Text style={styles.upperTitle}>Payment</Text>
        </View>
        {isOrderListLoading ? (
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
          <>
            <FlatList
              data={packages}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.packageItem,
                    selectedPackage &&
                      selectedPackage.id === item.id &&
                      styles.selectedPackageItem,
                  ]}
                  onPress={() => handleSelectPackage(item.id)}
                >
                  <View style={styles.containerPackage}>
                    {/* Chỗ này check activePackage == item.id thì nó hiển thị */}
                    {activePackageId === item.id && statusPakage && (
                      <View style={styles.activeBadge}>
                        <Text style={{ color: "white" }}>Active</Text>
                      </View>
                    )}
                    <Text style={styles.packageName}>Package {item.name}</Text>
                    <Text style={styles.packagePrice}>
                      Price: {item.price}$
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            {/* Chỗ này check activeId == 1 và order ko rỗng thì active thời hạn */}
            {activePackageId !== 0 && orderInfo != null && statusPakage ? (
              <Text
                style={{ color: "red", textAlign: "center", marginTop: 20 }}
              >
                {`You have an active package, expire to ${format(
                  orderInfo?.expireDate,
                  "dd-MM-yyyy"
                )} (${orderInfo.daysToExpire} days left)`}
              </Text>
            ) : (
              <TouchableOpacity
                style={styles.payButton}
                onPress={handlePayment}
              >
                {isPaying ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.payButtonText}>Pay Now</Text>
                )}
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  arrowBackContainer: {
    width: 80,
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
  containerPackage: {
    paddingVertical: 15,
    position: "relative",
    width: "100%",
  },
  packageItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 20,
  },
  selectedPackageItem: {
    backgroundColor: "#e0e0e0",
  },
  activeBadge: {
    position: "absolute",
    top: 10,
    right: 0,
    backgroundColor: "green",
    paddingVertical: 5,
    fontWeight: "bold",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  packageName: {
    fontSize: 16,
  },
  packagePrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  payButton: {
    backgroundColor: "blue",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  payButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
