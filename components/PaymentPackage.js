import React, { useState, useContext, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Pressable,
  Linking,
} from "react-native";
import ArrowBackLeft from "../assets/icon/arrow_back_left.svg";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios"; // Import axios for making HTTP requests
import { BASE_URL } from "../config";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
// import CC from 'currency-converter-lt'

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function PaymentPackage() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigation = useNavigation();
  const { userToken } = useContext(AuthContext);
  const packages = [
    {
      id: 1,
      name: "Basic",
      number: 1,
      price: 1,
      subscriptionId: "b27301f2-6c11-4671-9962-3be7e32d5707",
    },
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
      console.log(selectedPackage);
      // setSelectedPackage.price = 0;
      console.log("token purchase", userToken);
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
          console.log("Response Data:", responseData);
          if (res.status === 200) {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: "Payment is Ready to scan!",
              textBody: "You are ready to using Pillsy. ",
              button: "Go to QR code",
              onPressButton: () => {
                Dialog.hide(); // Ẩn Dialog trước khi mở URL
                Linking.openURL(responseData);
              },
            });
            console.log("Payment successfully");
          } else {
            console.log("Payment failed");
          }
        })
        .catch((e) => {
          console.log(`Payment error ${e}`);
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
                <Text style={styles.packageName}>Package {item.name}</Text>
                <Text style={styles.packagePrice}>Price: {item.price}$</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
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
