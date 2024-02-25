import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";

import Home from "./Screens/Home";
import About from "./Screens/About";
import ProductDetails from "./Screens/ProductDetails";
import Cart from "./Screens/Cart";
import Checkout from "./Screens/Checkout";
import Payment from "./Screens/Payment";
import Login from "./Screens/auth/Login";
import Register from "./Screens/auth/Register";
import Account from "./Screens/Account/Account";
import Profile from "./Screens/Account/Profile";
import Notifications from "./Screens/Account/Notifications";
import MyOrders from "./Screens/Account/MyOrders";
import Dashboard from "./Screens/Admin/Dashboard";
import store from "./redux/store.js";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="MyOrders" component={MyOrders} />
          <Stack.Screen name="AdminPannel" component={Dashboard} />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
