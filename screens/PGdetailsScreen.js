import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import firebase, { dbh } from "./firebase/fire";
import { FontAwesome } from "@expo/vector-icons";
import PGdetail from "../components/PGdetail";
import Btn from "../components/Btn";
import { Ionicons } from "@expo/vector-icons";

const PGdetailsScreen = ({ navigation }) => {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  let currentuser = firebase.auth().currentUser.email;
  console.log(userData);
  let Pgtoedit = currentuser;

  const getUser = async () => {
    await dbh
      .collection("pgdetail")
      .doc(Pgtoedit)
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

  return (
    <ScrollView>
      <View style={styles.screen}>
        {userData ? (
          <View
            style={{
              width: "95%",
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
              marginTop: 5,
              backgroundColor: "#fff",
              elevation: 5,
              marginLeft: "1%",
              // marginVertical: "20%",
            }}
          >
            <Image
              source={{
                uri: userData
                  ? userData.PImg ||
                    "https://www.nerolac.com/sites/default/files/vibrant-home-exterior-colours-banner-1.jpg"
                  : "https://www.nerolac.com/sites/default/files/vibrant-home-exterior-colours-banner-1.jpg",
              }}
              style={{
                height: 170,
                width: "70%",
                marginLeft: "15%",
                marginTop: "5%",
                borderRadius: 15,
                paddingVertical: 10,
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
                  navigation.navigate("EditPG", {
                    ParamData: userData,
                  });
                }}
                title="Edit"
              />
            </View>

            <View
              style={{
                width: "90%",
                borderWidth: 0.5,
                borderColor: "#696969",

                marginLeft: "5%",
              }}
            ></View>
            <PGdetail
              iconname={"office-building"}
              title={"Name"}
              data={userData.name}
            />
            <PGdetail
              iconname={"account-details-outline"}
              title={"Address"}
              data={userData.address}
            />
            <PGdetail
              iconname={"image-filter-none"}
              title={"Type"}
              data={userData.type}
            />
            <PGdetail
              iconname={"bed-double-outline"}
              title={"Rooms"}
              data={userData.rooms}
            />
            <PGdetail
              iconname={"account-details"}
              title={"Details"}
              data={userData.details}
            />
            <PGdetail
              iconname={"directions"}
              title={"Location"}
              data={userData.location}
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
            <Text
              style={{
                alignItems: "center",
                margin: 10,
                color: "#191970",
                fontSize: 30,
              }}
            >
              No Details...
            </Text>
            <Text
              style={{
                alignItems: "center",
                margin: 10,
                color: "#191970",
                fontSize: 25,
              }}
            >
              Please Add Your PG Details
            </Text>

            <View
              style={{
                width: 80,
                height: 80,
                alignItems: "center",
                backgroundColor: "#191970",
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
                  navigation.navigate("EditPG", {
                    ParamData: userData ? userData : "",
                  })
                }
              >
                <Ionicons name="add-outline" size={70} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default PGdetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  txt: {},
  screen: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // marginRight: 5,
  },
  userInfoSection: {
    marginLeft: "10%",
    paddingVertical: 75,
  },

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
