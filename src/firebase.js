import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD_zpRt8qUwD1bvvlkuV8rgHUug6VOi8hM",
  authDomain: "todo-app-8777a.firebaseapp.com",
  databaseURL: "https://todo-app-8777a.firebaseio.com",
  projectId: "todo-app-8777a",
  storageBucket: "todo-app-8777a.appspot.com",
  messagingSenderId: "735340654870",
  appId: "1:735340654870:web:df380b6a975d19b9b72037",
});

const db = firebaseApp.firestore();

export default db;
