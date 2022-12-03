import axios from "../../../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const URL_BASE = `historique/`;
let i = 0;

export default function ModalAjout(props) {
  const u_info = {
    u_token: localStorage.token,
    u_nom: localStorage.u_nom,
    u_prenom: localStorage.u_prenom,
    u_attribut: localStorage.u_attribut,
    u_numCompte: localStorage.u_numCompte,
  };
  const [inputs, setInputs] = useState({
    numAffaire: "1-V/2022",
    nomPhase: "N.D",
    observation: "Aucune",
    approbation: false,
  });
  const [erreurs, setErreurs] = useState([]);
  const [messages, setMessages] = useState({
    approbation: "Veuillez valider pour pouvoir continuer",
    observation: "Une observation du dossier est obligatoire",
  });
  const id = props.children;

  //#region // FUNC POUR EVITER UNE BOUCLE INFINIE
  while (props.show && i === 0) {
    if (i !== 0) {
      break;
    }
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
        setInputs(response.data[0]);
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
          i = 0;
          props.onHide();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((e) => {
        if (e.response.status === 403) {
          toast.error("Vous n'etes pas autoriser a ajouter un utilisateur!");
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
    if (!inputs.approbation) {
      inputs.approbation = false;
      isValidate = false;
    }
    if (!inputs.observation) {
      inputs.observation = false;
      isValidate = false;
    }
    //#endregion

    //#region //-------- PRE-VALIDATION
    if (!inputs.observation) {
      setErreurs({
        observation: true,
      });
    }
    if (!inputs.approbation) {
      setErreurs({
        approbation: true,
      });
    }
    //#endregion

    if (isValidate) {
      onSubmit();
    }
  };
  //#endregion

  //#region // CLOSE MODAL
  function onClose() {
    props.onHide();
    i = 0;
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
        <Form>
          <Modal.Header> <Modal.Title className="text-success"> Approbation prochaine étape </Modal.Title></Modal.Header>

          <Modal.Body>
            <Container>
              <Row>
                <Col>
                  <Form.Control
                    type="number"
                    name="numCompte"
                    onChange={handleChange}
                    autoComplete="off"
                    min="1"
                    disabled={true}
                    hidden={true}
                  />
                </Col>
              </Row>
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
                  <Form.Label> Phase Actuel</Form.Label>
                  <Form.Control
                    type="text"
                    name="nomPhase"
                    onChange={handleChange}
                    value={inputs.nomPhase}
                    autoComplete="off"
                    inline="true"
                    disabled={true}
                  />
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label> Prochaine Phase </Form.Label>
                  <Form.Control
                    type="text"
                    name="nomPhase"
                    onChange={handleChange}
                    value={inputs.nomPhase}
                    autoComplete="off"
                    inline="true"
                    disabled={true}
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
                    value={inputs.observation}
                    autoComplete="off"
                    placeholder="Une observation à ajouter ? exemple : ''terrain ni immatriculer ni cadastrer, clean ....'' "
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
