import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const ComicsOfChar = ({ nameOfChar }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  try {
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(`http://localhost:3000/comics/${id}`);

        setIsLoading(false);
        setData(response.data);
        console.log(response.data);
      };
      fetchData();
    }, [id]);
  } catch (error) {
    console.log(error);
  }
  return (
    <>
      {isLoading ? (
        <p>Acquisition des données...</p>
      ) : (
        <>
          <section className="sectionCommicsOfChar">
            {/* demain 28/11 je dois commencer par afficher le nom du personnage selon l'id et une mini image du perso */}
            <p>{nameOfChar} est retrouvable dans ces comics : </p>
            {data === null && <p>aucun Comics ne présente ce personnage</p>}
            <div className="divCommicsOfChar">
              {data.map((elem, index) => {
                return (
                  <>
                    <div className="divImgAndTitleOfComicsOfChar" key={index}>
                      <img
                        className="imgChar"
                        src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                        alt=""
                      />
                      <p className="titleOfComicsOfChar">{elem.title}</p>
                    </div>
                  </>
                );
              })}
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default ComicsOfChar;
