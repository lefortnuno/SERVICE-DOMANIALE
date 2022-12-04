import axios from "../../../api/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const URL_BASE = `historique/`;
const URL_Procedure = `procedure/`;
const URL_DOSSIER = `dossier/`;
let i = 0;

export default function ModalAjout(props) {
  //#region // MES VARIABLES
  const u_info = {
    u_token: localStorage.token,
    u_nom: localStorage.u_nom,
    u_prenom: localStorage.u_prenom,
    u_attribut: localStorage.u_attribut,
    u_numCompte: localStorage.u_numCompte,
  };
  const [inputs, setInputs] = useState({
    numAffaire: "1-V/2022",
    numCompte: "1",
    approbation: false,
  });
  const [nextInputs, setNextInputs] = useState({
    numProcedure: "x-1",
    nomProcedure: "x-N.D",
    observation: "",
    dateRDV: "",
  });
  const [erreurs, setErreurs] = useState([]);
  const [messages, setMessages] = useState({
    approbation: "Veuillez valider pour pouvoir continuer",
    observation: "Une observation du dossier est obligatoire",
    dateRDV: "Une date de rendez-vous est obligatoire",
  });
  const [phase, setPhase] = useState([]);
  const id = props.children;
  //#endregion

  //#region // FUNC POUR EVITER UNE BOUCLE INFINIE
  while (props.show && i === 0) {
    if (i !== 0) {
      break;
    }
    getPhase();
    getOneUser(id);
    i = 1;
  }
  //#endregion

  //#region // RECUPERER UN HISTO DOSSIER
  function getOneUser(id) {
    const opts = {
      headers: {
        Authorization: u_info.u_token,
      },
    };
    axios.get(URL_BASE + `${id}`, opts).then(function (response) {
      if (response.status === 200) {
        const u = response.data[0];
        setInputs(u);
        if (u.numProcedure < 11) {
          for (let e of phase) {
            if (u.numProcedure + 1 === e.numProcedure) {
              const d = new Date();
              const tmpdate =
                d.getDate() + `/` + (d.getMonth() + 1) + `/` + d.getFullYear();
              const date = { dateRDV: tmpdate, observation: "" };
              e = Object.assign(e, date);
              setNextInputs(e);
            }
          }
        }
      } else {
        toast.warning("Vous n'êtes pas autorisé à accéder à cette page!");
      }
    });
  }
  //#endregion

  //#region // RECUPERER LES PHASES
  function getPhase() {
    const opts = {
      headers: {
        Authorization: u_info.u_token,
      },
    };
    axios.get(URL_Procedure, opts).then(function (response) {
      if (response.status === 200) {
        setPhase(response.data);
      } else {
        toast.warning("Vous n'êtes pas autorisé à accéder à cette page!");
      }
    });
  }
  //#endregion

  //#region // HANDLE CHANGE FONCTION
  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setInputs((values) => ({ ...values, [name]: value }));
    setNextInputs((values) => ({ ...values, [name]: value }));
    setErreurs((values) => ({ ...values, [name]: false }));
  };
  //#endregion

  //#region // FUNCTION AJOUT NOUVEAU XXX
  const onSubmit = (event) => {
    const opts = {
      headers: {
        Authorization: u_info.u_token,
      },
    };

    let newData = {
      mouvement: nextInputs.movProcedure,
      observation: nextInputs.observation,
      numCompte: inputs.numCompte,
      numAffaire: inputs.numAffaire,
      numProcedure: nextInputs.numProcedure,
      dispoDossier: `1`,
      dateRDV: nextInputs.dateRDV,
    };

    if (nextInputs.movProcedure === `Depart`) {
      newData.dispoDossier = 0;
    } else if (nextInputs.movProcedure === `Interne`) {
      newData.dispoDossier = 1;
    } else {
    }

    axios
      .post(URL_BASE, newData, opts)
      .then(function (response) {
        if (response.status === 200 && response.data.success) {
          toast.success("Validation Reussi.");
          i = 0;
          props.onHide();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((e) => {
        if (e.response.status === 403) {
          toast.error("Vous n'etes pas autoriser à valider un dossier!");
        }
      })
      .finally(() => {
        i = 0;
        props.onHide();
      });
  };
  //#endregion

  //#region // FUNCTION  MODIFIER HISTO-accomplissement-approbation ET DOSSIER
  const histoAccApp = (id) => {
    const opts = {
      headers: {
        Authorization: u_info.u_token,
      },
    };

    const upData = {
      numCompte: inputs.numCompte,
      numAffaire: inputs.numAffaire,
      numProcedure: nextInputs.numProcedure,
      approbationUP: inputs.approbation,
    };
    axios
      .put(URL_BASE + `/next/` + `${id}`, upData, opts)
      .then(function (response) {
        if (response.status === 200 && response.data.success) {
          toast.success("Historique: Ajout Reussi.");
          i = 0;
          props.onHide();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((e) => {
        if (e.response.status === 403) {
          toast.error("Vous n'etes pas autoriser !");
        }
      })
      .finally(() => {
        i = 0;
        props.onHide();
      });
  };
  //#endregion

  //#region // SCHEMA VALIDATION FORMULAIRE -----
  const handleSubmit = () => {
    let isValidate = true;
    //#region // --- VALEUR PAR DEFAUT
    if (!inputs.numCompte) {
      inputs.numCompte = u_info.u_numCompte;
    }
    if (!inputs.approbation) {
      inputs.approbation = false;
      isValidate = false;
    }
    if (!nextInputs.observation) {
      nextInputs.observation = false;
      isValidate = false;
    }
    if (!nextInputs.dateRDV) {
      nextInputs.dateRDV = false;
      isValidate = false;
    }
    //#endregion

    //#region //-------- PRE-VALIDATION
    if (!nextInputs.observation) {
      setErreurs({
        observation: true,
      });
    }
    if (!inputs.approbation) {
      setErreurs({
        approbation: true,
      });
    }
    if (!nextInputs.dateRDV) {
      setErreurs({
        dateRDV: true,
      });
    }
    //#endregion

    if (isValidate) {
      onSubmit();
      histoAccApp(id);
    }
  };
  //#endregion

  //#region // CLOSE MODAL
  function onClose() {
    props.onHide();
    i = 0;
  }
  const rowStyle = {
    marginTop: "1rem",
  };

  useEffect(() => {
    getPhase();
  }, []);
  //#endregion

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
        <Form>
          <Modal.Header>
            <Modal.Title className="text-success">
              Validation :-- {u_info.u_nom} {u_info.u_numCompte} --:
              <Row>
                <Col>
                  <Form.Control
                    type="number"
                    name="numCompte"
                    onChange={handleChange}
                    value={inputs.numCompte}
                    autoComplete="off"
                    min="1"
                    disabled={true}
                    hidden={true}
                  />
                </Col>
              </Row>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Container>
              <Row>
                <Col col="md-6" ml="auto">
                  <Form.Label>Numéro Affaire </Form.Label>
                  <Form.Control
                    type="text"
                    name="numAffaire"
                    value={inputs.numAffaire}
                    onChange={handleChange}
                    disabled={true}
                    autoComplete="off"
                  />
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label> Prochaine Phase </Form.Label>
                  <Form.Control
                    type="text"
                    name="nomProcedure"
                    onChange={handleChange}
                    value={nextInputs.nomProcedure}
                    autoComplete="off"
                    inline="true"
                    disabled={true}
                  />
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label> Date de Rendez-vous</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateRDV"
                    onChange={handleChange}
                    value={nextInputs.dateRDV}
                    autoComplete="off"
                    inline="true"
                    disabled={false}
                  />
                </Col>
              </Row>

              <Row style={rowStyle}>
                <Col>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="observation"
                    onChange={handleChange}
                    value={nextInputs.observation}
                    autoComplete="off"
                    placeholder="Une observation à ajouter ? exemple : ''Bien ....'' "
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.observation ? messages.observation : null}
                  </small>
                </Col>
              </Row>

              <Row style={rowStyle}>
                <Col>
                  <Form.Label>
                    <Form.Check
                      type="checkbox"
                      name="approbation"
                      onChange={handleChange}
                      checked={inputs.approbation}
                      autoComplete="off"
                      inline="true"
                    />
                    Validez-vous ?
                  </Form.Label>
                  <small className="text-danger d-block">
                    {erreurs.approbation ? messages.approbation : null}
                  </small>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Form>
        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Annuler
          </Button>

          <Button variant="success" onClick={handleSubmit}>
            Validé
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  //#endregion
}
