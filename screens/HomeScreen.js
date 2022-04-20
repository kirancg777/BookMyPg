import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import { data } from "../data/Data";
import { TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Carousel data={data} />

      <View
        style={{
          width: "95%",
          height: "50%",
          alignItems: "center",
          marginVertical: 20,
          margin: 10,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            width: "95%",
            flexDirection: "row",
            borderRadius: 30,
            margin: "12%",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              width: "31%",
              alignItems: "center",
              backgroundColor: "#FFF",

              padding: 10,
              borderRadius: 20,
              elevation: 10,
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("PGdetail")}
            >
              <MaterialCommunityIcons
                name="home-city"
                size={50}
                color="#e91e63"
              />
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 15,
                  fontStyle: "normal",
                  fontWeight: "bold",
                  color: "#708090",
                  elevation: 10,
                }}
              >
                Add/Edit PG
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "31%",
              backgroundColor: "#FFF",
              alignItems: "center",
              padding: 10,
              elevation: 10,
              borderRadius: 20,
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("Gallery")}
            >
              <MaterialIcons name="photo-library" size={50} color="#82b1ff" />
              <Text
                style={{
                  paddingTop: 5,
                  fontStyle: "normal",
                  fontWeight: "bold",
                  color: "#708090",
                  fontSize: 15,
                  elevation: 10,
                }}
              >
                Gallery
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: "35%",
            backgroundColor: "#FFF",
            alignItems: "center",
            padding: 10,
            elevation: 10,
            borderRadius: 20,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Roomdetails")}
          >
            <Ionicons name="md-bed" size={50} color="#69f0ae" />

            <Text
              style={{
                fontStyle: "normal",
                fontWeight: "bold",
                color: "#9e9e9e",
                fontSize: 15,
                elevation: 10,
              }}
            >
              Add/Edit Room
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    width: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainerStyle: {
    width: 10,
    alignItems: "center",
  },
});
