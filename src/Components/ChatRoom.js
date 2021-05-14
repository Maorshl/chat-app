import React, { useState } from "react";
import "firebase/firestore";
import firebase from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Message from "./Message";
const firestore = firebase.firestore();
const auth = firebase.auth();

function ChatRoom({ match }) {
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.where("roomId", "==", match.params.roomId);

  const [messages] = useCollectionData(query);
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      roomId: match.params.roomId,
    });
    setFormValue("");
  };

  return (
    <div>
      {messages &&
        messages.map((message) => {
          return <Message message={message} />;
        })}
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => {
            setFormValue(e.target.value);
          }}
          type="text"
        ></input>
        <button type="submit">🕊️</button>
      </form>
    </div>
  );
}

export default ChatRoom;
