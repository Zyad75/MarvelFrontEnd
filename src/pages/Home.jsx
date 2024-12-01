import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = ({ setNameOfChar, setAvatarOfChar }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [skip, setSkip] = useState(0);
  const [nameFilter, setNameFilter] = useState("");
  const [counterPage, setCounterPage] = useState(1);
  const [favCharacter, setFavCharacter] = useState([]);

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
      //   Cookies.set("favChar", JSON.stringify(favCharacter));
    }, [skip, nameFilter, favCharacter]);
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
                    setCounterPage(counterPage - 1);
                  }}
                >
                  Page précedente
                </button>
                <p>
                  {counterPage}/{1493 / 100 + 0.07}
                </p>
                <button
                  className={
                    skip >= 1393 ? "offButtonPageSuivante" : "buttonPage"
                  }
                  onClick={() => {
                    setSkip(skip + 100);
                    {
                      skip === 1400 && setSkip(skip + 93);
                    }
                    setCounterPage(counterPage + 1);
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
                  setSkip(0);
                  setCounterPage(1);
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
                      <div style={{ display: "flex", gap: "10px" }}>
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
                        {/* <button
                          onClick={() => {
                            setFavCharacter([...favCharacter, elem]);

                            //     : (indeX = favCharacter.indexOf(elem));
                            //   setFavCharacter();

                            // {
                            //   !buttonFavState &&
                            //     setFavCharacter(
                            //       favCharacter.filter((a) => {
                            //         a._id !== elem._id;
                            //       })
                            //     );
                            // }
                          }}
                        >
                          <FontAwesomeIcon icon="star" />
                        </button>
                        <button
                          onClick={() => {
                            // const newTab = [...favCharacter];
                            // const indeX = newTab.indexOf();
                            // newTab.splice(indeX, 1);
                            setFavCharacter(
                              favCharacter.filter((a) => a._id !== elem._id)
                            );
                          }}
                        >
                          <FontAwesomeIcon icon="trash" />
                        </button>
                        <button
                          onClick={() => {
                            console.log(favCharacter);
                          }}
                        ></button> */}
                      </div>
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
