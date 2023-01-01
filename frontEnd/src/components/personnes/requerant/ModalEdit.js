import axios from "../../../api/axios";
import getDataUtilisateur from "../../../api/udata";
import { useState } from "react";
import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const URL_DE_BASE = `requerant/`;
let isValidate = false;
let i = 0;

export default function ModalEdition(props) {
  //#region // MES VARIABLES
  const identifiant = props.children;
  const u_info = getDataUtilisateur();
  const [inputs, setInputs] = useState({
    etatMorale: "",
    numeroTelephone: "",
    complementInformation: "",
  });
  const [erreurs, setErreurs] = useState([]);
  const [messages, setMessages] = useState({
    numeroTelephone: " obligatoire",
    complementInformation: " obligatoire",
  });
  //#endregion

  //#region // RECUPERER UN Arrondissement
  // FUNC POUR EVITER UNE BOUCLE INFINIE
  while (props.showEdit && i === 0) {
    if (i !== 0) {
      break;
    }
    getOneUser(identifiant);
    i = 1;
  }

  function getOneUser(xid) {
    axios.get(URL_DE_BASE + `${xid}`, u_info.opts).then(function (response) {
      setInputs(response.data[0]);
      console.log(response.data[0]);
    });
  }
  //#endregion

  //#region // FONCTION DU BOUTTON ENREGISTRER
  const onSubmit = (identifiant) => {
    console.log(inputs);
    axios
      .put(URL_DE_BASE + `${identifiant}`, inputs, u_info.opts)
      .then(function (response) {
        if (response.status === 200) {
          toast.success("Modificatoin Reussi.");
          onClose();
        } else {
          toast.error("Echec de la Modification!");
        }
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
    setErreurs((values) => ({ ...values, [name]: false }));

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
  const validation = (event, identifiant) => {
    event.preventDefault();
    isValidate = true;

    const inputsArray = Object.keys(inputs);
    inputsArray.forEach((element) => {
      const eString = inputs[element].toString();

      if (eString.length === 0) {
        setErreurs((values) => ({ ...values, [element]: true }));
        isValidate = false;
      }
    });

    console.log(" --------- ", isValidate, " --------------");
    if (isValidate) {
      onSubmit(identifiant);
    } else {
      setErreurs((values) => ({ ...values, messageErreur: true }));
    }
  };
  //#endregion

  //#region // QUAND JE FERMER MON MODAL, CETTE FONCTIO EST APPELLER
  function onClose() {
    props.onHide();
    i = 0;

    const inputsArray = Object.keys(inputs);

    inputsArray.forEach((element) => {
      inputs[element] = "";
      isValidate = false;
      setErreurs((values) => ({ ...values, [element]: false }));
    });
  }
  //#endregion

  const colorStyle = {
    color: "#000",
  };

  return (
    <>
      <Modal
        size="md"
        show={props.showEdit}
        onHide={props.closeEditModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className="text-primary h5 md-6">
            Modification Req°{identifiant}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <select
                name="etatMorale"
                onChange={handleChange}
                autoComplete="off"
                // value={inputs.etatMorale}
              >
                <option value={inputs.etatMorale}>
                  {inputs.etatMorale === 1
                    ? "Personne Morale"
                    : "Individu Normale"}
                </option>
                {inputs.etatMorale === 1 ? (
                  <option value={false}>- Individu Normale</option>
                ) : (
                  <option value={true}> - Personne Morale </option>
                )}
              </select>
              <small className="text-danger d-block">
                {erreurs.etatMorale ? messages.etatMorale : null}
              </small>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>Numéro de Téléphone : +261 </Form.Label>
                  <Form.Control
                    type="number"
                    name="numeroTelephone"
                    onChange={handleChange}
                    value={inputs.numeroTelephone}
                    placeholder="Numéro de Téléphone "
                    autoComplete="off"
                  />
                  <small className="text-danger d-block">
                    {erreurs.numeroTelephone ? messages.numeroTelephone : null}
                  </small>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>Numéro de CIN : </Form.Label>
                  <Form.Control
                    type="number"
                    name="p_cin"
                    onChange={handleChange}
                    value={inputs.p_cin}
                    placeholder="Numéro de CIN "
                    autoComplete="off"
                    disabled={true}
                    style={colorStyle}
                  />
                  <small className="text-danger d-block">
                    {erreurs.p_cin ? messages.p_cin : null}
                  </small>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Label>Nom : </Form.Label>
                  <Form.Control
                    type="text"
                    name="nom"
                    onChange={handleChange}
                    value={inputs.nom}
                    placeholder="Complement d'information"
                    autoComplete="off"
                    disabled={true}
                    style={colorStyle}
                  />
                  <small className="text-danger d-block">
                    {erreurs.nom ? messages.nom : null}
                  </small>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Label>Prénom : </Form.Label>
                  <Form.Control
                    type="text"
                    name="prenom"
                    onChange={handleChange}
                    value={inputs.prenom}
                    placeholder="Complement d'information"
                    autoComplete="off"
                    disabled={true}
                    style={colorStyle}
                  />
                  <small className="text-danger d-block">
                    {erreurs.prenom ? messages.prenom : null}
                  </small>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Label>Complement d'information : </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="complementInformation"
                    onChange={handleChange}
                    value={inputs.complementInformation}
                    placeholder="Complement d'information"
                    autoComplete="off"
                  />
                  <small className="text-danger d-block">
                    {erreurs.complementInformation
                      ? messages.complementInformation
                      : null}
                  </small>
                </Form.Group>
              </Col>
            </Row>

            <small className="text-danger d-block">
              {erreurs.messageErreur ? messages.messageErreur : null}
            </small>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Annuler
          </Button>

          <Button
            variant="success"
            onClick={(e) => validation(e, inputs.numeroRequerant)}
          >
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
