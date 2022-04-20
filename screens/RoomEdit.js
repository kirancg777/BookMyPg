import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  Platform,
  Alert,
} from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import firebase, { dbh } from "./firebase/fire";
import FormButton from "../components/FormButton";

const RoomEdit = ({ route, navigation }) => {
  const setdata = route.params.ParamData;
  console.log(setdata);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: setdata ? "EditRoom" : "AddRoom",
    });
  }, [navigation, setdata]);
  const [image, setImage] = useState(null);
  const [imgeURI, setImgeURI] = useState(null);
  const [userData, setUserData] = useState({
    numberofrooms: setdata.numberofrooms,
    roomdetail: setdata.roomdetail,
    sigleshare: setdata.sigleshare,
    doubleshare: setdata.doubleshare,
    depositeamount: setdata.depositeamount,
    totalamount: setdata.totalamount,
    rimg: imgeURI,
  });

  let currentuser = firebase.auth().currentUser;

  let roomedit = currentuser.email;

  const getUser = async () => {
    dbh
      .collection("Rooms")
      .doc(roomedit)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User Data", documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  const handleUpdate = async () => {
    dbh
      .collection("Rooms")
      .doc(roomedit)
      .set({
        numberofrooms: userData.numberofrooms,
        roomdetail: userData.roomdetail,
        sigleshare: userData.sigleshare,
        doubleshare: userData.doubleshare,
        depositeamount: userData.depositeamount,
        totalamount: userData.totalamount,
        img: imgeURI,
      })
      .then(() => {
        console.log("User Updated!");
        Alert.alert(
          "Room details Updated!",
          "Your Details has been updated successfully."
        );
      });
    getUser();
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    let ref = firebase.storage().ref().child(`Roomimages/${currentuser.email}`);
    const snapShot = await ref.put(blob);
    const remoteUrl = await snapShot.ref.getDownloadURL();
    console.log(remoteUrl);
    setImgeURI(remoteUrl);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Permission denied!");
        }
      }
    })();
  }, []);

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      width: 300,
      height: 300,
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
      uploadImage(result.uri);
    }
  };

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={PickImage}>
        <Text style={styles.panelButtonTitle}>Choose from Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );
  bs = React.createRef();
  fall = new Animated.Value(1);

  return (
    <ScrollView style={styles.container}>
      <BottomSheet
        ref={this.bs}
        snapPoints={[330, 0]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
        }}
      >
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={{
                  uri: image
                    ? image
                    : userData
                    ? userData.img ||
                      "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
                    : "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
                }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign
                    name="camerao"
                    size={24}
                    color="black"
                    style={{
                      opacity: 0.7,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#fff",
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>
        <View behavior="padding" style={StyleSheet.container}>
          <KeyboardAvoidingView style={styles.action}>
            <MaterialIcons name="perm-identity" size={27} color="black" />
            <TextInput
              placeholder="Number Of Rooms"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={userData ? userData.numberofrooms : ""}
              onChangeText={(txt) =>
                setUserData({ ...userData, numberofrooms: txt })
              }
              style={styles.textInput}
            />
          </KeyboardAvoidingView>

          <KeyboardAvoidingView style={styles.action}>
            <FontAwesome5 name="address-book" size={24} color="black" />
            <TextInput
              placeholder="Room Details"
              placeholderTextColor="#666666"
              value={userData ? userData.roomdetail : ""}
              onChangeText={(txt) =>
                setUserData({ ...userData, roomdetail: txt })
              }
              autoCorrect={false}
              style={styles.textInput}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView style={styles.action}>
            <MaterialIcons name="email" size={24} color="black" />
            <TextInput
              placeholder="Sigle Share Rooms"
              placeholderTextColor="#666666"
              value={userData ? userData.sigleshare : ""}
              onChangeText={(txt) =>
                setUserData({ ...userData, sigleshare: txt })
              }
              autoCorrect={false}
              style={styles.textInput}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView style={styles.action}>
            <Ionicons name="call" size={24} color="black" />
            <TextInput
              placeholder="Double Share Rooms"
              placeholderTextColor="#666666"
              value={userData ? userData.doubleshare : ""}
              onChangeText={(txt) =>
                setUserData({ ...userData, doubleshare: txt })
              }
              autoCorrect={false}
              style={styles.textInput}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView style={styles.action}>
            <MaterialIcons name="location-city" size={24} color="black" />
            <TextInput
              placeholder="Deposite Amount"
              placeholderTextColor="#666666"
              value={userData ? userData.depositeamount : ""}
              onChangeText={(txt) =>
                setUserData({ ...userData, depositeamount: txt })
              }
              autoCorrect={false}
              style={styles.textInput}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView style={styles.action}>
            <Entypo name="location" size={24} color="black" />
            <TextInput
              placeholder="Total Amount"
              placeholderTextColor="#666666"
              value={userData ? userData.totalamount : ""}
              onChangeText={(txt) =>
                setUserData({ ...userData, totalamount: txt })
              }
              autoCorrect={false}
              style={styles.textInput}
            />
          </KeyboardAvoidingView>
          <FormButton buttonTitle="Update" onPress={handleUpdate} />
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default RoomEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e6fa",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: 1,
    paddingLeft: 10,
    color: "#f08080",
    fontSize: 20,
  },
  buttonContainer: {
    marginTop: 10,
    width: "50%",

    backgroundColor: "#2e64e5",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
});
