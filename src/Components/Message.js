import React from "react";
import firebase from "firebase/app";
const auth = firebase.auth();
function Message({ message }) {
  const messageClass =
    message.uid === auth.currentUser.uid ? "send" : "received";
  return (
    <div className={`${messageClass} message`}>
      <div className="message-pic-name">
        <img className="message-pic" src={message.photoURL} alt="Profile"></img>
        <span className="message-name">{message.displayName}</span>
      </div>
      <span className="text">{message.text}</span>
    </div>
  );
}

export default Message;
