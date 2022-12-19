import axios from "../../../api/axios";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import getDataUtilisateur from "../../../api/udata";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsReplyFill } from "react-icons/bs";

const URL_DE_BASE = `individu/`;
const URL_DE_BASEA = `arrondissement/`;
const URL_DE_BASEP = `profession/`;
const URL_DE_BASEO = `origine/`;

let isValidate = false;

export default function FormulaireNouveauIndividu() {
  //#region // MES VARIABLES
  const u_info = getDataUtilisateur();
  const navigate = useNavigate();
  const dateAujourdHui = new Date();
  const mesInputs = {
    cin: "",
    nom: "",
    prenom: "",
    cinConjoint: "",
    nomConjoint: "",
    prenomConjoint: "",
    lieuNaiss: "",
    dateNaiss: "",
    domicile: "",
    profession: "",
    etatCin: "",
  };

  const [inputs, setInputs] = useState(mesInputs);

  const [erreurs, setErreurs] = useState([]);
  const [messages, setMessages] = useState(mesInputs);
  //#endregion

  //#region // HANDLE CHANGE FONCTION
  const handleChange = (event) => {
    isValidate = true;
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setInputs((values) => ({ ...values, [name]: value }));
    setErreurs((values) => ({ ...values, messageErreur: false }));
    setErreurs((values) => ({ ...values, [name]: false }));

    if (
      name === "lieuNaiss" ||
      name === "lieuLivrance" ||
      name === "domicile" ||
      name === "profession" ||
      name==="lieuEtatCivil"
    ) {
      if (value.length === 0) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: [name] + " obligatoire",
        }));
      } else if (value.length < 4) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: [name] + " trop court",
        }));
      } else if (value.length > 100) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: [name] + " trop long",
        }));
      } else {
        isValidate = true;
        setErreurs((values) => ({ ...values, [name]: false }));
        setMessages((values) => ({ ...values, [name]: "" }));
      }
    }

    if (
      name === "nom" ||
      name === "prenom" ||
      name === "nomConjoint" ||
      name === "prenomConjoint"
    ) {
      if (value.length === 0) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: [name] + " obligatoire",
        }));
      } else if (value.length < 2) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: [name] + " trop court",
        }));
      } else if (value.length > 12) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: [name] + " trop long",
        }));
      } else {
        isValidate = true;
        setErreurs((values) => ({ ...values, [name]: false }));
        setMessages((values) => ({ ...values, [name]: "" }));
      }
    }

    if (name === "cin" || name === "cinConjoint") {
      if (value.length === 0) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Numéro de CIN obligatoire",
        }));
      } else if (value.length < 12) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Numéro de CIN trop court",
        }));
      } else if (value.length > 12) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: "Numéro de CIN trop long",
        }));
      } else {
        isValidate = true;
        setErreurs((values) => ({ ...values, [name]: false }));
        setMessages((values) => ({ ...values, [name]: "" }));
      }
    }

  };
  //#endregion

  //#region //VALIDATION FORMULAIRE
  const validation = (event) => {
    event.preventDefault();
    const inputsObligatoire = [
      "cin",
      "nom",
      "prenom",
      "nomPere",
      "nomMere",
      "lieunais",
      "datenais",
      "domicile",
      "longueur",
      "etatCin",
      "numSeries",
      "observation",
    ];

    if (!inputs.etatCin) {
      inputs.etatCin = "PRIMA";
    }
    if (!inputs.idOrigine) {
      inputs.idOrigine = "1";
    }
    if (!inputs.idArrondissement) {
      inputs.idArrondissement = "1";
    }
    if (!inputs.idProfession) {
      inputs.idProfession = "1";
    }
    if (!inputs.cicatrice) {
      inputs.cicatrice = "Aucune";
    }

    inputsObligatoire.forEach((element) => {
      if (!inputs[element]) {
        setErreurs((values) => ({ ...values, [element]: true }));
        setMessages((values) => ({
          ...values,
          [element]: "champ " + [element] + "  obligatoire",
        }));
        isValidate = false;
      }
    });

    console.log(" --------- ", isValidate, " --------------");
    if (isValidate) {
      onSubmit();
    } else {
      toast.warn("Verifier les champs!");
    }
  };
  //#endregion

  //#region // FONCTION DU BOUTTON ENREGISTRER
  const onSubmit = () => {
    const dataInputs = Object.assign(inputs, {
      roleU: u_info.u_attribut,
      idUtilisateur: u_info.u_idUtilisateur,
    });

    console.log(dataInputs);
    axios.post(URL_DE_BASE, dataInputs, u_info.opts).then(function (response) {
      if (response.status === 200) {
        if (response.data.success) {
          toast.success("Ajout Reussi.");

          onClose();
        } else {
          toast.error("Echec de l'Ajout!");
        }
      } else {
        toast.error("Echec de l'Ajout!");
      }
    });
  };
  //#endregion

  //#region // QUAND JE FERMER MON MODAL, CETTE FONCTIO EST APPELLER
  function onClose() {
    const inputsArray = Object.keys(inputs);

    inputsArray.forEach((element) => {
      inputs[element] = "";
      isValidate = false;
      setErreurs((values) => ({ ...values, [element]: false }));
    });

    navigate("/individu/");
  }
  //#endregion

  //#region // RENDU HTML ----
  return (
    <>
      <form>
        <div className="form first">
          <div className="details personal">
            <div className="fields">
              <div className="input-field">
                <label>Etat Civil : </label>
                <select
                  name="etatCin"
                  onChange={handleChange}
                  autoComplete="off"
                >
                  <option value="PRIMA">- PRIMA</option>
                  <option value="USURE">- USURE</option>
                  <option value="PERTE">- PERTE</option>
                </select>
              </div>

              <div className="input-field">
                <label>Numéro de CIN :</label>
                <input
                  type="number"
                  min="1"
                  name="cin"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Entrez le numéro de CIN"
                />
                <small className="text-danger d-block">
                  {erreurs.cin ? messages.cin : null}
                </small>
              </div>

              <div className="input-field">
                <label>sexe :</label>
                <select name="sexe" onChange={handleChange} autoComplete="off">
                  <option value={true}>- Masculin</option>
                  <option value={false}>- Feminin</option>
                </select>
              </div>

              <div className="input-field">
                <label>Nom : </label>
                <input
                  type="text"
                  name="nom"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Nom "
                />
                <small className="text-danger d-block">
                  {erreurs.nom ? messages.nom : null}
                </small>
              </div>

              <div className="input-field">
                <label>Prenom : </label>
                <input
                  type="text"
                  name="prenom"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="lieu de naissance"
                />
                <small className="text-danger d-block">
                  {erreurs.prenom ? messages.prenom : null}
                </small>
              </div>

              <div className="input-field">
                <label>Date de naissance :</label>
                <input
                  type="date"
                  name="datenais"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder=""
                />
                <small className="text-danger d-block">
                  {erreurs.datenais ? messages.datenais : null}
                </small>
              </div>

              <div className="input-field">
                <label>Lieu de naissance: </label>
                <input
                  type="text"
                  name="lieunais"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="lieu de naissance"
                />
                <small className="text-danger d-block">
                  {erreurs.lieunais ? messages.lieunais : null}
                </small>
              </div>

              <div className="input-field">
                <label>Longueur : </label>
                <input
                  type="number"
                  name="longueur"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="longueur ..."
                />
                <small className="text-danger d-block">
                  {erreurs.longueur ? messages.longueur : null}
                </small>
              </div>

              <div className="input-field">
                <label>Nom du Père : </label>
                <input
                  type="text"
                  name="nomPere"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder=" Nom du Père "
                />
                <small className="text-danger d-block">
                  {erreurs.nomPere ? messages.nomPere : null}
                </small>
              </div>

              <div className="input-field">
                <label>Nom de la Mère: </label>
                <input
                  type="text"
                  name="nomMere"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Nom de lq Mère"
                />
                <small className="text-danger d-block">
                  {erreurs.nomMere ? messages.nomMere : null}
                </small>
              </div>

              <div className="input-field">
                <label>Domicile : </label>
                <input
                  type="text"
                  name="domicile"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Domicile"
                />
                <small className="text-danger d-block">
                  {erreurs.domicile ? messages.domicile : null}
                </small>
              </div>

              <div className="input-field">
                <label>Profession : </label>
                <input
                  type="number"
                  name="idProfession"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="idProfession"
                />
              </div>

              <div className="input-field">
                <label>Arrondissement : </label>
                <input
                  type="number"
                  name="idArrondissement"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="idArrondissement"
                />
              </div>

              <div className="input-field">
                <label>Origine : </label>
                <input
                  type="number"
                  name="idOrigine"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="idOrigine"
                />
              </div>

              <div className="input-field">
                <label>Observation :</label>
                <textarea
                  as="text"
                  name="observation"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Une observation ? ...."
                />
                <small className="text-danger d-block">
                  {erreurs.observation ? messages.observation : null}
                </small>
              </div>
            </div>

            <div className="buttons">
              <div className="backBtn btn btn-danger" onClick={onClose}>
                <BsReplyFill />
                <span className="btnText"> Annuler</span>
              </div>

              <button className="btn btn-success" onClick={validation}>
                <span className="btnText"> Enregistrer</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
  //#endregion
}
