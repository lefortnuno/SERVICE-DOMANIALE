import axios from "../../api/axios";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const URL_BASE = `dossier/`;
let i = 0;

export default function ModalEdition(props) {
  const u_info = {
    u_token: localStorage.token,
  };
  const [inputs, setInputs] = useState({
    identification: "admin",
    etatCompte: "actif",
    mdp: "root"
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
    event.preventDefault();
    const opts = {
      headers: {
        Authorization: u_info.u_token,
      },
    };
    axios.put(URL_BASE + `${id}`, inputs, opts).then(function (response) {
      if (response.status === 200) {
        toast.success("Modificatoin Reussi.");
        i = 0;
        props.onHide();
      } else {
        toast.error("Echec de la Modification!");
      }
    });
  };
  //#endregion

  //#region // FUNC BOUTTON CLOSE
  function onClose() {
    props.onHide();
    i = 0;
  }
  //#endregion

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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>identification</Form.Label>
              <Form.Control
                type="text"
                name="identification"
                value={inputs.identification}
                onChange={handleChange}
                placeholder="identificaton"
                autoComplete="off"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Status du compte</Form.Label>
              <Form.Control
                type="text"
                name="etatCompte"
                value={inputs.etatCompte}
                onChange={handleChange}
                placeholder="status du compte"
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Mdp</Form.Label>
              <Form.Control
                type="password"
                name="mdp"
                value={inputs.mdp}
                onChange={handleChange}
                placeholder="mot de pass"
                autoComplete="off"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Annuler
          </Button>

          <Button
            variant="primary"
            onClick={(e) => handleSubmitEdit(e, inputs.numCompte)}
          >
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  //#endregion
}
