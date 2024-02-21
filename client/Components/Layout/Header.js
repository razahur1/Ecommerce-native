import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const Header = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    console.log(searchText);
    setSearchText("");
  };

  return (
    <View style={{ height: 90, backgroundColor: "lightgray" }}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchBox}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Icon name="search" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  searchBox: {
    borderWidth: 0.3,
    width: "100%",
    position: "absolute",
    left: 15,
    color: "#000000",
    backgroundColor: "#ffffff",
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  searchBtn: {
    position: "absolute",
    left: "95%",
  },
  searchIcon: {
    fontSize: 18,
    color: "#000000",
  },
});
