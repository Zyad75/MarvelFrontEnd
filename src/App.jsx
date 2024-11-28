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
import LogoMarvel from "./assets/LogoMarvel.png";

function App() {
  const [nameOfChar, setNameOfChar] = useState("");
  const [avatarOfChar, setAvatarOfChar] = useState(``);

  return (
    <Router>
      <header>
        <div className="headerContainer">
          <Link to={"/"}>
            <img src={LogoMarvel} alt="" />
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
            />
          }
        ></Route>
        <Route path="/comics" element={<Comics />}></Route>
        <Route
          path="/comicsOfChar/:id"
          element={
            <ComicsOfChar nameOfChar={nameOfChar} avatarOfChar={avatarOfChar} />
          }
        ></Route>
        <Route path="/favoris" element={<Favoris />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
