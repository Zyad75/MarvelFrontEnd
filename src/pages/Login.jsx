import { Link } from "react-router-dom";
const Login = () => {
  return (
    <>
      <section className="SignUp">
        <div>Connexion</div>
        <form className="formSignUp">
          <input
            className="formInputs"
            type="email"
            placeholder="mail@mail.com"
          />
          <input
            className="formInputs"
            type="password"
            placeholder="Mot de passe"
          />
          <input className="submitInput" type="submit" value={"Me Connecter"} />
        </form>
        <Link style={{ textDecoration: "none", color: "white" }} to={"/signup"}>
          {" "}
          Pas encore de compte ? Inscris-toi !
        </Link>
      </section>
    </>
  );
};
export default Login;
