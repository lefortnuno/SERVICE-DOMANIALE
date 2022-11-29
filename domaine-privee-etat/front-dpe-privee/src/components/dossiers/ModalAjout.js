import axios from "../../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const URL_BASE = `dossier/`;

//#region

//#endregion

export default function ModalAjout(props) {
  const u_info = {
    u_token: localStorage.token,
    u_attribut: localStorage.u_attribut,
    u_numCompte: localStorage.u_numCompte,
  };
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

  //#region // IMAGE PHOTO DE PROFILE DES UTILISATEUR

  //#endregion

  //#region // HANDLE CHANGE FONCTION
  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setInputs((values) => ({ ...values, [name]: value }));
    setErreurs((values) => ({ ...values, [name]: false }));

    if (name === "dependance" && value === false) {
      setInputs((values) => ({
        ...values,
        certificatSituationJuridique: value,
      }));
      setInputs((values) => ({ ...values, planMere: value }));
    }
    if (name === `empietement` && value === false) {
      setInputs((values) => ({ ...values, lettreDesistement: value }));
    }
  };
  //#endregion

  //#region // FUNCTION AJOUT NOUVEAU XXX
  const onSubmit = (event) => {
    // event.preventDefault();
    const opts = {
      headers: {
        Authorization: u_info.u_token,
      },
    };
    
    axios
      .post(URL_BASE, inputs, opts)
      .then(function (response) {
        if (response.status === 200 && response.data.success) {
          toast.success("Ajout Reussi.");
          reset();
          props.onHide();
        } else {
          toast.error(response.data.message);
          // FONCTON DE REDIRECTION VERS LE FORMULAIRE AJOUT INDIVIDU
        }
      })
      .catch((e) => {
        if (e.response.status === 403) {
          toast.error("Vous n'etes pas autoriser a ajouter un utilisateur!");
        }
      })
      .finally(() => {
        reset();
        props.onHide();
      });
  };

  //#endregion

  //#region // SCHEMA VALIDATION FORMULAIRE -----
  const handleSubmit = () => {
    let isValidate = true;
    //#region // --- VALEUR PAR DEFAUT
    if (!inputs.numAffaire) {
      inputs.numAffaire = "V";
    }
    if (!inputs.natureAffectation) {
      inputs.natureAffectation = "Non Affecté";
    }

    if (!inputs.cin) {
      inputs.cin = false;
      isValidate = false;
    } else {
      if (inputs.cin.toString().length < 12) {
        isValidate = false;
      } else if (inputs.cin.toString().length > 12) {
        isValidate = false;
      }
    }

    if (!inputs.dependance) {
      inputs.dependance = false;
      if (!inputs.planMere) {
        inputs.planMere = false;
      }
      if (!inputs.certificatSituationJuridique) {
        inputs.certificatSituationJuridique = false;
      }
    } else {
      if (!inputs.planMere) {
        inputs.planMere = false;
        isValidate = false;
      }
      if (!inputs.certificatSituationJuridique) {
        inputs.certificatSituationJuridique = false;
        isValidate = false;
      }
    }

    if (!inputs.empietement) {
      inputs.empietement = false;
    }
    if (!inputs.droitDemande) {
      inputs.droitDemande = "5000";
    }
    if(!inputs.numCompte){
      inputs.numCompte = u_info.u_numCompte
    }
    if (!inputs.lettreDesistement) {
      inputs.lettreDesistement = false;
    }
    if (!inputs.pvDelimitation) {
      inputs.pvDelimitation = false;
      isValidate = false;
    }
    if (!inputs.lettreDemande) {
      inputs.lettreDemande = false;
      isValidate = false;
    }
    if (!inputs.planAnnexe) {
      inputs.planAnnexe = false;
      isValidate = false;
    }
    if (!inputs.superficieTerrain) {
      inputs.superficieTerrain = false;
      isValidate = false;
    }
    if (!inputs.observationDossier) {
      inputs.observationDossier = false;
      isValidate = false;
    }
    if (!inputs.numeroRequerant) {
      inputs.numeroRequerant = false;
      isValidate = false;
    }

    //#endregion

    //#region //-------- PRE-VALIDATION
    if (!inputs.cin) {
      setErreurs({
        cin: true,
      });
    } else {
      if (inputs.cin.toString().length < 12) {
        setErreurs({
          cin: true,
        });
        setMessages({
          cin: "numero CIN trop court",
        });
      } else if (inputs.cin.toString().length > 12) {
        setErreurs({
          cin: true,
        });
        setMessages({
          cin: "numero CIN trop long ",
        });
      } else {
        setErreurs({
          cin: false
        })
      }
    }

    if (inputs.dependance) {
      if (!inputs.certificatSituationJuridique) {
        setErreurs({
          certificatSituationJuridique: true,
        });
      }
      if (!inputs.planMere) {
        setErreurs({
          planMere: true,
        });
      }
    }

    if (inputs.empietement) {
      if (!inputs.lettreDesistement) {
        setErreurs({
          lettreDesistement: true,
        });
      }
    }
    if (!inputs.pvDelimitation) {
      setErreurs({
        pvDelimitation: true,
      });
    }
    if (!inputs.superficieTerrain) {
      setErreurs({
        superficieTerrain: true,
      });
    }
    if (!inputs.observationDossier) {
      setErreurs({
        observationDossier: true,
      });
    }
    if (!inputs.numeroRequerant) {
      setErreurs({
        numeroRequerant: true,
      });
    }
    if (!inputs.planAnnexe) {
      setErreurs({
        planAnnexe: true,
      });
    }
    if (!inputs.lettreDemande) {
      setErreurs({
        lettreDemande: true,
      });
    }
    //#endregion

    if (isValidate) {
      onSubmit();
    }
  };
  //#endregion

  //#region // CLOSE MODAL
  function reset() {
    setInputs([]);
  }
  function onClose() {
    props.onHide();
    reset();
  }
  //#endregion

  const rowStyle = {
    marginTop: "1rem",
  };

  //#region // RENU HTML
  return (
    <>
      <Modal
        size="sm"
        show={props.show}
        onHide={props.closeAddModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{props.children}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
            <Form>
              <Row style={rowStyle}>
                <Col col="md-2">
                  <Form.Label>Numéro Affaire</Form.Label>
                  <Form.Select
                    name="numAffaire"
                    value={inputs.numAffaire}
                    onChange={handleChange}
                    disabled={false}
                  >
                    <option value="V"> - V </option>
                    <option value="AX"> - AX </option>
                    <option value="X"> - X </option>
                  </Form.Select>
                </Col>
                <Col col="md-2">
                  <Form.Label>Nature Affectation</Form.Label>
                  <Form.Select
                    name="natureAffectation"
                    value={inputs.natureAffectation}
                    onChange={handleChange}
                    disabled={false}
                  >
                    <option value="Non Affecté"> - Non Affecté </option>
                    <option value="Affecté"> - Affecté </option>
                  </Form.Select>
                </Col>
              </Row>

              <Row style={rowStyle}>
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
                    {erreurs.numeroRequerant ? messages.numeroRequerant : null}
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

              <Row>
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

              <Row>
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
                    {erreurs.pvDelimitation ? messages.pvDelimitation : null}
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
                  />
                </Col>
                <Col>
                  <Form.Label>Numéro de compte</Form.Label>
                  <Form.Control
                    type="number"
                    name="numCompte"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Numéro compte utilisateur ...."
                    min="1"
                    disabled={true}
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
                <Row>
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

              <Row>
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
            </Form>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Annuler
          </Button>

          <Button variant="primary" onClick={handleSubmit}>
            Enregistré
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  //#endregion
}
