import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import PGdetailsScreen from "../screens/PGdetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import PGEdit from "../screens/PGEdit";
import Roomdetails from "../screens/Roomdetails";
import RoomEdit from "../screens/RoomEdit";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicon } from "../components/Icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "../screens/firebase/fire";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "../screens/DrawerContent";
import About from "../screens/About";
import Settings from "../screens/Settings";
import Gallery from "../screens/Gallery";

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

export const HomeTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 1,
          left: 2,
          right: 2,
          elevation: 21,

          borderRadius: 15,
          height: 60,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Homescreen"
        component={HomeStackDrawer}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 2,
              }}
            >
              <Entypo
                name="home"
                size={25}
                color="black"
                style={{ color: focused ? "#e32f45" : "#748c94" }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="PGdetails"
        component={PGdetailsStack}
        options={{
          headerTitle: "PG",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 2,
              }}
            >
              <FontAwesome5
                name="house-user"
                size={23}
                color="black"
                style={{ color: focused ? "#e32f45" : "#748c94" }}
              ></FontAwesome5>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Roomdetails"
        component={RoomdetailsStack}
        options={{
          headerTitle: "Rooms Detail",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 2,
              }}
            >
              <MaterialCommunityIcons
                name="bed-outline"
                size={30}
                color="black"
                style={{ color: focused ? "#e32f45" : "#748c94" }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
          tabBarColor: "#694fad",

          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 2,
              }}
            >
              <AntDesign
                name="profile"
                size={23}
                color="black"
                style={{ color: focused ? "#e32f45" : "#748c94" }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStackDrawer = ({ navigation }) => {
  const Logout = async () => {
    firebase.auth().signOut();
    navigation.replace("SignIn");
  };
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Book MY PG"
        component={HomeStack}
        options={{
          headerStatusBarHeight: 30,
          headerTitle: "Book My PG",
          headerStyle: {
            backgroundColor: "#80d8ff",
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <View style={{ marginRight: 10, marginTop: 10 }}>
              <Ionicon onPress={Logout} name="power" size={35} color="black" />
            </View>
          ),
        }}
      />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};

const Stack = createStackNavigator();
const HomeStack = ({ navigation }) => {
  const Logout = async () => {
    firebase.auth().signOut();
    navigation.navigate("SignIn");
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerStatusBarHeight: 30,
          headerTitle: "Book My PG",
          headerStyle: {
            backgroundColor: "#b3e5fc",
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <View style={{ marginRight: 10, marginTop: 10 }}>
              <Ionicon onPress={Logout} name="power" size={30} color="black" />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const PGdetailsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="PGdetail"
      component={PGdetailsScreen}
      options={{
        headerStatusBarHeight: 30,
        headerTitle: "PG Details",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#b2dfdb",
        },
      }}
    />
    <Stack.Screen
      name="Gallery"
      component={Gallery}
      options={{
        headerStatusBarHeight: 30,
        headerTitle: "PG Images",
        headerStyle: {
          backgroundColor: "#b3e5fc",
        },
        headerTitleAlign: "center",
      }}
    />
    <Stack.Screen
      name="EditPG"
      component={PGEdit}
      options={{
        headerTitle: "EditPG",

        headerStatusBarHeight: 30,
        headerStyle: {
          backgroundColor: "#b3e5fc",
        },
        headerTitleAlign: "center",
      }}
    />
  </Stack.Navigator>
);

export { PGdetailsStack };

const RoomdetailsStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Roomdetail"
      component={Roomdetails}
      options={{
        headerStatusBarHeight: 30,
        headerTitle: "Room Details",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#d1c4e9",
        },
      }}
    />

    <Stack.Screen
      name="EditRoom"
      component={RoomEdit}
      options={{
        headerTitle: "EditRoom",
        backgroundColor: "#fff",
        shadowColor: "#fff",
        elevation: 0,
      }}
    />
  </Stack.Navigator>
);

export { RoomdetailsStack };

const ProfileStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profiles"
      component={ProfileScreen}
      options={{
        headerStatusBarHeight: 30,
        headerTitleAlign: "center",
        headerTitle: "Profile",
        headerStyle: {
          backgroundColor: "#e8f5e9",
        },
      }}
    />
    <Stack.Screen
      name="Edit"
      component={EditProfileScreen}
      options={{
        headerStatusBarHeight: 30,
        headerTitleAlign: "center",
        headerTitle: "Edit",
        headerStyle: {
          backgroundColor: "#e8f5e9",
        },
      }}
    />
  </Stack.Navigator>
);

export { ProfileStack };
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.95,
    elevation: 21,
  },
});
