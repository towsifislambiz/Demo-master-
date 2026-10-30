import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// User's provided Firebase Project configuration for fir-master-d8dd6
const firebaseConfig = {
  apiKey: "AIzaSyBFL9dMH3cuEep9HT7GHH7U1Y5LyCKFpIU",
  authDomain: "fir-master-d8dd6.firebaseapp.com",
  projectId: "fir-master-d8dd6",
  storageBucket: "fir-master-d8dd6.firebasestorage.app",
  messagingSenderId: "587013095580",
  appId: "1:587013095580:web:f9e40e7552ddfabbb02d59",
  measurementId: "G-SR44QWQZX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export default app;
