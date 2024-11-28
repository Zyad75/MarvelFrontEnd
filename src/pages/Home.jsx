import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState("");
  try {
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get("http://localhost:3000/characters");
        // console.log(response.data);

        setIsLoading(false);
        setData(response.data);
        console.log(response.data);
      };
      fetchData();
    }, []);
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
            <p className="principalTitleCharacters">Personnages Marvel</p>
            <div className="charAndImg">
              {data.results.map((elem) => {
                const character = elem._id;
                return (
                  <>
                    <div className="charAndDesc">
                      <Link
                        className="linkComicsOfChar"
                        to={`/comicsOfChar/${character}`}
                      >
                        <img
                          className="imgChar"
                          src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                          alt=""
                        />
                        <p>{elem.name}</p>
                      </Link>
                      {elem.description && (
                        <button
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
