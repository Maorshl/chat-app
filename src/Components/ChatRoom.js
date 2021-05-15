import React, { useState, useRef, useEffect } from "react";
import "firebase/firestore";
import firebase from "firebase/app";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Message from "./Message";
const firestore = firebase.firestore();
const auth = firebase.auth();

function ChatRoom({ match }) {
  const messagesRef = firestore.collection("messages");
  // let query = messagesRef.where("roomId", "==", match.params.roomId);
  let query = messagesRef
    .where("roomId", "==", match.params.roomId)
    .orderBy("createdAt");

  const [messages] = useCollectionData(query);
  const [formValue, setFormValue] = useState("");
  const dummy = useRef();

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL, displayName } = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      roomId: match.params.roomId,
      displayName,
    });
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <div>
      <div className="chat-box">
        {messages &&
          messages.map((message, i) => {
            return <Message message={message} key={i} />;
          })}
        <div ref={dummy}></div>
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => {
            setFormValue(e.target.value);
          }}
          type="text"
          placeholder="Type something..."
        ></input>
        <button type="submit">🕊️</button>
      </form>
      <Link to="/">Home</Link>
    </div>
  );
}

export default ChatRoom;
