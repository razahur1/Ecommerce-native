import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Layout from "../Components/Layout/Layout";
import Header from "../Components/Layout/Header";
import Categories from "../Components/Category/Categories";
import Banner from "../Components/Banner/Banner";
import Products from "../Components/products/Products";

const Home = () => {
  return (
    <Layout>
      <Header />
      <Categories />
      <Banner />
      <Products />
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
