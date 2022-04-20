import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import { Drawer } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function DrawerContent(props) {
  return (
    <ScrollView style={{ backgroundColor: "#fffafa" }}>
      <ImageBackground
        source={{
          uri: "https://wallpaperaccess.com/full/3915815.jpg",
        }}
        style={{
          width: undefined,
          padding: 16,
          height: 200,
          paddingTop: 48,
        }}
      ></ImageBackground>
      <Drawer.Section style={styles.drawerSection}>
        <DrawerItem
          icon={() => <AntDesign name="home" size={28} color="#d50000" />}
          label="Home"
          onPress={() => {
            props.navigation.navigate("Book MY PG");
          }}
        />
        <DrawerItem
          icon={() => <AntDesign name="user" size={28} color="#673ab7" />}
          label="Profile"
          onPress={() => {
            props.navigation.navigate("Profile");
          }}
        />
        <DrawerItem
          icon={() => <AntDesign name="setting" size={28} color="#212121" />}
          label="Settings"
          onPress={() => {
            props.navigation.navigate("Settings");
          }}
        />
        <DrawerItem
          icon={() => (
            <MaterialCommunityIcons
              name="account-details"
              size={28}
              color="#00bcd4"
            />
          )}
          label="About"
          onPress={() => {
            props.navigation.navigate("About");
          }}
        />
      </Drawer.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  drawerSection: {
    marginVertical: 50,
  },
});
