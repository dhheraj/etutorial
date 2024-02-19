// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeXM_mdNJoODXP15d6OVcQ4YuWAbEsx4g",
  authDomain: "e-tutorial-5a35e.firebaseapp.com",
  databaseURL: "https://e-tutorial-5a35e-default-rtdb.firebaseio.com",
  projectId: "e-tutorial-5a35e",
  storageBucket: "e-tutorial-5a35e.appspot.com",
  messagingSenderId: "676814200130",
  appId: "1:676814200130:web:93dcfe4ce2b0fdcdbb7cdb",
  measurementId: "G-5GWX5G5WXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const provider=new GoogleAuthProvider();
export {auth,provider};