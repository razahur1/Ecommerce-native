import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { CartData } from "../Data/CartData";
import PriceTable from "../Components/Cart/PriceTable";
import CartItem from "../Components/Cart/CartItem";
import Layout from "../Components/Layout/Layout";

const Cart = ({ navigation }) => {
  const [cartItems, setCartitems] = useState(CartData);
  return (
    <Layout>
      <View>
        <Text style={styles.heading}>
          {cartItems?.length > 0
            ? `You have ${cartItems?.length} Item Left in Your Cart`
            : `OOPS Your Cart is EMPTY!`}
        </Text>
        {cartItems?.length > 0 && (
          <>
            <ScrollView>
              {cartItems?.map((item) => (
                <CartItem item={item} key={item._id} />
              ))}
            </ScrollView>
            <View>
              <PriceTable title={"Price"} price={999} />
              <PriceTable title={"Tax"} price={1} />
              <PriceTable title={"Shipping"} price={1} />
              <View style={styles.grandTotal}>
                <PriceTable title={"Grand Total"} price={1001} />
              </View>
              <TouchableOpacity
                style={styles.btnCheckout}
                onPress={() => navigation.navigate("Checkout")}
              >
                <Text style={styles.btnCheckoutText}>CHECKOUT</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </Layout>
  );
};

export default Cart;

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    color: "green",
    marginTop: 10,
  },
  grandTotal: {
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "#ffffff",
    padding: 5,
    margin: 5,
    marginHorizontal: 20,
  },
  btnCheckout: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: "#000000",
    width: "90%",
    marginHorizontal: 20,
    borderRadius: 20,
  },
  btnCheckoutText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
