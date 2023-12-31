import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDoan1qgzIAqG4tJ2jRaur2pjfG5lMVIME",

  authDomain: "odin-inventory-a3085.firebaseapp.com",

  projectId: "odin-inventory-a3085",

  storageBucket: "odin-inventory-a3085.appspot.com",

  messagingSenderId: "840016315878",

  appId: "1:840016315878:web:d1ad60337757598f7e4227",

  measurementId: "G-4BLHXN3V2F",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;
