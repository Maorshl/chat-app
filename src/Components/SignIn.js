import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
firebase.initializeApp({
  apiKey: "AIzaSyBeqwhOX4Q720nbLj7S8k7QBfVhWSZrqgU",
  authDomain: "chat-app-8fa84.firebaseapp.com",
  projectId: "chat-app-8fa84",
  storageBucket: "chat-app-8fa84.appspot.com",
  messagingSenderId: "328311184449",
  appId: "1:328311184449:web:799494e6b51f727c75bac0",
  measurementId: "G-S577RQ97PE",
});
const auth = firebase.auth();

function SignIn(props) {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign In with google!</button>
    </div>
  );
}

export default SignIn;
