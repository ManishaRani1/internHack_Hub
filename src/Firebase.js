// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBX41z7Kmy-bjwpxgAl9qDT5YRT5UbqAes",
//   authDomain: "inter-e474d.firebaseapp.com",
//   projectId: "inter-e474d",
//   storageBucket: "inter-e474d.firebasestorage.app",
//   messagingSenderId: "499199362004",
//   appId: "1:499199362004:web:c4468860af676df34a4c41",
//   measurementId: "G-D5265YB8W8"
// };
const firebaseConfig = {
  apiKey: "AIzaSyCI52S2Y7tWkAyyq75YijkE9Ad-1Xk74o8",
  authDomain: "internship-x-f4e8c.firebaseapp.com",
  projectId: "internship-x-f4e8c",
  storageBucket: "internship-x-f4e8c.firebasestorage.app",
  messagingSenderId: "366214823482",
  appId: "1:366214823482:web:6449ac7181722c8d653f03",
  measurementId: "G-BFFVVJFNEE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export  const db = getFirestore(app)
export  const auth = getAuth(app)