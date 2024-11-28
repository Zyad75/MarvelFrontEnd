import { useState } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
//-------------Pages-----------//
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import ComicsOfChar from "./pages/ComicsOfChar";
import Favoris from "./pages/Favoris";
//---Images----//
import LogoMarvel2 from "./assets/LogoMarvel2.png";

function App() {
  const [nameOfChar, setNameOfChar] = useState("");
  const [avatarOfChar, setAvatarOfChar] = useState(``);
  const [favoris, setFavoris] = useState(false);

  return (
    <Router>
      <header>
        <div className="headerContainer">
          <Link to={"/"}>
            <img src={LogoMarvel2} alt="" />
          </Link>
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
              setFavoris={setFavoris}
            />
          }
        ></Route>
        <Route
          path="/comics"
          element={<Comics setFavoris={setFavoris} />}
        ></Route>
        <Route
          path="/comicsOfChar/:id"
          element={
            <ComicsOfChar nameOfChar={nameOfChar} avatarOfChar={avatarOfChar} />
          }
        ></Route>
        <Route path="/favoris" element={<Favoris favoris={favoris} />}></Route>
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
