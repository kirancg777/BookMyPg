import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import firebase, { dbh } from "./firebase/fire";
import { Ionicons } from "@expo/vector-icons";
import Profile from "../components/Profile";
import Btn from "../components/Btn";
const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  let currentuser = firebase.auth().currentUser;

  let Emailtoedit = currentuser.email;

  const getUser = async () => {
    await dbh
      .collection("users")
      .doc(Emailtoedit)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setUserData({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        }
      });
  };
  useEffect(() => {
    getUser();
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading]);

  console.log(userData);
  return (
    <ScrollView style={{ backgroundColor: "#ffffff" }}>
      {userData ? (
        <View
          style={{
            height: "35%",
            backgroundColor: "#f0f8ff`",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{
              uri: userData
                ? userData.userImg ||
                  "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
                : "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
            }}
            style={{
              width: 130,
              height: 130,
              borderRadius: 75,
              marginVertical: 15,
            }}
          />
          <View>
            <Btn
              onPress={() => {
                navigation.navigate("Edit", {
                  paramData: userData,
                });
              }}
              title="Edit"
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            alignItems: "center",
            marginVertical: 100,
            padding: 10,
          }}
        >
          <Text
            style={{
              alignItems: "center",
              margin: 10,
              color: "#212121",
              fontWeight: "bold",
              fontSize: 30,
            }}
          >
            No Details...
          </Text>
        </View>
      )}

      {userData ? (
        <Profile
          username={userData.name}
          Addr={userData.address}
          pno={userData.phoneNo}
          city={userData.city}
          st={userData.state}
        />
      ) : (
        <View
          style={{
            alignItems: "center",
            marginVertical: 100,
            padding: 10,
          }}
        >
          {/* <Text
            style={{
              alignItems: "center",
              margin: 10,
              color: "#212121",
              fontWeight: "bold",
              fontSize: 30,
            }}
          >
            No Details...
          </Text> */}
          <Text
            style={{
              alignItems: "center",
              margin: 10,
              color: "#212121",
              fontWeight: "bold",
              fontSize: 25,
            }}
          >
            Please Add Your Profile
          </Text>

          <View
            style={{
              width: 80,
              height: 80,
              alignItems: "center",
              backgroundColor: "#f50057",
              justifyContent: "center",

              margin: 20,
              borderRadius: 40,
              elevation: 3,
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                marginLeft: 5,
              }}
              onPress={() =>
                navigation.navigate("Edit", {
                  ParamData: userData ? userData : "",
                })
              }
            >
              <Ionicons name="add-outline" size={70} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
