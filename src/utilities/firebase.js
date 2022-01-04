import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBtq5sxCa0Bx0EqG7UTYcnmxeW70JMW79c",
  authDomain: "dht11-29479.firebaseapp.com",
  databaseURL: "https://dht11-29479-default-rtdb.firebaseio.com",
  projectId: "dht11-29479",
  storageBucket: "dht11-29479.appspot.com",
  messagingSenderId: "605861105328",
  appId: "1:605861105328:web:41afb27bb16029de63f575",
  measurementId: "G-BJ6FGB0QRQ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
