import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";
import { libraryList, AjoutLibrary } from "../../api/file.js";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Context from "../../contexts/Context";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
  return (
    <>
      <Context>
        <div className="page-header flex-wrap">
          <div className="header-left"></div>
          <div className="header-right d-flex flex-wrap mt-2 mt-sm-0">
            <div className="d-flex align-items-center"></div>
            <button
              type="button"
              onClick={handlePage}
              className="btn btn-danger mt-2 mt-sm-0 btn-icon-text"
            >
              <i className="mdi mdi-plus-circle"></i> Annuler
            </button>
          </div>
        </div>
        <h4 className="page-title">{BASE}</h4>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header ">
                <h4 className="card-title">{BASE}</h4>
              </div>
              <div className="card-body">
                <Container>
                  <Row>
                    <Col col="md-8" ml="auto">
                      <Form.Label>Numéro CIN</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        name="cin"
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Numéro CIN ...."
                        inline="true"
                      />
                      <small className="text-danger d-block">
                        {erreurs.cin ? messages.cin : null}
                      </small>
                    </Col>
                    <Col col="md-8" ml="auto">
                      <Form.Label>Numéro Requerant</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        name="numeroRequerant"
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Numéro Requerant ...."
                        inline="true"
                      />
                      <small className="text-danger d-block">
                        {erreurs.numeroRequerant
                          ? messages.numeroRequerant
                          : null}
                      </small>
                    </Col>
                  </Row>

                  <Row style={rowStyle}>
                    <Col>
                      <Form.Label>
                        <Form.Check
                          type="checkbox"
                          name="dependance"
                          onChange={handleChange}
                          autoComplete="off"
                          inline="true"
                        />
                        Dependance
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Label>
                        <Form.Check
                          type="checkbox"
                          name="empietement"
                          onChange={handleChange}
                          autoComplete="off"
                          inline="true"
                        />
                        Empietement
                      </Form.Label>
                    </Col>
                  </Row>

                  <Row style={rowStyle}>
                    <Col>
                      <Form.Label>
                        <Form.Check
                          type="checkbox"
                          name="lettreDemande"
                          onChange={handleChange}
                          autoComplete="off"
                          inline="true"
                        />
                        Lettre de Demande
                      </Form.Label>
                      <small className="text-danger d-block">
                        {erreurs.lettreDemande ? messages.lettreDemande : null}
                      </small>
                    </Col>
                    <Col>
                      <Form.Label>
                        <Form.Check
                          type="checkbox"
                          name="planAnnexe"
                          onChange={handleChange}
                          autoComplete="off"
                          inline="true"
                        />
                        plan y Annexe
                      </Form.Label>
                      <small className="text-danger d-block">
                        {erreurs.planAnnexe ? messages.planAnnexe : null}
                      </small>
                    </Col>
                  </Row>

                  <Row style={rowStyle}>
                    <Col>
                      <Form.Label>
                        <Form.Check
                          type="checkbox"
                          name="pvDelimitation"
                          onChange={handleChange}
                          autoComplete="off"
                          inline="true"
                        />
                        PV de délimitation
                      </Form.Label>
                      <small className="text-danger d-block">
                        {erreurs.pvDelimitation
                          ? messages.pvDelimitation
                          : null}
                      </small>
                    </Col>
                    <Col>
                      {/* <Form.Label>superficie Terrain</Form.Label> */}
                      <Form.Control
                        type="number"
                        min="0"
                        name="superficieTerrain"
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="superficie Terrain (h.a) ...."
                        inline="true"
                      />
                      <small className="text-danger d-block">
                        {erreurs.superficieTerrain
                          ? messages.superficieTerrain
                          : null}
                      </small>
                    </Col>
                  </Row>

                  <Row style={rowStyle}>
                    <Col>
                      <Form.Label>Droit de demande</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        name="droitDemande"
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="5.000 Ar"
                        disabled={true}
                      />
                    </Col>
                    <Col>
                      <Form.Label>Date de rendez-vous</Form.Label>
                      <Form.Control
                        type="date"
                        name="dateRDV"
                        onChange={handleChange}
                        autoComplete="off"
                      />
                    </Col>
                  </Row>

                  {inputs.dependance ? (
                    <Row style={rowStyle}>
                      <Col>
                        <Form.Label>
                          <Form.Check
                            type="checkbox"
                            name="planMere"
                            onChange={handleChange}
                            autoComplete="off"
                            inline="true"
                          />
                          Plan Mère
                        </Form.Label>
                        <small className="text-danger d-block">
                          {erreurs.planMere ? messages.planMere : null}
                        </small>
                      </Col>
                      <Col>
                        <Form.Label>
                          <Form.Check
                            type="checkbox"
                            name="certificatSituationJuridique"
                            onChange={handleChange}
                            autoComplete="off"
                            inline="true"
                          />
                          C.S.J
                        </Form.Label>
                        <small className="text-danger d-block">
                          {erreurs.certificatSituationJuridique
                            ? messages.certificatSituationJuridique
                            : null}
                        </small>
                      </Col>
                    </Row>
                  ) : null}

                  {inputs.empietement ? (
                    <Row style={rowStyle}>
                      <Col>
                        <Form.Label>
                          <Form.Check
                            type="checkbox"
                            name="lettreDesistement"
                            onChange={handleChange}
                            autoComplete="off"
                            inline="true"
                          />
                          Lettre de désistement
                        </Form.Label>
                        <small className="text-danger d-block">
                          {erreurs.lettreDesistement
                            ? messages.lettreDesistement
                            : null}
                        </small>
                      </Col>
                    </Row>
                  ) : null}

                  <Row style={rowStyle}>
                    <Col>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="observationDossier"
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Une observation à ajouter ? exemple : ''terrain ni immatriculer ni cadastrer, clean ....'' "
                        inline="true"
                      />
                      <small className="text-danger d-block">
                        {erreurs.observationDossier
                          ? messages.observationDossier
                          : null}
                      </small>
                    </Col>
                  </Row>

                  <button className="btn btn-primary" onClick={validation}>
                    Enregistré
                  </button>
                </Container>
              </div>
            </div>
          </div>
        </div>

        {libraryList.forEach(x=>AjoutLibrary(x))}
      </Context>
    </>
  );
}
