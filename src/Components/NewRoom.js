import React, { useState } from "react";
import "firebase/firestore";
import firebase from "firebase/app";
import { Redirect } from "react-router";
const firestore = firebase.firestore();
const auth = firebase.auth();

function NewRoom(props) {
  const roomsRef = firestore.collection("rooms");
  const [formValue, setFormValue] = useState("");
  const [created, setCreated] = useState(false);
  const createRoom = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;
    await roomsRef.add({
      name: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: uid,
    });
    setFormValue("");
    setCreated(true);
  };
  if (created) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <h1>Create a new room</h1>
      <form onSubmit={createRoom} className="new-room-form">
        <label>Name</label>
        <input
          value={formValue}
          onChange={(e) => {
            setFormValue(e.target.value);
          }}
          type="text"
          placeholder="Name"
        ></input>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default NewRoom;
