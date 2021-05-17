import React, { useState } from "react";

function PrivateRoom({ setIsPrivate, currentRoom }) {
  const [password, setPassword] = useState("");
  const [wrong, setWrong] = useState(false);
  const getIn = (e) => {
    e.preventDefault();
    if (password === currentRoom.password) {
      setIsPrivate(false);
    } else {
      setWrong(true);
    }
  };
  return (
    <div>
      <h1>This room is private</h1>
      <h3>Please enter password:</h3>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      ></input>
      {wrong && <p>Wrong password please try again</p>}
      <button onClick={getIn}>Get in!</button>
    </div>
  );
}

export default PrivateRoom;
