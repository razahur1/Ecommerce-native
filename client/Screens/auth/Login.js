import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import InputBox from "../../Components/Form/InputBox";

//redux hooks
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/features/auth/userAction";

const Login = ({ navigation }) => {
  const loginImage = "https://cdn-icons-png.freepik.com/512/295/295128.png";
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  //hooks
  const dispatch = useDispatch();
  //global state
  const { loading, error, message } = useSelector((state) => state.user);
  const handleLogin = () => {
    if (!email || !password) {
      return alert("Please add email or password");
    }
    setEamil("");
    setPassword("");
    dispatch(login(email, password));
    // alert("Login successfully");
    // navigation.navigate("Home");
  };

  // life cycle
  useEffect(()=>{
    if(error){
      alert(error);
      dispatch({type:'clearError'})
    }
    if(message){
      alert(message);
      dispatch({type:'clearError'})
      navigation.navigate("Home");
    }
  },[error,message,dispatch])
  return (
    <View style={styles.container}>
      <Image source={{ uri: loginImage }} style={styles.image} />
      <InputBox
        placeholder={"Enter You Email"}
        value={email}
        setValue={setEamil}
        autoComplete={"email"}
      />
      <InputBox
        value={password}
        setValue={setPassword}
        placeholder={"Enter You Password"}
        secureTextEntry={true}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>
        <Text>
          Not a user yet ? Please{"  "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Register")}
          >
            Register !
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    //alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  image: {
    height: 200,
    width: "100%",
    resizeMode: "contain",
    marginBottom: 10,
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtn: {
    backgroundColor: "#000000",
    width: "80%",
    justifyContent: "center",
    height: 40,
    borderRadius: 10,
    marginVertical: 20,
  },
  loginBtnText: {
    color: "#ffffff",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "500",
    fontSize: 18,
  },
  link: {
    color: "red",
  },
});
