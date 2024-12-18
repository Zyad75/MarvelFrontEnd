import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // sinon reset de mes states et de ma page
    // console.log("submited");
    setErrorMessage(null);
    try {
      const response = await axios.post(
        "https://site--marvel-backend--cszclskmpcqr.code.run/user/signup",
        {
          username: username,
          password: password,
          email: email,
        }
      );

      console.log(response.data);
    } catch (error) {
      alert(error.message);
      if (error.response.status === 409) {
        setErrorMessage("adresse déja utilisée");
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez renseigner toutes vos informations");
      } else {
        setErrorMessage("Erreur, veuillez réessayer svp !");
      }
    }
  };
  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };
  const handleInputChange = (event, inputType) => {
    if (inputType === "password") {
      setPassword(event.target.value);
    }
  };
  return (
    <>
      <section className="SignUp">
        <div>Inscris-toi !</div>
        <form className="formSignUp" onSubmit={handleSubmit}>
          <input
            className="formInputs"
            type="username"
            placeholder="Pseudo"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            className="formInputs"
            type="email"
            placeholder="mail@mail.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            className="formInputs"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => {
              handleInputChange(event, "password");
            }}
          />
          <input className="submitInput" type="submit" value={"M'inscrire"} />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
        <Link style={{ textDecoration: "none", color: "white" }} to={"/login"}>
          {" "}
          Déjà inscris ? Connecte-toi!
        </Link>
      </section>
    </>
  );
};
export default Signup;
