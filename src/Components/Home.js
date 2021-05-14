import React from "react";
import ChatRoom from "./ChatRoom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "firebase/firestore";
import firebase from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import NewRoom from "./NewRoom";
const firestore = firebase.firestore();

function Home(props) {
  const roomsRef = firestore.collection("rooms");
  const query = roomsRef.orderBy("name");
  const [rooms] = useCollectionData(query, { idField: "id" });
  return (
    <div>
      <Router>
        <Route exact path="/">
          <div className="rooms">
            {rooms &&
              rooms.map((room) => {
                return <Link to={`/chatroom/${room.id}`}>{room.name}</Link>;
              })}
          </div>
        </Route>
        <Switch>
          <Route exact path="/chatroom/:roomId" component={ChatRoom}></Route>
          <Route exact path="/newroom">
            <NewRoom />
          </Route>
        </Switch>
        <div>
          <Link to="/newroom">New Room</Link>
        </div>
      </Router>
    </div>
  );
}

export default Home;
