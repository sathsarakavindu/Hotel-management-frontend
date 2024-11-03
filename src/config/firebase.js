// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXgXDKhcT6tQui0v58DRVYMsJEZvu2o9A",
  authDomain: "imagesave-5292f.firebaseapp.com",
  databaseURL: "https://imagesave-5292f-default-rtdb.firebaseio.com",
  projectId: "imagesave-5292f",
  storageBucket: "imagesave-5292f.appspot.com",
  messagingSenderId: "769900868502",
  appId: "1:769900868502:web:97535718883c7a95f9e3b7",
  measurementId: "G-T3DL1FLVHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;