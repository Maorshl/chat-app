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
const auth = firebase.auth();

function SignIn(props) {
  const [openInput, setOpenInput] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const input = () => {
    if (openInput) setOpenInput(false);
    else {
      setOpenInput(true);
    }
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  const signInWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider);
  };
  const signInWithEmail = async (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password);
  };
  return (
    <div>
      <h1>Sign in using your preferred platform:</h1>
      <button>
        <FcGoogle onClick={signInWithGoogle} />
      </button>

      <button onClick={signInWithFacebook}>
        <FaFacebookSquare />
      </button>
      <form onSubmit={signInWithEmail}>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          placeholder="Email"
        ></input>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        ></input>
        <button type="submit">Sign In!</button>
      </form>
      <h1>Sign up using your email:</h1>
      <Router>
        <button className="open-sign-up-button" onClick={input}>
          {openInput ? "Close" : "Sign Up!"}
        </button>
      </Router>
      {openInput && <SignUp setOpenInput={setOpenInput}></SignUp>}
    </div>
  );
}

export default SignIn;
