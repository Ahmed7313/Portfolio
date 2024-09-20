// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "portfolio-1ebdf.firebaseapp.com",
  databaseURL: "https://portfolio-1ebdf-default-rtdb.firebaseio.com/",
  projectId: "portfolio-1ebdf",
  storageBucket: "portfolio-1ebdf.appspot.com",
  messagingSenderId: "832624183795",
  appId: "YOUR_ACTUAL_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
