import React, { useState } from "react";
import { Alert } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import FormButton from "../components/FormButton";
import { Input, Image } from "react-native-elements";
import firebase, { dbh } from "./firebase/fire";

const Settings = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const remove = async () => {
    const auth = firebase.auth();
    let Currentuser = firebase.auth().currentUser.email;

    const user = await auth.signInWithEmailAndPassword(email, password);
  };
  return (
    <View>
      <Text>Do You Want to DeleTe Your Acoount</Text>
      <View style={styles.inputContainer}>
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
      <FormButton buttonTitle="Delete Account" onPress={remove} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  inputContainer: {
    width: "80%",
    padding: 10,
    marginVertical: 50,
    alignItems: "center",
  },
});
