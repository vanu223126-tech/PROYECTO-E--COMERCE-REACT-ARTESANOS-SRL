
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAOb0ojkMkXFxTh5PMHSSYbzdlDKjmKAQY",
  authDomain: "mi-ecommerce-react-fa50f.firebaseapp.com",
  projectId: "mi-ecommerce-react-fa50f",
  storageBucket: "mi-ecommerce-react-fa50f.firebasestorage.app",
  messagingSenderId: "874676818546",
  appId: "1:874676818546:web:af187a437964b42cc4a8eb"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
