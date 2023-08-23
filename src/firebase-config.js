
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCtl1zK8Ew_yXVpgK87FCRLq93IGWOItxs",
  authDomain: "digital-business-card-f4559.firebaseapp.com",
  projectId: "digital-business-card-f4559",
  storageBucket: "digital-business-card-f4559.appspot.com",
  messagingSenderId: "728018470445",
  appId: "1:728018470445:web:7d94a6f61f252986361aa4",
  measurementId: "G-3XT7Q30LJT"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
