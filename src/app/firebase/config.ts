
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBsKgnUAxAAoVELMREZq8g02yPbEL8pL6k",
  authDomain: "notepad-d5925.firebaseapp.com",
  projectId: "notepad-d5925",
  storageBucket: "notepad-d5925.appspot.com",
  messagingSenderId: "427955779464",
  appId: "1:427955779464:web:be7e474eaa70ff91192c3d",
  databaseURL:'https://notepad-d5925-default-rtdb.asia-southeast1.firebasedatabase.app/'
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)


