import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <StatusBar style="auto" />
      <View>{children}</View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </>
  );
};

export default Layout;

const styles = StyleSheet.create({
  footer: {
    display: "flex",
    width: "100%",
    flex: 1,
    position: "absolute",
    bottom: 0,
    justifyContent: "flex-end",
    zIndex: 100,
    borderTopWidth: 1,
    borderColor: "lightgrey",
    padding: 10,
  },
});
