import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
const Home = ({ setNameOfChar, setAvatarOfChar }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [skip, setSkip] = useState(0);
  const [nameFilter, setNameFilter] = useState("");
  try {
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(
          `https://site--marvel-backend--cszclskmpcqr.code.run/characters?skip=${skip}&name=${nameFilter}`
        );
        // console.log(response.data);

        setIsLoading(false);
        setData(response.data);
        console.log(response.data);
      };
      fetchData();
    }, [skip, nameFilter]);
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      {" "}
      {isLoading ? (
        <div> Acquisition des données...</div>
      ) : (
        <div className="home">
          <section className="sectionCharacters">
            <div className="principalTitleCharacters">
              <div className="buttonPageDiv">
                {" "}
                <button
                  className={
                    skip === 0 ? "offButtonPagePrecedente" : "buttonPage"
                  }
                  onClick={() => {
                    setSkip(skip - 100);
                  }}
                >
                  Page précedente
                </button>
                <button
                  className={
                    skip === 1393 ? "offButtonPageSuivante" : "buttonPage"
                  }
                  onClick={() => {
                    setSkip(skip + 100);
                    {
                      skip === 1400 && setSkip(skip + 93);
                    }
                  }}
                >
                  Page suivante
                </button>
              </div>
              <p className="titlePage">Personnages Marvel</p>
              <input
                type="text"
                placeholder="Rechercher un Personnage"
                className="searchBarCharacter"
                onChange={(event) => {
                  setNameFilter(event.target.value);
                }}
              />
            </div>
            <div className="charAndImg">
              {data.results.map((elem) => {
                const character = elem._id;

                return (
                  <>
                    <div className="charAndDesc">
                      <Link
                        className="linkComicsOfChar"
                        to={`/comicsOfChar/${character}`}
                        onClick={() => {
                          setNameOfChar(elem.name);
                          setAvatarOfChar(
                            `${elem.thumbnail.path}.${elem.thumbnail.extension}`
                          );
                        }}
                      >
                        <img
                          className="imgChar"
                          src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                          alt=""
                        />
                        <p className="nameChar">{elem.name}</p>
                      </Link>
                      {elem.description && (
                        <button
                          className="buttonDescCharacters"
                          onClick={() => {
                            setVisible(!visible);
                            setDescription(elem.description);
                          }}
                        >
                          Description
                        </button>
                      )}
                    </div>
                  </>
                );
              })}
            </div>
          </section>
          {visible && (
            <Modal setVisible={setVisible} description={description} />
          )}
        </div>
      )}
    </>
  );
};
export default Home;
