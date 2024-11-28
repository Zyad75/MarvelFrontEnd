import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const ComicsOfChar = ({ nameOfChar, avatarOfChar }) => {
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img className="avatarOfImg" src={avatarOfChar} alt="" />
              <p>
                <span className="nameOfChar">{nameOfChar}</span> retrouvable
                {"(s)" + " "}
                dans ces comics :{" "}
              </p>
            </div>
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
