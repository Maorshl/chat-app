import React, { useState, useRef, useEffect } from "react";
import "firebase/firestore";
import firebase from "firebase/app";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Message from "./Message";
import PrivateRoom from "./PrivateRoom";
const firestore = firebase.firestore();
const auth = firebase.auth();

function ChatRoom({ match }) {
  const roomsRef = firestore.collection("rooms");
  const [rooms] = useCollectionData(roomsRef, { idField: "id" });
  const [isPrivate, setIsPrivate] = useState(true);
  const [currentRoom, setCurrentRoom] = useState({});

  const messagesRef = firestore.collection("messages");
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
    if (rooms) {
      const temp = rooms.find((room) => room.id === match.params.roomId);
      setIsPrivate(temp.private);
      setCurrentRoom(temp);
    }
    return () => {
      setIsPrivate(true);
    };
  }, [rooms]);

  useEffect(() => {
    if (!isPrivate) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  });
  if (isPrivate) {
    return (
      <PrivateRoom
        currentRoom={currentRoom}
        setIsPrivate={setIsPrivate}
      ></PrivateRoom>
    );
  }
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
    </div>
  );
}

export default ChatRoom;
