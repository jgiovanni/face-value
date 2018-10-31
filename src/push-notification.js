import firebase from "firebase";
export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "242553748651"
  });
};
