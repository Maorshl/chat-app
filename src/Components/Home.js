import React from "react";
import ChatRoom from "./ChatRoom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "firebase/firestore";
import firebase from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import NewRoom from "./NewRoom";
const firestore = firebase.firestore();

function Home({ user }) {
  const roomsRef = firestore.collection("rooms");
  const query = roomsRef.orderBy("name");
  const [rooms] = useCollectionData(query, { idField: "id" });
  return (
    <div className="main-menu">
      <Router>
        <Route exact path="/">
          <div className="rooms">
            {rooms &&
              rooms.map((room, i) => {
                return (
                  <Link
                    key={i}
                    to={`/chatroom/${room.id}`}
                    className={
                      room.createdBy === user.uid
                        ? "created-by-user"
                        : "room-link"
                    }
                  >
                    {room.name}
                  </Link>
                );
              })}
          </div>
        </Route>
        <Switch>
          <Route exact path="/chatroom/:roomId" component={ChatRoom}></Route>
          <Route exact path="/newroom">
            <NewRoom />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Home;
