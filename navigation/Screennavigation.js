import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";
import SplashScreen from "../screens/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeTab } from "../navigation/Tab";

const Stack = createStackNavigator();
const defaultoptins = {
  headerShown: false,
};
export default stackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Loading"
          component={SplashScreen}
          options={{
            headerStatusBarHeight: 35,
            headerTitle: "Book My PG",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SigninScreen}
          options={{
            headerStatusBarHeight: 35,
            headerTitle: "Signin",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            headerStatusBarHeight: 35,
            headerTitle: "Signup",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen name="Home" component={HomeTab} options={defaultoptins} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
