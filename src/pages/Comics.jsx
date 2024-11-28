import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
const Comics = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [titleFilter, setTitleFilter] = useState("");
  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [counterPage, setCounterPage] = useState(1);

  try {
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(
          `https://site--marvel-backend--cszclskmpcqr.code.run/comics?skip=${skip}&title=${titleFilter}`
        );
        // console.log(response.data);

        setIsLoading(false);
        setData(response.data);

        console.log(response.data);
      };
      fetchData();
    }, [skip, titleFilter]);
  } catch (error) {
    console.log(error);
  }

  return (
    <>
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
                  {counterPage}/{47397 / 100 + 0.03}
                </p>
                <button
                  className={
                    skip >= data.count - 100
                      ? "offButtonPageSuivante"
                      : "buttonPage"
                  }
                  onClick={() => {
                    setSkip(skip + 100);
                    {
                      skip === 47300 && setSkip(skip + 97);
                    }
                    setCounterPage(counterPage + 1);
                  }}
                >
                  Page suivante
                </button>
              </div>
              <p className="titlePage">Marvel Comics</p>
              {skip === 0 && (
                <input
                  type="text"
                  placeholder="Rechercher un Comic"
                  className="searchBarCharacter"
                  onChange={(event) => {
                    setTitleFilter(event.target.value);
                  }}
                />
              )}
            </div>
            <div className="charAndImg">
              {data.results.map((elem) => {
                return (
                  <>
                    <div className="charAndDesc">
                      <div className="linkComicsOfChar">
                        <img
                          className="imgChar"
                          src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                          alt=""
                        />
                        <p className="nameChar">{elem.title}</p>
                      </div>
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
export default Comics;
