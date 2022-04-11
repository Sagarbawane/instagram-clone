import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTD9iTzQhQcik_9zp2HQLLV8LOZToqbjY",
  authDomain: "instagram-clone-e805c.firebaseapp.com",
  projectId: "instagram-clone-e805c",
  storageBucket: "instagram-clone-e805c.appspot.com",
  messagingSenderId: "119305191129",
  appId: "1:119305191129:web:006615e4e805a5acff08c8",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firebase.firestore();
const auth = app.firebase.auth();
console.log(app.firebase.auth());
const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, provider };
