import axios from "../../api/axios";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const URL_BASE = `dossier/`;
let i = 0;

export default function ModalEdition(props) {
  const u_info = {
    u_token: localStorage.token,
  };
  const [inputs, setInputs] = useState({
    etatMorale: "Individu Normale",
    cin: "201011012345",
    nom: "Jean",
    prenom: "Jean",
    complementInformation: "Aucune",
  });
  const [erreurs, setErreurs] = useState([]);
  const [messages, setMessages] = useState({
    cin: "numéro CIN obligatoire",
  });
  const id = props.children;

  //#region // FUNC POUR EVITER UNE BOUCLE INFINIE
  while (props.showEdit && i === 0) {
    if (i !== 0) {
      break;
    }
    getOneUser(id);
    i = 1;
  }
  //#endregion

  //#region // RECUPERER UN UTILISATEUR
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

  //#region // CHANGER OU CHARGER LES CONTENUS DES INPUTS
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  //#endregion

  //#region // FUNC BOUTTON SAUVEGARDER LES MODIFICATIONS
  const handleSubmitEdit = (event, id) => {
    let isValidate = true;
    //#region // --- CONTROL DU CHAMP EDITION
    // if (!inputs.etatMorale) {
    //   inputs.etatMorale = "x Normale";
    // }

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

    event.preventDefault();

    if (isValidate) {
      console.log(inputs);
    //   const opts = {
    //     headers: {
    //       Authorization: u_info.u_token,
    //     },
    //   };
    //   axios.put(URL_BASE + `${id}`, inputs, opts).then(function (response) {
    //     if (response.status === 200) {
    //       toast.success("Modificatoin Reussi.");
    //       i = 0;
    //       props.onHide();
    //     } else {
    //       toast.error("Echec de la Modification!");
    //     }
    //   });
    }
  };
  //#endregion

  //#region // FUNC BOUTTON CLOSE
  function onClose() {
    props.onHide();
    i = 0;
  }
  //#endregion

  const rowStyle = {
    marginTop: "1rem",
  };
  //#region // RENDU HTML MODAL EDITER
  return (
    <>
      <Modal
        size="sm"
        show={props.showEdit}
        onHide={props.closeEditModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Edition Utilisateur Numero : {id}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
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
                  value={inputs.cin}
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
                  value={inputs.nom}
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
                  value={inputs.prenom}
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
                  value={inputs.complementInformation}
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
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Annuler
          </Button>

          <Button
            variant="primary"
            onClick={(e) => handleSubmitEdit(e, inputs.numeroRequerant)}
          >
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  //#endregion
}
