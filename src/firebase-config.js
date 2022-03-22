import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsguEAES0VaogUgEZoM1L7gEPbybo8Dn0",
  authDomain: "react-booklist-eb75d.firebaseapp.com",
  projectId: "react-booklist-eb75d",
  storageBucket: "react-booklist-eb75d.appspot.com",
  messagingSenderId: "472516758110",
  appId: "1:472516758110:web:34aec64ba433fd8ae842cf"
};


const app = initializeApp(firebaseConfig);


export const storage = getStorage(app);
export const database = getFirestore(app);