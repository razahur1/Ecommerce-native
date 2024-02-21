import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ProductData } from "../Data/ProductData";
import Layout from "../Components/Layout/Layout";

const ProductDetails = ({ route }) => {
  const [pDetails, setPDetails] = useState({});
  const [qty, setQty] = useState(1);
  const { params } = route;
  useEffect(() => {
    const getProduct = ProductData.find((p) => {
      return p?._id === params?._id;
    });
    setPDetails(getProduct);
  }, [params?._id]);

  const handleAddQty = () => {
    if (qty === 10) return alert("you can't add more than 10 quantity");
    setQty((prev) => prev + 1);
  };

  const handleRemoveQty = () => {
    if (qty <= 1) return;
    setQty((prev) => prev - 1);
  };

  return (
    <Layout>
      <View>
        {/* <Text>{JSON.stringify(pDetails,null,4)}</Text> */}
        <Image source={{ uri: pDetails?.imageUrl }} style={styles.image} />
        <View style={styles.container}>
          <Text style={styles.title}>{pDetails?.name}</Text>
          <Text style={styles.title}>Price : {pDetails?.price} $</Text>
          <Text style={styles.desc}>
            Description : {pDetails?.description} $
          </Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btnCart}
              onPress={() => alert(`${qty} items added to cart`)}
              disabled={pDetails?.quantity <= 0}
            >
              <Text style={styles.btnCartText}>
                {pDetails?.quantity > 0 ? "ADD TO CART" : "OUT OF STOCK"}
              </Text>
            </TouchableOpacity>
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btnQty} onPress={handleRemoveQty}>
                <Text style={styles.btnQtyText}>-</Text>
              </TouchableOpacity>
              <Text>{qty}</Text>
              <TouchableOpacity style={styles.btnQty} onPress={handleAddQty}>
                <Text style={styles.btnQtyText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
  container: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    textAlign: "left",
  },
  desc: {
    fontSize: 12,
    textTransform: "capitalize",
    textAlign: "justify",
    marginVertical: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  btnCart: {
    width: 180,
    backgroundColor: "#000000",
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
  },
  btnCartText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  btnQty: {
    backgroundColor: "lightgray",
    width: 40,
    alignItems: "center",
    marginHorizontal: 10,
  },
  btnQtyText: {
    fontSize: 20,
  },
});
