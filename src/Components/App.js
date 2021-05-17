import "../Style/App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import SignIn from "./SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <nav>
        <ul className="navbarlist">
          <li className="navbarli">
            {user && <button onClick={() => auth.signOut()}>Sign Out</button>}
          </li>
          <li className="navbarli">
            <a href="/" className="navbar-button">
              Home
            </a>
          </li>
          <li className="navbarli">
            {user && (
              <a className="navbar-button" href="/newroom">
                Create a new chat room
              </a>
            )}
          </li>
        </ul>
      </nav>
      <main>{user ? <Home /> : <SignIn />}</main>
    </div>
  );
}

export default App;
