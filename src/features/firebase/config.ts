import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCWx9vmNfUqFP_0kxGjoJ1FWZfwpr7MyxQ",
  authDomain: "hawkeye-trades.firebaseapp.com",
  projectId: "hawkeye-trades",
  storageBucket: "hawkeye-trades.appspot.com",
  messagingSenderId: "818318241428",
  appId: "1:818318241428:web:7bd9811a10e70311cc8e81"
}

export const initFirebaseConfig = initializeApp(firebaseConfig);
export const db =  getFirestore(initFirebaseConfig);