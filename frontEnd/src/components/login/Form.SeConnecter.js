import axios from "../../api/axios";

import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const URL_DE_BASE = `utilisateur/seConnecter`;
let isValidate = false;

export default function FormulaireSeConnecter() {
  ////#region  // --- MES VARIABLES ----
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    identification: "",
    mdp: "",
  });
  const [erreurs, setErreurs] = useState([]);
  const [messages, setMessages] = useState({
    identification: "Identification obligatoire",
    messageErreur: "",
    mdp: "Mot de passe obligatoire",
  });
  ////#endregion

  //#region // --- HANDLE CHANGE FONCTION ---
  const handleChange = (event) => {
    isValidate = true;
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setInputs((values) => ({ ...values, [name]: value }));
    setErreurs((values) => ({ ...values, messageErreur: false }));

    if (value.length === 0) {
      isValidate = false;
      setErreurs((values) => ({ ...values, [name]: true }));
      setMessages((values) => ({
        ...values,
        [name]: name + " obligatoire",
      }));
    } else if (value.length < 4) {
      isValidate = false;
      setErreurs((values) => ({ ...values, [name]: true }));
      setMessages((values) => ({
        ...values,
        [name]: name + " trop court",
      }));
    } else if (value.length > 9) {
      isValidate = false;
      setErreurs((values) => ({ ...values, [name]: true }));
      setMessages((values) => ({
        ...values,
        [name]: name + " trop long",
      }));
    } else {
      isValidate = true;
      setErreurs((values) => ({ ...values, [name]: false }));
      setMessages((values) => ({ ...values, [name]: "" }));
    }
  };
  //#endregion

  //#region // --- VALIDATION FORMULAIRE ---
  const validation = (event) => {
    event.preventDefault();

    const inputsArray = Object.keys(inputs);
    inputsArray.forEach((element) => {
      const value = Object.values(inputs[element]);
      if (value.length === 0) {
        setErreurs((values) => ({ ...values, [element]: true }));
        isValidate = false;
      }
    });

    if (isValidate) {
      onSubmit();
    }
  };
  //#endregion

  //#region // --- ENVOYER DONNER FORMULAIRE AU BACK-END ---
  const onSubmit = (event) => {
    axios
      .post(URL_DE_BASE, inputs)
      .then(function (response) {
        if (response.data.success && response.status === 200) {
          navigate("/accueil/");
          toast.success(`Connection Reussi`);

          const utilisateur = response.data.user[0];
          localStorage.setItem("token", response.data.token);

          for (const u in utilisateur) {
            localStorage.setItem(u, utilisateur[u]);
          }

        } else {
          setErreurs((values) => ({ ...values, messageErreur: true }));
          setMessages((values) => ({
            ...values,
            messageErreur: "Identifiant ou mot de passe incorrect !",
          }));
        }
      })
      .catch((error) => {
        setErreurs((values) => ({ ...values, messageErreur: true }));
        setMessages((values) => ({
          ...values,
          messageErreur:
            "Veuillez vous connecter au serveur! Il y a eu une erreur de connection : " +
            error,
        }));
      });
  };
  //#endregion

  return (
    <>
      <form className="login100-form validate-form">
        <span className="login100-form-title">
          S'authentifier
          {erreurs.messageErreur ? (
            <p className="text-danger d-block">{messages.messageErreur}</p>
          ) : null}
        </span>

        <div
          className="wrap-input100 validate-input"
          data-validate="Valid email is required: ex@abc.xyz"
        >
          <input
            className="input100"
            type="text"
            name="identification"
            placeholder="Identifiant ...."
            onChange={handleChange}
            autoComplete="off"
          />
          <span className="focus-input100"></span>
          <span className="symbol-input100">
            <i className="fa fa-envelope" aria-hidden="true"></i>
          </span>
          <small className="text-danger d-block">
            {erreurs.identification ? messages.identification : null}
          </small>
        </div>

        <div
          className="wrap-input100 validate-input"
          data-validate="Password is required"
        >
          <input
            className="input100"
            type="password"
            name="mdp"
            placeholder="Mot de passe ...."
            onChange={handleChange}
            autoComplete="off"
          />
          <span className="focus-input100"></span>
          <span className="symbol-input100">
            <i className="fa fa-lock" aria-hidden="true"></i>
          </span>
          <small className="text-danger d-block">
            {erreurs.mdp ? messages.mdp : null}
          </small>
        </div>

        <div className="container-login100-form-btn">
          <button className="login100-form-btn" onClick={validation}>
            Se connecter
          </button>
        </div> <br />

        <div className="text-center p-t-12">
          <Link to="/accueil/" className="txt2" >
            Identifiant / Mot de passe
          </Link>
          <span className="txt1"> oublier ?</span>
        </div>
      </form>
    </>
  );
}
