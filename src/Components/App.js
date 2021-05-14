import "../Style/App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import SignIn from "./SignIn";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Home from "./Home";

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user ? <Home /> : <SignIn />}
      {user && <button onClick={() => auth.signOut()}>Sign Out</button>}
    </div>
  );
}

export default App;
