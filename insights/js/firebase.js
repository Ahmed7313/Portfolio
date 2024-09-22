// js/firebase.js
// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",               // Replace with your API key
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com", // Replace with your Auth domain
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com", // Replace with your Database URL
  projectId: "YOUR_PROJECT_ID",         // Replace with your Project ID
  storageBucket: "YOUR_PROJECT_ID.appspot.com", // Replace with your Storage Bucket
  messagingSenderId: "YOUR_SENDER_ID",  // Replace with your Messaging Sender ID
  appId: "YOUR_APP_ID"                  // Replace with your App ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
