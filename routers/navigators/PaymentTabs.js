import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PaymentPackage from "../../components/PaymentPackage";
import PatientOrders from "../../components/PatientOrders";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export function PaymentTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTransparent: true,
        tabBarShowLabel: true,
        headerShown: true,
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
          overflow: "hidden",
          paddingBottom: 10,
          height: 60,
          paddingTop: 10,
        },
      }}
    >
      <Tab.Screen
        name="PayPackage"
        component={PaymentPackage}
        options={{
          tabBarLabel: "Payment Package",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="payment" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="OrderHistory"
        component={PatientOrders}
        options={{
          tabBarLabel: "Order History",
          tabBarBadgeStyle: { backgroundColor: "orange" },
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
