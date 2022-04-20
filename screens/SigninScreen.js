import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Text } from "react-native";
import { Input, Image } from "react-native-elements";
import firebase from "./firebase/fire";
import Button from "../components/Button";
import Color from "../constants/Color";
import { ScrollView } from "react-native-gesture-handler";

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signIn = async () => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res);
          navigation.replace("Home");
        });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.screen}>
        <View style={styles.inputContainer}>
          <Image
            source={{
              uri: "https://ps.w.org/limit-login-attempts-reloaded/assets/icon-256x256.png?rev=2456910",
            }}
            style={{ width: 100, height: 100, marginBottom: 20 }}
          />
          <Input
            placeholder="Email"
            autoFocus
            type="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            type="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

        <Button
          style={{ backgroundColor: "tomato" }}
          title="SignIn"
          onPress={signIn}
        />

        <Text style={{ textAlign: "center", padding: 15 }}>
          Don't have an account? Sign Up
        </Text>
        <Button
          style={{ marginVertical: 5 }}
          onPress={() => navigation.navigate("Signup")}
          title="Signup"
        />
      </View>
    </ScrollView>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  inputContainer: {
    width: "80%",
    padding: 10,
    marginVertical: 50,
    alignItems: "center",
  },
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
