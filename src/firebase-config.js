import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const apiKey = process.env.REACT_APP_APIKEY;
const authDomain = process.env.REACT_APP_AUTHDOMAIN;
const projectId = process.env.REACT_APP_PROJECTID;
const storageBucket = process.env.REACT_APP_STORAGEBUCKET;
const messagingSenderId = process.env.REACT_APP_MESSAGINGSENDERID;
const appId = process.env.REACT_APP_APPID;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId
};


const app = initializeApp(firebaseConfig);


export const storage = getStorage(app);
export const database = getFirestore(app);
export const auth = getAuth(app);
export default app;