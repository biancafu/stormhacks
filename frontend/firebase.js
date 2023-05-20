// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAC5BPoXW9ZIk1fB-nOEaQiTs86n-g1CSs",
  authDomain: "stormhacks-74baa.firebaseapp.com",
  projectId: "stormhacks-74baa",
  storageBucket: "stormhacks-74baa.appspot.com",
  messagingSenderId: "1029025386029",
  appId: "1:1029025386029:web:e0caa53cd4d64d8601f2a4",
  measurementId: "G-Y97D7PLTR4"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}
const analytics = getAnalytics(app);
const auth = firebase.auth()

export {auth};
