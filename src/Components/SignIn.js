import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import SignUp from "./SignUp";
import { BrowserRouter as Router, Link } from "react-router-dom";

firebase.initializeApp({
  apiKey: "AIzaSyBeqwhOX4Q720nbLj7S8k7QBfVhWSZrqgU",
  authDomain: "chat-app-8fa84.firebaseapp.com",
  projectId: "chat-app-8fa84",
  storageBucket: "chat-app-8fa84.appspot.com",
  messagingSenderId: "328311184449",
  appId: "1:328311184449:web:799494e6b51f727c75bac0",
  measurementId: "G-S577RQ97PE",
});

function SignIn({ auth }) {
  const signInAnonymously = () => {
    auth
      .signInAnonymously()
      .then(() => {
        // Signed in..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  };
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <div className="sign-in-page">
      <h1>Sign in with Google or continue anonymously</h1>
      <button onClick={signInWithGoogle}>
        <FcGoogle />
      </button>
      <button
        onClick={() => {
          signInAnonymously();
        }}
      >
        Sign In Anonymously
      </button>
    </div>
  );
}

export default SignIn;
