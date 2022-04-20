import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import firebase, { dbh } from "./firebase/fire";
import Room from "../components/Room";
import Btn from "../components/Btn";
import { Ionicons } from "@expo/vector-icons";

const Roomdetails = ({ navigation }) => {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  let currentuser = firebase.auth().currentUser;
  let roomedit = currentuser.email;

  const getUser = async () => {
    await dbh
      .collection("Rooms")
      .doc(roomedit)
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
    <ScrollView>
      {userData ? (
        <View
          style={{
            width: "95%",
            borderRadius: 10,
            borderColor: "#FFF",
            borderWidth: 2,
            marginTop: 5,
            backgroundColor: "#fff",
            elevation: 5,
            marginLeft: "0.5%",
          }}
        >
          <Image
            style={styles.userImg}
            source={{
              uri: userData
                ? userData.img ||
                  "https://4.imimg.com/data4/XP/JB/MY-29402471/pg-rooms-500x500.jpg"
                : "https://4.imimg.com/data4/XP/JB/MY-29402471/pg-rooms-500x500.jpg",
            }}
            style={{
              height: 170,
              width: "80%",
              marginLeft: "10%",
              marginTop: "5%",
              borderRadius: 15,
            }}
          />
          <View
            style={{
              alignItems: "center",
              margin: 30,
            }}
          >
            <Btn
              onPress={() => {
                navigation.navigate("EditRoom", {
                  ParamData: userData,
                });
              }}
              title="Edit"
            />
          </View>
          <View
            style={{
              width: "90%",
              borderWidth: 1,
              borderColor: "black",
              marginLeft: "5%",
            }}
          ></View>
          <Room
            iconname={"hospital-building"}
            title={"Total Rooms"}
            data={userData.numberofrooms}
          />
          <Room
            iconname={"office-building"}
            title={"Room Detail"}
            data={userData.roomdetail}
          />
          <Room
            iconname={"bed-single-outline"}
            title={"Single Rooms"}
            data={userData.sigleshare}
          />
          <Room
            iconname={"bunk-bed-outline"}
            title={"Double Rooms"}
            data={userData.doubleshare}
          />
          <Room
            iconname={"currency-inr"}
            title={"Deposit Amount"}
            data={userData.depositeamount}
          />
          <Room
            iconname={"currency-inr"}
            title={"Total Amount"}
            data={userData.totalamount}
          />
        </View>
      ) : (
        <View
          style={{
            alignItems: "center",
            marginVertical: 100,
            padding: 10,
          }}
        >
          <Text style={styles.txt}>No Details...</Text>
          <Text style={styles.txt}>Add Your Rooms Details</Text>
          <View
            style={{
              width: 80,
              height: 80,
              alignItems: "center",
              backgroundColor: "#03a9f4",
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
                navigation.navigate("EditRoom", {
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

export default Roomdetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  txt: {
    alignItems: "center",
    margin: 10,
    color: "#191970",
    fontSize: 25,
  },

  userInfoSection: {
    marginLeft: "10%",
    paddingVertical: 75,
  },
  // screen: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },

  Text: {
    color: "#777777",
    marginLeft: "5%",
    fontSize: 21,
  },
  row: {
    flexDirection: "row",
    marginBottom: "5%",
    padding: 3,
  },

  text: {
    color: "tomato",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: "5%",
  },
});
