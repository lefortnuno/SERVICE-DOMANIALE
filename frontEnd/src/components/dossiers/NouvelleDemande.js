import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";
import { libraryList, AjoutLibrary } from "../../api/file.js";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { 
	BsPersonPlusFill, 
} from "react-icons/bs";

import Context from "../../contexts/Context";
import FormulaireNouvelleDemande from "./FormulaireNouvelleDemande"; 

const BASE = `Nouvelle Demande`;
const URL_DE_BASE = `dossier/`;
const URL_HISTO = `historique/histoND/`;
let isValidate = false;

const rowStyle = {
  marginTop: "1rem",
};

export default function NouvelleDemande() {
  //#region //------------MES VARIABLES ------------
  const navigate = useNavigate();
  const u_info = getDataUtilisateur();

  const [inputs, setInputs] = useState([]);
  const [erreurs, setErreurs] = useState([]);
  const [messages, setMessages] = useState({
    cin: "numéro CIN obligatoire",
    lettreDemande: "Lettre de demande obligatoire",
    planAnnexe: "Plan y annexe obligatoire",
    pvDelimitation: "PV de delimitation obligatoire",
    superficieTerrain: "Superficie du terrain obligatoire",
    numeroRequerant: "numéro du requerant obligatoire",
    observationDossier: "Une observation du dossier est obligatoire",
    planMere: "Il y a dépendance, un plan Mère est obligatoire",
    certificatSituationJuridique:
      "Il y a dépendance, la certification de situation Juridique est obligatoire",
    lettreDesistement:
      "Il y a empietement, une lettre de désistement est obligatoire",
  });

  //#endregion

  const handlePage = (event) => {
    onClose();
    navigate("/C_A");
  };

  //#region // HANDLE CHANGE FONCTION
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
    } else if (value.length > 20) {
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

  //#region //VALIDATION FORMULAIRE
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

    isValidate = true;

    if (isValidate) {
      onSubmit();
    }
  };
  //#endregion

  //#region // QUAND JE FERMER MON MODAL, CETTE FONCTION EST APPELLER
  function onClose() {
    const inputsArray = Object.keys(inputs);

    inputsArray.forEach((element) => {
      setInputs((values) => ({ ...values, [element]: "" }));
      inputs[element] = "";
      isValidate = false;
      setErreurs((values) => ({ ...values, [element]: false }));
    });
  }
  //#endregion

  //#region // FONCTION DU BOUTTON ENREGISTRER
  const onSubmit = () => {
    axios.post(URL_DE_BASE, inputs, u_info.opts).then(function (response) {
      if (response.status === 200) {
        toast.success("Ajout Reussi.");
        onClose();
      } else {
        toast.error("Echec de l'Ajout!");
      }
    });
  };
  //#endregion
  
  const formNewIndividu = () => {
    navigate('/nouveauIndividu/')
  }

  return (
    <>
    <Context>
      <div className="monContainer"> 
        <header>Ajout nouvelle demande :- <BsPersonPlusFill className="text-primary" 
									style={{ cursor: "pointer" }}
                  onClick={formNewIndividu}/> -: </header>

        <FormulaireNouvelleDemande />
      </div>
    </Context>
    </>
  );
}
