import React, { useState } from "react";
import "firebase/firestore";
import firebase from "firebase/app";
import { Redirect } from "react-router";
const firestore = firebase.firestore();
const auth = firebase.auth();

function NewRoom(props) {
  const roomsRef = firestore.collection("rooms");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [created, setCreated] = useState(false);
  const [wantPrivate, setWantPrivate] = useState(false);

  const createRoom = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;
    await roomsRef.add({
      name: name,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: uid,
      private: wantPrivate,
      password,
    });
    setName("");
    setCreated(true);
  };
  if (created) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <h1>Create a new room</h1>
      <form onSubmit={(e) => e.preventDefault()} className="new-room-form">
        <input
          className="new-room-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="Name"
        ></input>
        <button onClick={() => setWantPrivate(true)}>
          I want the room to be private
        </button>
        {wantPrivate && (
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="password"
          ></input>
        )}
        <button onClick={createRoom} type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default NewRoom;
