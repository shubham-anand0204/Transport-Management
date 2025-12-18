import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, update,remove } from "firebase/database"; // <-- add update here

const firebaseConfig = {
  apiKey: "AIzaSyB4qR2ZM8bOKiJ-oPGCrmJN4nnj6n-XQ4U",
  authDomain: "transportmanagementsyste-99acd.firebaseapp.com",
  databaseURL: "https://transportmanagementsyste-99acd-default-rtdb.firebaseio.com",
  projectId: "transportmanagementsyste-99acd",
  storageBucket: "transportmanagementsyste-99acd.appspot.com",
  messagingSenderId: "177257132023",
  appId: "1:177257132023:web:0c4135d6c8ca5ab21988f2",
  measurementId: "G-73Y18QCQPQ"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ✅ Make sure 'update' is exported
export { db, ref, set, onValue, update,remove };
