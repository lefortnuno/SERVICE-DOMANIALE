import axios from "../../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const URL_BASE = `individu/`;

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

    if (name === "nature" && value !== "Marié") {
      setInputs((values) => ({ ...values, cinConjoint: "" }));
      setInputs((values) => ({ ...values, nomConjoint: "" }));
      setInputs((values) => ({ ...values, prenomConjoint: "" }));
      setInputs((values) => ({ ...values, dateNature: "" }));
      setInputs((values) => ({ ...values, lieuNature: "" }));
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
        console.log(response.data.sqlState);
        if (response.status === 200 && response.data.sqlState == '23000') {
          toast.error(response.data.sqlMessage);
        } else if (response.status === 200 && response.data.success) {
          toast.success("Ajout Reussi.");
          // reset();
          // props.onHide();
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
        // reset();
        // props.onHide();
      });
  };

  //#endregion

  //#region // SCHEMA VALIDATION FORMULAIRE -----
  const handleSubmit = () => {
    let isValidate = true;
    //#region // --- VALEUR PAR DEFAUT
    if (!inputs.etatMorale) {
      inputs.etatMorale = "Individu Normale";
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

    if (!inputs.complementInformation) {
      inputs.complementInformation = "Aucune";
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
          cin: false,
        });
      }
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
        size="md"
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
                  <Form.Label>Etat Morale</Form.Label>
                  <Form.Select
                    name="etatMorale"
                    value={inputs.etatMorale}
                    onChange={handleChange}
                    disabled={false}
                  >
                    <option value="Individu Normale">- Individu Normale</option>
                    <option value="Personne Morale"> - Personne Morale </option>
                  </Form.Select>
                </Col>
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
              </Row>

              <Row style={rowStyle}>
                <Col col="md-8" ml="auto">
                  <Form.Label>Nom KETRIK AUTO</Form.Label>
                  <Form.Control
                    type="text"
                    name="nom"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Nom ...."
                    inline="true"
                    disabled={true}
                  />
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>Prenom KETRIK AUTO</Form.Label>
                  <Form.Control
                    type="text"
                    name="prenom"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Prenom ...."
                    inline="true"
                    disabled={true}
                  />
                </Col>
              </Row>

              <Row style={rowStyle}>
                <Col>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="complementInformation"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Une observation à ajouter ? exemple : ''individu tres menacant et insistant, ....'' "
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.complementInformation
                      ? messages.complementInformation
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
