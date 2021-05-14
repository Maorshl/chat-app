import React from "react";
import firebase from "firebase/app";
const auth = firebase.auth();
function Message({ message }) {
  const messageClass =
    message.uid === auth.currentUser.uid ? "send" : "received";
  return (
    <div className="message">
      <img className="message-pic" src={message.photoURL}></img>
      <p className={messageClass}>{message.text}</p>
    </div>
  );
}

export default Message;
