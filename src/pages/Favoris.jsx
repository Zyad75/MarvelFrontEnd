import { useState, useEffect } from "react";

const Favoris = () => {
  const [favChar, setFavChar] = useState([]);

  useEffect(() => {
    const favChar = JSON.parse(localStorage.getItem("favCharacters"));
    if (favChar) {
      setFavChar(favChar);
    }
  }, []);
  return <>{console.log(favChar)}</>;
};
export default Favoris;
