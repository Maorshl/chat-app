import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";

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
  const signInWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <div>
      <button>
        <FcGoogle onClick={signInWithGoogle} />
      </button>

      <button onClick={signInWithFacebook}>
        <FaFacebookSquare />
      </button>
    </div>
  );
}

export default SignIn;
