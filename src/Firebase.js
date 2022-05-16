import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnVSYfrhgHVKgT3LzZ5ROBM6TxIBg2vLk",
  authDomain: "srb-ecommerce-app.firebaseapp.com",
  projectId: "srb-ecommerce-app",
  storageBucket: "srb-ecommerce-app.appspot.com",
  messagingSenderId: "875496030332",
  appId: "1:875496030332:web:82091f9dc4236fccc609f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
const auth = getAuth(app);
export {auth,db};