import axios from "../../../api/axios";
import verifDiffDate from "../../../api/verifDate";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import getDataUtilisateur from "../../../api/udata";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsReplyFill } from "react-icons/bs";

const URL_DE_BASE = `requerant/`;
const URL_CIN = `individu/`;
let contenuTab = false;
let existanceIndividu = false;
let isValidate = false;

export default function FormulaireNouveauRequerant() {
  //#region // MES VARIABLES
  const u_info = getDataUtilisateur();
  const navigate = useNavigate();
  const dateAujourdHui = new Date();
  const mesInputs = {
    etatMorale: "",
    cin: "",
    numeroTelephone: "",
    complementInformation: "",
  };

  const [inputs, setInputs] = useState(mesInputs);
  const [donnee, setDonnee] = useState({
    hisData: "",
  });
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

    if (name === "cin") {
      rechercheIndividu(value);
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
    
    if (name === "numeroTelephone") {
        if (value.length === 0) {
          isValidate = false;
          setErreurs((values) => ({ ...values, [name]: true }));
          setMessages((values) => ({
            ...values,
            [name]: [name] + " obligatoire",
          }));
        } else if (value.length < 9) {
          isValidate = false;
          setErreurs((values) => ({ ...values, [name]: true }));
          setMessages((values) => ({
            ...values,
            [name]: [name] + " trop court",
          }));
        } else if (value.length > 9) {
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
      
    if (name === "complementInformation") {
        if (value.length === 0) {
          isValidate = false;
          setErreurs((values) => ({ ...values, [name]: true }));
          setMessages((values) => ({
            ...values,
            [name]: [name] + " obligatoire",
          }));
        } else if (value.length < 6) {
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
  };
  //#endregion

  //#region //VALIDATION FORMULAIRE
  const validation = (event) => {
    event.preventDefault();

    const inputsObligatoire = [
      "cin",
      "numeroTelephone",
      "complementInformation",
    ];

    if (!inputs.etatMorale) {
      inputs.etatMorale = "false";
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
      numeroCompte: u_info.u_numeroCompte,
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

    navigate("/requerant/");
  }
  //#endregion

  //#region // ----- MA RECHERCHE -----
  function rechercheIndividu(valeur) {
    if (!valeur) {
      // getIndividu();
      contenuTab = false;
    } else {
      axios.get(URL_CIN + `apercu/${valeur}`, u_info.opts).then((response) => {
        if (response.status === 200) {
          const ux = response.data;
          if (ux.success) {
            const u = ux.res[0];
            const concatDonnee = u.cin + " - " + u.nom;
            const hisData = Object.assign({}, { hisData: concatDonnee });
            setDonnee(hisData);
            setErreurs((values) => ({ ...values, p_cin: false }));
            setMessages((values) => ({
              ...values,
              p_cin: "",
            }));

            contenuTab = true;
            existanceIndividu = true;
          } else {
            const hisData = Object.assign({}, { hisData: ux.message });
            setDonnee(hisData);
            setErreurs((values) => ({ ...values, p_cin: true }));
            setMessages((values) => ({
              ...values,
              p_cin: ux.message,
            }));

            contenuTab = true;
            existanceIndividu = false;
          }
        } else {
          const hisData = Object.assign({}, { hisData: "" });
          setDonnee(hisData);
          contenuTab = false;
          existanceIndividu = false;
        }
      });
    }
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
                <label>Etat Morale : </label>
                <select
                  name="etatMorale"
                  onChange={handleChange}
                  autoComplete="off"
                >
                  <option value={false}>- Individu Normale</option>
                  <option value={true}> - Personne Morale </option>
                </select>
              </div>

              <div className="input-field">
                <label>
                  Numéro de CIN :
                  <small className="text-danger d-block">
                    {erreurs.p_cin ? messages.p_cin : null}
                  </small>
                </label>
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

              {contenuTab && donnee.hisData ? (
                <>
                  <div className="input-field">
                    <label> Pré-visualisation : </label>
                    <input
                      type="text"
                      name="hisData"
                      value={donnee.hisData}
                      autoComplete="off"
                      placeholder="...."
                      disabled={true}
                      style={{
                        backgroundColor: "rgb(226, 226, 226)",
                        color: "#000",
                      }}
                    />
                  </div>
                </>
              ) : null}

              <div className="input-field">
                <label>Numéro de téléphone :</label>
                <input
                  type="number"
                  min="1"
                  name="numeroTelephone"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="+261"
                />
                <small className="text-danger d-block">
                  {erreurs.numeroTelephone ? messages.numeroTelephone : null}
                </small>
              </div>

              <div className="input-field">
                <label>Observation :</label>
                <textarea
                  as="text"
                  name="complementInformation"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Une observation à ajouter ? exemple : ''individu tres menacant et insistant, ....'' "
                />
                <small className="text-danger d-block">
                  {erreurs.complementInformation
                    ? messages.complementInformation
                    : null}
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
