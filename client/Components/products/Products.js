import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProductsCard from "./ProductsCard";
import { ProductData } from "../../Data/ProductData";

const Products = () => {
  return (
    <View>
      {ProductData.map((p) => (
        <ProductsCard key={p._id} p={p} />
      ))}
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({});
