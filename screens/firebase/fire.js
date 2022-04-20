import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2t9ge-BiZm_tKMgKAyO-EUc97HQqcWTg",
  authDomain: "test-ae610.firebaseapp.com",
  projectId: "test-ae610",
  storageBucket: "test-ae610.appspot.com",
  messagingSenderId: "1096037078230",
  appId: "1:1096037078230:web:57dc2128352a272074a577",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const dbh = firebase.firestore();

export default firebase;
