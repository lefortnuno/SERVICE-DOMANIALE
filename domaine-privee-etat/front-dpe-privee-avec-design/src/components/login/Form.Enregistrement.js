import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BsReplyFill, BsSave } from "react-icons/bs";

const URL_DE_BASE = `utilisateur/`;
const URL_CIN = `individu/`;
let isValidate = false;
let contenuTab = false;

export default function FormulaireEnregistrement() {
  //#region // MES VARIABLES
  const u_info = getDataUtilisateur();
  const navigate = useNavigate();
  const [picPhotoPDP, setPicPhotoPDP] = useState({
    file: [],
    filepreview: null,
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
    nom: "",
    prenom: "",
    u_cin: "",
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
          isValidate = false;
        }
      }
    });

    if (inputs.photoPDP) {
      ajoutPhotoPDP();
    }

    if (isValidate) {
      onSubmit();
    }
  };
  //#endregion

  //#region // FONCTION DU BOUTTON ENREGISTRER
  const onSubmit = () => {
    const dataInputs = Object.assign(inputs, { roleU: u_info.u_attribut });

    console.log("dataInputs : ", dataInputs);

    axios.post(URL_DE_BASE, dataInputs, u_info.opts).then(function (response) {
      if (response.status === 200) {
        toast.success("Ajout Reussi.");
        // onClose();
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
    const numeroCompteAnticiper = inputs.numeroCompte;

    console.log("formdata : ", formdata);

    axios
      .put(
        URL_DE_BASE + `photoPDP/` + `${numeroCompteAnticiper}`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
        u_info.opts
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

    navigate("/utilisateur/");
  }
  //#endregion

  //#region // DONNEE Individu
  useEffect(() => {
    getIndividu();
  }, []);

  function getIndividu() {
    axios.get(URL_CIN, u_info.opts).then(function (response) {
      setDonnee(response.data);
      console.log("responseINDIVIDU :", response);
    });
  }
  //#endregion

  //#region // ----- MA RECHERCHE -----
  function rechercheIndividu(valeur) {
    if (!valeur) {
      getIndividu();
      contenuTab = false;
    } else {
      axios
        .get(URL_CIN + `recherche/${valeur}`, u_info.opts)
        .then((response) => {
          console.log("response : ", response);
          if (response.data.success) {
            setDonnee(response.data);
            contenuTab = true;
          } else {
            setDonnee(response.data);
            contenuTab = false;
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
              <div className="input-field monPhotoPDP">
                {!picPhotoPDP.filepreview ? (
                  <img
                    src={process.env.PUBLIC_URL + `/logins/images/img-01.png`}
                    alt="image"
                  />
                ) : (
                  <img
                    src={picPhotoPDP.filepreview}
                    alt="image"
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </div>
              <div className="input-field">
                <label>Photo de profile</label>
                <input
                  type="file"
                  name="photoPDP"
                  onChange={handlePicturePhotoPDP}
                  autoComplete="off"
                  placeholder="Photo"
                />
              </div>

              <div className="input-field">
                <label>Identifiant :</label>
                <input
                  type="text"
                  name="identification"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Entrez votre identifiant"
                />
                <small className="text-danger d-block">
                  {erreurs.identification ? messages.identification : null}
                </small>
              </div>

              <div className="input-field">
                <label>Numéro de CIN : </label>
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
                {contenuTab ? (
                  <>
                    <select
                      name="cin"
                      onChange={handleChange}
                      autoComplete="off"
                    >
                      {/* {donnee.map((d, key) => (
                        <option key={key} value={d.cin}>
                          {d.cin}
                        </option>
                      ))} */}
                    </select>
                  </>
                ) : null}
              </div>

              <div className="input-field">
                <label>Occupation : </label>
                <select name="unite" onChange={handleChange} autoComplete="off">
                  <option> </option>
                  <option>Circonscription</option>
                  <option>Foncier</option>
                </select>
                <small className="text-danger d-block">
                  {erreurs.unite ? messages.unite : null}
                </small>
              </div>

              <div className="input-field">
                <label>Mot de pass : </label>
                <input
                  type="password"
                  name="mdp"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Entrez votre mot de pass"
                />
                <small className="text-danger d-block">
                  {erreurs.mdp ? messages.mdp : null}
                </small>
              </div>

              <div className="input-field">
                <label>Confirmez mot de pass : </label>
                <input
                  type="password"
                  name="confirmationMdp"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Confirmez votre mot de pass"
                />
                <small className="text-danger d-block">
                  {erreurs.confirmationMdp ? messages.confirmationMdp : null}
                </small>
              </div>

              {contenuTab ? (
                <>
                  <div className="input-field">
                    <label>Nom : </label>
                    <input
                      type="text"
                      name="nom"
                      onChange={handleChange}
                      value={donnee.nom}
                      autoComplete="off"
                      placeholder="Nom de l'individu"
                      disabled={true}
                    />
                  </div>

                  <div className="input-field">
                    <label>Prénom : </label>
                    <input
                      type="text"
                      name="prenom"
                      onChange={handleChange}
                      value={donnee.prenom}
                      autoComplete="off"
                      placeholder="Prénom de l'individu"
                      disabled={true}
                    />
                  </div>
                </>
              ) : null}
            </div>
            <div className="buttons">
              {/* <div className="backBtn btn btn-danger" onClick={onClose}> */}
              <div className="backBtn btn btn-danger">
                <BsReplyFill />
                <span className="btnText"> Annuler</span>
              </div>

              <button className="sumbit btn btn-success">
                <span className="btnText"> Enregistrer</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
