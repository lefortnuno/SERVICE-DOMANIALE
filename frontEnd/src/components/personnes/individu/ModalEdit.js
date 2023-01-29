import axios from "../../../api/axios";
import getDataUtilisateur from "../../../api/udata";
import { useState } from "react";
import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const URL_DE_BASE = `individu/`;
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
		});
	}
	//#endregion

	//#region // FONCTION DU BOUTTON ENREGISTRER
	const onSubmit = () => {
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

		if (
			name === "lieuNaiss" ||
			name === "lieuLivrance" ||
			name === "domicile" ||
			name === "profession" ||
			name === "lieuEtatCivil" ||
			name === "complementInformation" ||
			name === "nom" ||
			name === "prenom" ||
			name === "nomConjoint" ||
			name === "prenomConjoint"
		) {
			if (value.length === 0) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: [name] + " obligatoire",
				}));
			} else if (value.length < 4) {
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

		if (name === "cin" || name === "cinConjoint") {
			if (value.length === 0) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: "Numéro de CIN obligatoire",
				}));
			} else if (value.length < 12) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: "Numéro de CIN trop court",
				}));
			} else if (value.length > 12) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: "Numéro de CIN trop long",
				}));
			} else if (value.length === 12) {
				isValidate = true;
				setErreurs((values) => ({ ...values, [name]: false }));
				setMessages((values) => ({ ...values, [name]: "" }));
			} else {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: "Numéro de CIN Obligatoire",
				}));
			}
		}
	};
	//#endregion

	//#region //VALIDATION FORMULAIRE
	const validation = (event) => {
		event.preventDefault();

		const inputsObligatoire = [
			"cin",
			"nom",
			"prenom",
			"lieuNaiss", 
			"domicile",
			"profession", 
			"lieuLivrance",  
		];

		const depObligatoire = [
			"cinConjoint",
			"nomConjoint",
			"prenomConjoint",
			"lieuEtatCivil",
			"dateEtatCivil",
		];

		if (!inputs.etatCivil) {
			inputs.etatCivil = "Célibataire";
		} else if (inputs.etatCivil === "Marié") {
			depObligatoire.forEach((element) => {
				if (element === "cinConjoint" && inputs[element]) {
					if (inputs[element].length !== 12) {
						setErreurs((values) => ({ ...values, [element]: true }));
						setMessages((values) => ({
							...values,
							[element]: "champ " + [element] + "  anormale",
						}));
						isValidate = false;
					}
				}
				if (!inputs[element]) {
					setErreurs((values) => ({ ...values, [element]: true }));
					setMessages((values) => ({
						...values,
						[element]: "champ " + [element] + "  obligatoire",
					}));
					isValidate = false;
				}
			});
		}

		inputsObligatoire.forEach((element) => {
			if (element === "cin" && inputs[element]) {
				if (inputs[element].length !== 12) {
					setErreurs((values) => ({ ...values, [element]: true }));
					setMessages((values) => ({
						...values,
						[element]: "champ " + [element] + "  anormale",
					}));
					isValidate = false;
				}
			}
			if (element === "numeroTelephone" && inputs[element]) {
				if (inputs[element].length !== 9) {
					setErreurs((values) => ({ ...values, [element]: true }));
					setMessages((values) => ({
						...values,
						[element]: "champ " + [element] + "  anormale",
					}));
					isValidate = false;
				}
			}
			if (!inputs[element]) {
				setErreurs((values) => ({ ...values, [element]: true }));
				setMessages((values) => ({
					...values,
					[element]: "champ " + [element] + "  obligatoire",
				}));
				isValidate = false;
			}
		});

		console.log(" --------- ", isValidate, " --------------");
		if (isValidate) {
			onSubmit();
		} else {
      toast.warn("Verifiez les champs.")
		}
	};
	//#endregion

	//#region // QUAND JE FERMER MON MODAL, CETTE FONCTIO EST APPELLER
	function onClose() {
		props.onHide();
		i = 0;

		const inputsArray = [
			"cin",
			"nom",
			"prenom",
			"lieuNaiss", 
			"domicile",
			"profession", 
			"lieuLivrance", 
			"cinConjoint",
			"nomConjoint",
			"prenomConjoint",
			"lieuEtatCivil", 
      "etatCivil"
		];

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
					<Modal.Title className="text-primary h6 md-6">
						Modification de l'individu
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
						<Row>
							<Col>
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlInput2"
								>
									<Form.Label>Numéro de CIN </Form.Label>
									<Form.Control
										type="number"
										name="cin"
										onChange={handleChange}
										value={inputs.cin}
										placeholder="Numéro de Téléphone "
										autoComplete="off"
									/>
									<small className="text-danger d-block">
										{erreurs.cin ? messages.cin : null}
									</small>
								</Form.Group>
							</Col>
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
									<Form.Label>Date de délivrance du CIN : </Form.Label>
									<Form.Control
										type="text"
										name="dateLivrance"
										onChange={handleChange}
										value={inputs.dateLivrance}
										placeholder="Date de délivrance du CIN"
										autoComplete="off"
										disabled={true}
									/>
									<small className="text-danger d-block">
										{erreurs.dateLivrance ? messages.dateLivrance : null}
									</small>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlInput3"
								>
									<Form.Label>Lieu de délivrance du CIN : </Form.Label>
									<Form.Control
										type="text"
										name="lieuLivrance"
										onChange={handleChange}
										value={inputs.lieuLivrance}
										placeholder="Lieu de délivrance du CIN "
										autoComplete="off"
									/>
									<small className="text-danger d-block">
										{erreurs.lieuLivrance ? messages.lieuLivrance : null}
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
									<Form.Label>Adresse de domicile : </Form.Label>
									<Form.Control
										type="text"
										name="domicile"
										onChange={handleChange}
										value={inputs.domicile}
										placeholder="dresse de domicile ...."
										autoComplete="off"
									/>
									<small className="text-danger d-block">
										{erreurs.domicile ? messages.domicile : null}
									</small>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlInput3"
								>
									<Form.Label>Profession : </Form.Label>
									<Form.Control
										type="text"
										name="profession"
										onChange={handleChange}
										value={inputs.profession}
										placeholder="Profession"
										autoComplete="off"
									/>
									<small className="text-danger d-block">
										{erreurs.profession ? messages.profession : null}
									</small>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlInput3"
								>
									<Form.Label>Lieu de naissance : </Form.Label>
									<Form.Control
										type="text"
										name="lieuNaiss"
										onChange={handleChange}
										value={inputs.lieuNaiss}
										placeholder="Lieu de naissance"
										autoComplete="off"
									/>
									<small className="text-danger d-block">
										{erreurs.lieuNaiss ? messages.lieuNaiss : null}
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

					<Button variant="success" onClick={validation}>
						Enregistrer
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
