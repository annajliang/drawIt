import firebase from 'firebase/app';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJMPBCvkt5jm42SNAKITYsqY9VuKJgZ0k",
  authDomain: "drawitreact.firebaseapp.com",
  databaseURL: "https://drawitreact.firebaseio.com",
  projectId: "drawitreact",
  storageBucket: "drawitreact.appspot.com",
  messagingSenderId: "1045921778796",
  appId: "1:1045921778796:web:794f48bdd9dd8474cc5c49",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;