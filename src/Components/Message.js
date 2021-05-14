import React from "react";
import firebase from "firebase/app";
const auth = firebase.auth();
function Message({ message }) {
  const messageClass =
    message.uid === auth.currentUser.uid ? "send" : "received";
  return (
    <div className={`${messageClass} message`}>
      <img className="message-pic" src={message.photoURL} alt="Profile"></img>
      <p>{message.text}</p>
    </div>
  );
}

export default Message;
