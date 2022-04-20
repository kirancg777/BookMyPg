import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Image, Input } from "react-native-elements";
import firebase, { dbh } from "./firebase/fire";
import auth from "./firebase/fire";
import Button from "../components/Button";
import { Alert } from "react-native";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const signUp = async () => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
          await userCredential.user
            .sendEmailVerification()
            .then(() => {
              Alert.alert(
                "Email sent",
                "Email is sent to your gmail once verified you can login ",
                [
                  {
                    text: "Ok",
                    onPress: () => navigation.navigate("SignIn"),
                  },
                ]
              );
            })
            .catch((err) => {
              Alert.alert(
                "Verification Error",
                "Couldn't send email for verification"
              );
            });

          firebase.auth().onAuthStateChanged((userCredential) => {
            if (userCredential) {
              if (userCredential.emailVerified) {
                dbh.collection("users").doc(email).set({
                  email: email,
                });
                firebase
                  .auth()
                  .signInWithEmailAndPassword(email, password)
                  .then(() => {
                    navigation.navigate("SignIn");
                  })
                  .catch((err) => {
                    Alert.alert("SignInError", "Something went wrong");
                  });
              }
            }
          });
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
              uri: "https://www.pinclipart.com/picdir/big/133-1331440_free-vector-graphic-create-an-account-icon-clipart.png",
            }}
            style={{
              width: 100,
              height: 100,
              marginBottom: 20,
            }}
          />
          <Input label="Name" value={name} onChangeText={setName} />
          <Input label="Email" value={email} onChangeText={setEmail} />
          <Input
            label="Password"
            Value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button
            style={{ marginVertical: 10 }}
            onPress={signUp}
            title="Signup"
          />
        </View>
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      </View>
    </ScrollView>
  );
};

export default SignupScreen;

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
    backgroundColor: "white",
  },
});
