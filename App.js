import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeTab } from "./navigation/Tab";
import { DrawerContent } from "./screens/DrawerContent";
import ProfileScreen from "./screens/ProfileScreen";
import About from "./screens/About";
import Settings from "./screens/Settings";
import Screennavigation from "./navigation/Screennavigation";

// const Drawer = createDrawerNavigator();

// const defaultoptins = {
//   headerShown: false,
// };

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
//         <Drawer.Screen
//           name="Home"
//           component={HomeTab}
//           options={defaultoptins}
//         />
//         <Drawer.Screen name="Profile" component={ProfileScreen} />
//         <Drawer.Screen name="About" component={About} />
//         <Drawer.Screen name="Settings" component={Settings} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };

export default function App() {
  return <Screennavigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
