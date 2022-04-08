import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

export const cage = firebase.initializeApp({
    "projectId": "fb-crud-react-ef599",
    "appId": "1:1014760020852:web:f0c9aa738388b90251ea21",
    "storageBucket": "fb-crud-react-ef599.appspot.com",
    "locationId": "us-central",
    "apiKey": "AIzaSyDdmdRjZ0hqz_4aNStw8bUXMOlxcC8Q07A",
    "authDomain": "fb-crud-react-ef599.firebaseapp.com",
    "messagingSenderId": "1014760020852",
    "measurementId": "G-SCKX1JZ5NT"
  });