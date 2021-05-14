import React from "react";
import ChatRoom from "./ChatRoom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "firebase/firestore";
import firebase from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
const firestore = firebase.firestore();

function Home(props) {
  const roomsRef = firestore.collection("rooms");
  const query = roomsRef.orderBy("name");
  const [rooms] = useCollectionData(query, { idField: "id" });
  return (
    <div>
      <Router>
        <Route exact path="/">
          {rooms &&
            rooms.map((room) => {
              return <Link to={`/chatroom/${room.id}`}>{room.name}</Link>;
            })}
        </Route>
        <Switch>
          <Route path="/chatroom/:roomId" component={ChatRoom}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Home;
