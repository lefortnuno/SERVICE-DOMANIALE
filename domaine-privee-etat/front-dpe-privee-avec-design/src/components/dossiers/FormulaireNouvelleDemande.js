import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BsReplyFill } from "react-icons/bs";

const URL_DE_BASE = `utilisateur/`;
const URL_CIN = `individu/`;
let isValidate = false;
let existanceIndividu = false;
let contenuTab = false;

export default function FormulaireNouvelleDemande() {
  //#region // MES VARIABLES
  const u_info = getDataUtilisateur();
  const navigate = useNavigate();
  const [picPhotoPDP, setPicPhotoPDP] = useState({
    file: [],
    filepreview: null,
  });
  const [latNumeroCompte, setLatNumeroCompte] = useState({
    numeroCompte: "",
  });
  const [inputs, setInputs] = useState({
    identification: "",
    photoPDP: "",
    mdp: "",
    confirmationMdp: "",
    unite: "",
    u_cin: "",
  });
  const [donnee, setDonnee] = useState({
    hisData: "",
  });
  const [erreurs, setErreurs] = useState([]);
  const [messages, setMessages] = useState({
    messageErreur: "",
    identification: "",
    photoPDP: "",
    mdp: "",
    confirmationMdp: "",
    unite: "",
    u_cin: "",
    p_cin: "",
  });
  //#endregion

  //#region // HANDLE CHANGE IMAGE FUNC
  const handlePicturePhotoPDP = (event) => {
    setPicPhotoPDP({
      ...picPhotoPDP,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };
  //#endregion

  //#region // HANDLE CHANGE FONCTION
  const handleChange = (event) => {
    isValidate = true;
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setInputs((values) => ({ ...values, [name]: value }));
    setErreurs((values) => ({ ...values, messageErreur: false }));

    if (
      name === "identification" ||
      name === "mdp" ||
      name === "confirmationMdp"
    ) {
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
      } else if (value.length > 8) {
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
    }

    if (name === "unite") {
      setErreurs((values) => ({ ...values, [name]: false }));
    }

    if (name === "u_cin") {
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

    if (name === "confirmationMdp") {
      if (value !== inputs.mdp) {
        isValidate = false;
        setErreurs((values) => ({ ...values, [name]: true }));
        setMessages((values) => ({
          ...values,
          [name]: " Les mot de pass ne correspondent pas",
        }));
      } else {
        isValidate = true;
        setErreurs((values) => ({ ...values, [name]: false }));
        setMessages((values) => ({ ...values, [name]: "" }));
      }
    }
    if (name === "mdp") {
      setErreurs((values) => ({ ...values, confirmationMdp: false }));
      setMessages((values) => ({ ...values, confirmationMdp: "" }));
    }
  };
  //#endregion

  //#region //VALIDATION FORMULAIRE
  const validation = (event) => {
    event.preventDefault();

    if (!inputs.unite) {
      setErreurs((values) => ({ ...values, unite: true }));
      setMessages((values) => ({
        ...values,
        unite: "Selectionner votre domaine",
      }));
      isValidate = false;
    }

    const inputsArray = Object.keys(inputs);
    inputsArray.forEach((element) => {
      if (element !== "unite" && element !== "photoPDP") {
        const value = Object.values(inputs[element]);
        if (value.length === 0) {
          setErreurs((values) => ({ ...values, [element]: true }));
          setMessages((values) => ({
            ...values,
            [element]: " champ obligatoire",
          }));
          isValidate = false;
        }
      }
    });

    if (isValidate && existanceIndividu) {
      onSubmit();
    }
  };
  //#endregion

  //#region // FONCTION DU BOUTTON ENREGISTRER
  const onSubmit = () => {
    const dataInputs = Object.assign(inputs, { roleU: u_info.u_attribut });

    axios.post(URL_DE_BASE, dataInputs, u_info.opts).then(function (response) {
      console.log(response);
      if (response.status === 200) {
        if (response.data.success) {
          toast.success("Ajout Reussi.");

          if (picPhotoPDP.file.length !== 0) {
            ajoutPhotoPDP();
          }
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

  //#region // IMAGE PHOTO DE FICHE MERE --FACE-- DE L'INDIVIDU
  const ajoutPhotoPDP = async () => {
    const formdata = new FormData();
    formdata.append("photoPDP", picPhotoPDP.file);
    const numeroCompteAnticiper = latNumeroCompte.numeroCompte;
    axios
      .put(
        URL_DE_BASE + `photoPDP/` + `${numeroCompteAnticiper}`,
        formdata,
        u_info.opts,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        if (res.data.success) {
          toast.success("Compte creer avec success.");
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

    navigate("/dossier/");
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

  return (
    <>
      <form>
        <div className="form first">
          <div className="details personal">
            <div className="fields">
              {/* MANOMBOKA ETO NO ANORATAN'CHERIE AN'LAY CODE POUR AJOUT DE NOUVEAU DOSSIERS VENANT DU HTML INY  */}
              <div className="input-field">
                <label>
                  Numéro de CIN :
                  <small className="text-danger d-block">
                    {erreurs.p_cin ? messages.p_cin : null}
                  </small>{" "}
                </label>
                <input
                  type="number"
                  min="1"
                  name="u_cin"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Entrez votre numéro de CIN"
                />
                <small className="text-danger d-block">
                  {erreurs.u_cin ? messages.u_cin : null}
                </small>
              </div>
              <div className="input-field">
                <label>
                  Numéro de CIN :
                  <small className="text-danger d-block">
                    {erreurs.p_cin ? messages.p_cin : null}
                  </small>{" "}
                </label>
                <input
                  type="number"
                  min="1"
                  name="u_cin"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Entrez votre numéro de CIN"
                />
                <small className="text-danger d-block">
                  {erreurs.u_cin ? messages.u_cin : null}
                </small>
              </div>
              <div className="input-field">
                <label>Occupation : </label>
                <select name="unite" onChange={handleChange} autoComplete="off">
                  <option> </option>
                  <option value={true}>Circonscription</option>
                  <option value={false}>Foncier</option>
                </select>
                <small className="text-danger d-block">
                  {erreurs.unite ? messages.unite : null}
                </small>
              </div>

              {/* FARANY  ETO  CHERIE AN'LAY CODE POUR AJOUT DE NOUVEAU DOSSIERS VENANT DU HTML INY  */}

              

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
            </div>

            <div className="buttons">
              {/* <div className="backBtn btn btn-danger" onClick={onClose}> */}
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
}
