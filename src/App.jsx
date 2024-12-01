import { useState } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
//-------------Pages-----------//
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import ComicsOfChar from "./pages/ComicsOfChar";
import Favoris from "./pages/Favoris";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
//---Images----//
import LogoMarvel2 from "./assets/LogoMarvel2.png";
//------------Font awesome icons ---------//
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faKey,
  faStar,
  faListAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelope, faKey, faTrash, faStar, faListAlt);

function App() {
  const [nameOfChar, setNameOfChar] = useState("");
  const [avatarOfChar, setAvatarOfChar] = useState(``);

  return (
    <Router>
      <header>
        <div className="headerContainer">
          <Link to={"/"}>
            <img src={LogoMarvel2} alt="" />
          </Link>
          <div className="loginSignupLinks">
            <Link className="authLinks" to={"/signup"}>
              Inscription
            </Link>
            <Link className="authLinks" to={"/login"}>
              Se Connecter
            </Link>
          </div>
          <div className="menu">
            <Link className="menuLinks" to={"/"}>
              Personnages
            </Link>
            <Link className="menuLinks" to={"/comics"}>
              Comics
            </Link>
            <Link className="menuLinks" to={"/favoris"}>
              Favoris
            </Link>
          </div>
        </div>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setNameOfChar={setNameOfChar}
              setAvatarOfChar={setAvatarOfChar}
            />
          }
        ></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/comics" element={<Comics />}></Route>
        <Route
          path="/comicsOfChar/:id"
          element={
            <ComicsOfChar nameOfChar={nameOfChar} avatarOfChar={avatarOfChar} />
          }
        ></Route>
        <Route path="/favoris" element={<Favoris />}></Route>
      </Routes>
      <footer>
        <p>
          2024 © Made with{" "}
          <a href="https://fr.react.dev/" target="blank" className="footer">
            React
          </a>{" "}
          at{" "}
          <a
            href="https://www.lereacteur.io/"
            target="blank"
            className="footer"
          >
            Le Reacteur
          </a>{" "}
          by{" "}
          <a href="https://github.com/Zyad75" target="blank" className="footer">
            Zyad
          </a>
        </p>
      </footer>
    </Router>
  );
}

export default App;
