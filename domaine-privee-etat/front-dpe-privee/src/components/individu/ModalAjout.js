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
    nom: "Nom obligatoire",
    prenom: "Prenom obligatoire",
    cinConjoint: "numéro CIN du conjoint obligatoire",
    nomConjoint: "Nom du conjointobligatoire",
    prenomConjoint: "Prenom du conjoint obligatoire",
    datenais: "Date de naissance obligatoire",
    lieunais: "Lieu de naissance obligatoire",
    domicile: "Adress du domicile obligatoire",
    profession: "Profession obligatoire",
    dateLivrance: "date de delivrance du CIN obligatoire",
    lieuLivrance: "lieu de delivrance du CIN obligatoire",
    dateNature: "date de mariage obligatoire",
    lieuNature: "lieu de mariage obligatoire",
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
    if (!inputs.nature) {
      inputs.nature = "Célibataire";
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

    if (!inputs.nom) {
      inputs.nom = false;
      isValidate = false;
    }
    if (!inputs.prenom) {
      inputs.prenom = false;
      isValidate = false;
    }
    if (!inputs.lieunais) {
      inputs.lieunais = false;
      isValidate = false;
    }
    if (!inputs.datenais) {
      inputs.datenais = false;
      isValidate = false;
    }
    if (!inputs.profession) {
      inputs.profession = false;
      isValidate = false;
    }
    if (!inputs.domicile) {
      inputs.domicile = false;
      isValidate = false;
    }
    if (!inputs.dateLivrance) {
      inputs.dateLivrance = false;
      isValidate = false;
    }
    if (!inputs.lieuLivrance) {
      inputs.lieuLivrance = false;
      isValidate = false;
    }

    if (inputs.nature === "Marié") {
      if (!inputs.cinConjoint) {
        inputs.cinConjoint = false;
        isValidate = false;
      } else {
        if (inputs.cinConjoint.toString().length < 12) {
          isValidate = false;
        } else if (inputs.cinConjoint.toString().length > 12) {
          isValidate = false;
        }
      }
      if (!inputs.nomConjoint) {
        inputs.nomConjoint = false;
        isValidate = false;
      }
      if (!inputs.prenomConjoint) {
        inputs.prenomConjoint = false;
        isValidate = false;
      }
      if (!inputs.dateNature) {
        inputs.dateNature = false;
        isValidate = false;
      }
      if (!inputs.lieuNature) {
        inputs.lieuNature = false;
        isValidate = false;
      }
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

    if (inputs.nature === "Marié") {
      if (!inputs.cinConjoint) {
        setErreurs({
          cinConjoint: true,
        });
      } else {
        if (inputs.cinConjoint.toString().length < 12) {
          setErreurs({
            cinConjoint: true,
          });
          setMessages({
            cinConjoint: "numero CIN du conjoint trop court",
          });
        } else if (inputs.cinConjoint.toString().length > 12) {
          setErreurs({
            cinConjoint: true,
          });
          setMessages({
            cinConjoint: "numero CIN du conjoint trop long ",
          });
        } else {
          setErreurs({
            cin: false,
          });
        }
      }
      if (!inputs.nomConjoint) {
        setErreurs({
          nomConjoint: true,
        });
      }
      if (!inputs.prenomConjoint) {
        setErreurs({
          prenomConjoint: true,
        });
      }
      if (!inputs.dateNature) {
        setErreurs({
          dateNature: true,
        });
      }
      if (!inputs.lieuNature) {
        setErreurs({
          lieuNature: true,
        });
      }
    }

    if (!inputs.nom) {
      setErreurs({
        nom: true,
      });
    }
    if (!inputs.prenom) {
      setErreurs({
        prenom: true,
      });
    }
    if (!inputs.lieunais) {
      setErreurs({
        lieunais: true,
      });
    }
    if (!inputs.datenais) {
      setErreurs({
        datenais: true,
      });
    }
    if (!inputs.profession) {
      setErreurs({
        profession: true,
      });
    }
    if (!inputs.domicile) {
      setErreurs({
        domicile: true,
      });
    }
    if (!inputs.dateLivrance) {
      setErreurs({
        dateLivrance: true,
      });
    }
    if (!inputs.lieuLivrance) {
      setErreurs({
        lieuLivrance: true,
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
              </Row>

              <Row style={rowStyle}>
                <Col col="md-8" ml="auto">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    name="nom"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Nom ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.nom ? messages.nom : null}
                  </small>
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>Prenom</Form.Label>
                  <Form.Control
                    type="text"
                    name="prenom"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Prenom ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.prenom ? messages.prenom : null}
                  </small>
                </Col>
              </Row>

              <Row style={rowStyle}>
                <Col col="md-8" ml="auto">
                  <Form.Label>Date de Naissance</Form.Label>
                  <Form.Control
                    type="date"
                    name="datenais"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder=""
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.datenais ? messages.datenais : null}
                  </small>
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>Lieu de naissance</Form.Label>
                  <Form.Control
                    type="text"
                    name="lieunais"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Lieu de naissance ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.lieunais ? messages.lieunais : null}
                  </small>
                </Col>
              </Row>

              <Row style={rowStyle}>
                <Col col="md-8" ml="auto">
                  <Form.Label>Adress du domicile</Form.Label>
                  <Form.Control
                    type="text"
                    name="domicile"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Adress du domicile ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.domicile ? messages.domicile : null}
                  </small>
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>Profession</Form.Label>
                  <Form.Control
                    type="text"
                    name="profession"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Profession exercer ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.profession ? messages.profession : null}
                  </small>
                </Col>
              </Row>

              <Row style={rowStyle}>
                <Col col="md-8" ml="auto">
                  <Form.Label>Date de délivrance du CIN</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateLivrance"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder=""
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.dateLivrance ? messages.dateLivrance : null}
                  </small>
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>Lieu de délivrance du CIN</Form.Label>
                  <Form.Control
                    type="text"
                    name="lieuLivrance"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Lieu de delivrance du CIN ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.lieuLivrance ? messages.lieuLivrance : null}
                  </small>
                </Col>
              </Row>

              <Row style={rowStyle}>
                <Col>
                  <Form.Label>Etat Civil</Form.Label>
                  <Form.Select
                    name="nature"
                    value={inputs.nature}
                    onChange={handleChange}
                    disabled={false}
                  >
                    <option value="Célibataire">- Célibataire</option>
                    <option value="Marié"> - Marié </option>
                    <option value="Divorcé"> - Divorcé </option>
                    <option value="Veuve"> - Veuve </option>
                  </Form.Select>
                </Col>
              </Row>

              {inputs.nature === "Marié" ? (
                <>
                  <Row style={rowStyle}>
                    <Col col="md-8" ml="auto">
                      <Form.Label>Numéro CIN du conjoint</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        name="cinConjoint"
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Numéro CIN du conjoint...."
                        inline="true"
                      />
                      <small className="text-danger d-block">
                        {erreurs.cinConjoint ? messages.cinConjoint : null}
                      </small>
                    </Col>
                  </Row>
                  <Row style={rowStyle}>
                    <Col col="md-8" ml="auto">
                      <Form.Label>Nom du conjoint</Form.Label>
                      <Form.Control
                        type="text"
                        name="nomConjoint"
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Nom du conjoint ...."
                        inline="true"
                      />
                      <small className="text-danger d-block">
                        {erreurs.nomConjoint ? messages.nomConjoint : null}
                      </small>
                    </Col>
                    <Col col="md-8" ml="auto">
                      <Form.Label>Prenom du conjoint</Form.Label>
                      <Form.Control
                        type="text"
                        name="prenomConjoint"
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Prenom du conjoint ...."
                        inline="true"
                      />
                      <small className="text-danger d-block">
                        {erreurs.prenomConjoint
                          ? messages.prenomConjoint
                          : null}
                      </small>
                    </Col>
                  </Row>
                  <Row style={rowStyle}>
                    <Col col="md-8" ml="auto">
                      <Form.Label>Date de Mariage</Form.Label>
                      <Form.Control
                        type="date"
                        name="dateNature"
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder=""
                        inline="true"
                      />
                      <small className="text-danger d-block">
                        {erreurs.dateNature ? messages.dateNature : null}
                      </small>
                    </Col>
                    <Col col="md-8" ml="auto">
                      <Form.Label>Lieu de Mariage</Form.Label>
                      <Form.Control
                        type="text"
                        name="lieuNature"
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Lieu de mariage ...."
                        inline="true"
                      />
                      <small className="text-danger d-block">
                        {erreurs.lieuNature ? messages.lieuNature : null}
                      </small>
                    </Col>
                  </Row>
                </>
              ) : null}

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
