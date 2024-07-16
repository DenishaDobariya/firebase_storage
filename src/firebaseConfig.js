// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB1HWq6mnvhed7XweviuvBcD8uv8fffDw",
  authDomain: "contactclone-92298.firebaseapp.com",
  projectId: "contactclone-92298",
  storageBucket: "contactclone-92298.appspot.com",
  messagingSenderId: "448938696121",
  appId: "1:448938696121:web:f6843f45797e4eeab66a68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
