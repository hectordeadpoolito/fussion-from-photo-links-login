import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// export const db = firebase.initializeApp ( {
//   apiKey: "AIzaSyDdmdRjZ0hqz_4aNStw8bUXMOlxcC8Q07A",
//   authDomain: "fb-crud-react-ef599.firebaseapp.com",
//   databaseURL: "https://fb-crud-react-ef599-default-rtdb.firebaseio.com",
//   projectId: "fb-crud-react-ef599",
//   storageBucket: "fb-crud-react-ef599.appspot.com",
//   messagingSenderId: "1014760020852",
//   appId: "1:1014760020852:web:bc506f878b6adb1851ea21",
//   measurementId: "G-DL4S6B78Y2"
// });
  
export const db = firebase.initializeApp({
  projectId: "fb-crud-98fad",
  appId: "1:696701042396:web:df39e59273faa048e57e19",
  storageBucket: "fb-crud-98fad.appspot.com",
  locationId: "us-central",
  apiKey: "AIzaSyDOaKlnts164TgeGmXDogkDyaVW9q1otFA",
  authDomain: "fb-crud-98fad.firebaseapp.com",
  messagingSenderId: "696701042396",
});