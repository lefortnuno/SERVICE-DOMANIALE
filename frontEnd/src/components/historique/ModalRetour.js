import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const URL_BASE = `historique/`;
const URL_BASE_AUTO_ETAPE = URL_BASE + `autoProcedure/`;
const URL_Procedure = `procedure/`;
const URL_DOSSIER = `dossier/`;
const URL_SOUS_DOSSIER = `sousDossier/`;

let i = 0;
let isValidate = false;

export default function ModalRetour(props) {
	//#region // MES VARIABLES
	const navigate = useNavigate();
	const u_info = getDataUtilisateur();
	const contenuNextInputs = {
		numeroProcedure: "",
		nomProcedure: "",
		observation: "",
		dateRDV: "",
		observationSD: "",
		mesureAttribuable: "",
		prixAttribue: "",
		movProcedure: "",
		numeroCompte: "",
	};
	const [inputs, setInputs] = useState({
		h_numeroAffaire: "",
		approbation: false,
		numeroTelephone: "",
	});
	const [inputSousDossier, setInputSousDossier] = useState({
		prixAttribue: "",
		mesureAttribuable: "",
		prixAttribueProposer: "",
	});
	const [nextInputs, setNextInputs] = useState({
		contenuNextInputs,
	});
	const [erreurs, setErreurs] = useState([]);
	const [messages, setMessages] = useState({
		approbation: "",
		observation: "Une observation du dossier est obligatoire",
		observationSD: "Observation obligatoire",
		prixAttribue: "Proposer un prix à soumettre au autorité !",
		mesureAttribuable: "Mesure du terrain obligatoire",
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

	useEffect(() => {
		getPhase();
	}, []);

	//#endregion

	//#region // RECUPERER UN HISTO DOSSIER
	function getOneUser(id) {
		axios.get(URL_BASE + `${id}`, u_info.opts).then(function (response) {
			if (response.status === 200) {
				const u = response.data[0];
				setInputs(u);
				console.log(u);

				if (u.p_numeroProcedure < 11) {
					for (let e of phase) {
						if (u.p_numeroProcedure + 1 === e.numeroProcedure) {
							const d = new Date();
							const tmpdate =
								d.getDate() + `/` + (d.getMonth() + 1) + `/` + d.getFullYear();
							const date = {
								// dateRDV: tmpdate,
								dateRDV: "",
								observation: "",
								numeroCompte: u_info.u_numeroCompte,
							};
							e = Object.assign(e, date);
							if (e.numeroProcedure === 4) {
								const sousDosQuatre = { observationSD: "", prixAttribue: "" };
								e = Object.assign(e, sousDosQuatre);
							}
							if (e.numeroProcedure === 7) {
								const sousDosSept = {
									observationSD: "",
									mesureAttribuable: "",
								};
								e = Object.assign(e, sousDosSept);
							}
							setNextInputs(e);

							getSousDossier(u.h_numeroDossier);
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
		axios.get(URL_Procedure, u_info.opts).then(function (response) {
			if (response.status === 200) {
				setPhase(response.data);
			} else {
				toast.warning("Vous n'êtes pas autorisé à accéder à cette page!");
			}
		});
	}
	//#endregion

	//#region // RECUPERER LA DERNIERE SOUS DOSSIER
	function getSousDossier(xxx) {
		axios
			.get(URL_SOUS_DOSSIER + `lastSousDossier/` + `${xxx}`, u_info.opts)
			.then(function (response) {
				if (response.status === 200) {
					const sousDossier = response.data[0];
					const prixProposer = sousDossier.prixAttribue;

					const sousDossierPrix = Object.assign(sousDossier, {
						prixAttribueProposer: prixProposer,
					});
					setInputSousDossier(sousDossierPrix);
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
		setInputSousDossier((values) => ({ ...values, [name]: value }));
		setErreurs((values) => ({ ...values, [name]: false }));

		if (name === "observation") {
			if (value.length === 0) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: "Une observation est obligatoire",
				}));
			} else if (value.length < 4) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: " Observation trop court",
				}));
			} else if (value.length > 150) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: "Observation trop long",
				}));
			} else {
				isValidate = true;
				setErreurs((values) => ({ ...values, [name]: false }));
				setMessages((values) => ({ ...values, [name]: "" }));
			}
		}

		if (name === "prixAttribue" || name === "mesureAttribuable") {
			if (value < 50) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: [name] + " trop petite",
				}));
			} else if (value > 9999) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: [name] + " trop grande",
				}));
			} else {
				isValidate = true;
				setErreurs((values) => ({ ...values, [name]: false }));
				setMessages((values) => ({ ...values, [name]: "" }));
			}
		}
	};
	//#endregion

	//#region // FUNCTION AJOUT NOUVEAU HISTO
	const onSubmit = () => {
		let mouv_mov;
		if (nextInputs.numeroProcedure === 5 || nextInputs.numeroProcedure === 11) {
			mouv_mov = "Arriver";
		} else {
			mouv_mov = nextInputs.movProcedure;
		}

		let newData = {
			mouvement: mouv_mov,
			observation: nextInputs.observation,
			p_numeroCompte: u_info.u_numeroCompte,
			h_numeroDossier: inputs.h_numeroDossier,
			h_numeroAffaire: inputs.h_numeroAffaire,
			h_numeroProcedure: nextInputs.numeroProcedure,
			dispoDossier: 1,
		};

		if (nextInputs.movProcedure === `Depart`) {
			newData.dispoDossier = 0;
		} else if (nextInputs.movProcedure === `Interne`) {
			newData.dispoDossier = 1;
		} else {
		}

		console.log(" ADD NEW HISTO : ", newData);

		axios
			.post(URL_BASE, newData, u_info.opts)
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
			});
	};
	//#endregion

	//#region // FUNCTION  MODIFIER HISTO-accomplissement-approbation ET DOSSIER
	const histoAccApp = (id) => {
		const upData = {
			h_numeroAffaire: inputs.h_numeroAffaire,
			p_numeroProcedure: nextInputs.numeroProcedure,
			approbationUP: inputs.approbation,
		};

		console.log(" UPDATE HISTO : ", upData);
		axios
			.put(URL_BASE + `/retour/` + `${id}`, upData, u_info.opts)
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
			});
	};
	//#endregion

	//#region // FUNCTION AUTO MODIFIE NUMERO DE PROCEDURE DOSSIER
	const autoUpDossier = (etape) => {
		const upData = {
			numeroAffaire: inputs.h_numeroAffaire,
			p_numeroProcedure: etape,
		};

		axios
			.put(URL_DOSSIER + `autoUpD/`, upData, u_info.opts)
			.then(function (response) {
				if (response.status === 200 && response.data.success) {
					i = 0;
					props.onHide();
				}
			});
	};
	//#endregion

	//#region // FUNCTION  AJOUT SOUS DOSSIER selon la phase
	const ajoutSousDossier = () => {
		const newData = {
			numeroCompte: u_info.u_numeroCompte,
			p_numeroDossier: inputs.h_numeroDossier,
			p_numeroAffaire: inputs.h_numeroAffaire,
			observationSD: nextInputs.observation,
			mesureAttribuable: inputSousDossier.mesureAttribuable,
			prixAttribue: inputSousDossier.prixAttribue,
			lettreDesistement: inputSousDossier.lettreDesistement,
			planMere: inputSousDossier.planMere,
			certificatSituationJuridique:
				inputSousDossier.certificatSituationJuridique,
		};

		axios
			.post(URL_SOUS_DOSSIER, newData, u_info.opts)
			.then(function (response) {
				if (response.status === 200 && response.data.success) {
					toast.success("Historique: Ajout Reussi.");
					i = 0;
					props.onHide();
					autoProcedure(7, nextInputs.observation);
					autoProcedure(8, "F.L.C Valide.");
					autoProcedure(9, "Decompte Encours ....");
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((e) => {
				if (e.response.status === 403) {
					toast.error("Vous n'etes pas autoriser !");
				}
			});
	};
	//#endregion

	//#region // FUNCTION  AJOUT SOUS DOSSIER selon la phase
	const ajoutSousDossierTsotra = () => {
		const newData = {
			numeroCompte: u_info.u_numeroCompte,
			p_numeroDossier: inputs.h_numeroDossier,
			p_numeroAffaire: inputs.h_numeroAffaire,
			observationSD: nextInputs.observation,
			mesureAttribuable: inputSousDossier.mesureAttribuable,
			prixAttribue: inputSousDossier.prixAttribue,
			lettreDesistement: inputSousDossier.lettreDesistement,
			planMere: inputSousDossier.planMere,
			certificatSituationJuridique:
				inputSousDossier.certificatSituationJuridique,
		};

		axios
			.post(URL_SOUS_DOSSIER, newData, u_info.opts)
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
			});
	};
	//#endregion

	//#region // FUNCTION AJOUT NOUVEAU HISTO
	const autoProcedure = (etape, obs) => {
		let newData = {
			h_numeroProcedure: etape,
			observation: obs,
			p_numeroCompte: u_info.u_numeroCompte,
			h_numeroDossier: inputs.h_numeroDossier,
			h_numeroAffaire: inputs.h_numeroAffaire,
		};

		axios
			.post(URL_BASE_AUTO_ETAPE, newData, u_info.opts)
			.then(function (response) {
				if (response.status === 200) {
					autoUpDossier(etape);
					if (etape === 9) {
						navigate(`/viewDossier/${inputs.h_numeroDossier}`);
					}
					i = 0;
					props.onHide();
				}
			});
	};
	//#endregion

	//#region // SCHEMA VALIDATION FORMULAIRE -----
	const validation = (event) => {
		event.preventDefault();

		const inputsObligatoire = ["approbation"];
		const nextInputsObligatoire = ["observation"];

		if (nextInputs.numeroProcedure === 7) {
			nextInputsObligatoire.push("mesureAttribuable");
		}

		inputsObligatoire.forEach((element) => {
			if (!inputs[element]) {
				setErreurs((values) => ({ ...values, [element]: true }));
				setMessages((values) => ({
					...values,
					[element]: "Veuillez valider pour pouvoir continuer",
				}));
				isValidate = false;
			}
		});

		nextInputsObligatoire.forEach((element) => {
			if (!nextInputs[element]) {
				setErreurs((values) => ({ ...values, [element]: true }));
				setMessages((values) => ({
					...values,
					[element]: "champ " + [element] + "  obligatoire",
				}));
				isValidate = false;
			}
		});

		console.log("---------", isValidate, "---------");

		if (isValidate) {
			if (nextInputs.numeroProcedure !== 7) {
				onSubmit();
			}
			histoAccApp(id);
			if (nextInputs.numeroProcedure === 7) {
				ajoutSousDossier();
			}
			if (nextInputs.numeroProcedure === 5) {
				ajoutSousDossierTsotra();
			}
		}
	};
	//#endregion

	//#region // CLOSE MODAL
	function onClose() {
		props.onHide();
		i = 0;
		setInputSousDossier({
			prixAttribue: "",
			mesureAttribuable: "",
		});
		setNextInputs(contenuNextInputs);

		for (const e in inputs) {
			setErreurs((values) => ({ ...values, [e]: false }));
		}
		for (const e in nextInputs) {
			setErreurs((values) => ({ ...values, [e]: false }));
		}
		for (const e in inputSousDossier) {
			setErreurs((values) => ({ ...values, [e]: false }));
		}
	}
	//#endregion

	const rowStyle = {
		marginTop: "1rem",
	};
	const colorStyle = {
		color: "#000",
	};

	//#region // RENU HTML
	return (
		<>
			<Modal
				size="lg"
				show={props.show}
				onHide={props.closeAddModal}
				backdrop="static"
				keyboard={false}
			>
				<Form>
					<Modal.Header>
						<Modal.Title className="text-primary h5">
							:-- Retour --:
						</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Container>
							<Row>
								<Col col="md-6" ml="auto">
									<Form.Label>Numéro Affaire : </Form.Label>
									<Form.Control
										type="text"
										name="h_numeroAffaire"
										value={inputs.h_numeroAffaire}
										onChange={handleChange}
										disabled={true}
										autoComplete="off"
										style={colorStyle}
									/>
								</Col>
								<Col col="md-8" ml="auto">
									<Form.Label> Prochaine Phase : </Form.Label>
									<Form.Control
										type="text"
										name="nomProcedure"
										onChange={handleChange}
										value={nextInputs.nomProcedure}
										autoComplete="off"
										inline="true"
										disabled={true}
										style={colorStyle}
									/>
								</Col>
							</Row>

							<Row style={rowStyle}>
								<Col col="md-8" ml="auto">
									<Form.Label> Requerant : </Form.Label>
									<Form.Control
										type="text"
										name="nom"
										onChange={handleChange}
										// value={inputs.nom+inputs.prenom}
										value={inputs.prenom}
										autoComplete="off"
										inline="true"
										disabled={true}
										style={colorStyle}
									/>
									<small className="text-danger d-block">
										{erreurs.nom ? messages.nom : null}
									</small>
								</Col>
								<Col col="md-8" ml="auto">
									<Form.Label> Numéro de téléphone : +261</Form.Label>
									<Form.Control
										type="number"
										name="numeroTelephone"
										onChange={handleChange}
										value={0 + inputs.numeroTelephone}
										autoComplete="off"
										inline="true"
										disabled={true}
										style={colorStyle}
									/>
									<small className="text-danger d-block">
										{erreurs.numeroTelephone ? messages.numeroTelephone : null}
									</small>
								</Col>
							</Row>

							{nextInputs.numeroProcedure === 5 ? (
								<Row style={rowStyle}>
									<Col col="md-6" ml="auto">
										<Form.Label> Prix du m² Proposer : </Form.Label>
										<Form.Control
											type="number"
											min="0"
											name="prixAttribue"
											value={inputSousDossier.prixAttribueProposer}
											onChange={handleChange}
											disabled={true}
											autoComplete="off"
											style={colorStyle}
										/>
									</Col>

									<Col col="md-6" ml="auto">
										<Form.Label> Prix du m² Accordé : </Form.Label>
										<Form.Control
											type="number"
											min="0"
											name="prixAttribue"
											value={nextInputs.prixAttribue}
											onChange={handleChange}
											disabled={false}
											placeholder="prix par mètre carré"
											autoComplete="off"
										/>
										<small className="text-danger d-block">
											{erreurs.prixAttribue ? messages.prixAttribue : null}
										</small>
									</Col>
								</Row>
							) : null}

							{nextInputs.numeroProcedure === 7 ? (
								<Row style={rowStyle}>
									<Col col="md-6" ml="auto">
										<Form.Label> Superficie Demander : (unité Are)</Form.Label>
										<Form.Control
											type="number"
											min="0"
											name="superficieTerrain"
											value={inputs.superficieTerrain}
											onChange={handleChange}
											disabled={true}
											autoComplete="off"
											style={colorStyle}
										/>
									</Col>
									<Col col="md-6" ml="auto">
										<Form.Label> Mesure Attribuable : </Form.Label>
										<Form.Control
											type="number"
											min="0"
											name="mesureAttribuable"
											value={inputSousDossier.mesureAttribuable}
											onChange={handleChange}
											disabled={false}
											autoComplete="off"
										/>
										<small className="text-danger d-block">
											{erreurs.mesureAttribuable
												? messages.mesureAttribuable
												: null}
										</small>
									</Col>
								</Row>
							) : null}

							{nextInputs.numeroProcedure === 7 ? (
								<Row style={rowStyle}>
									<Col col="md-6" ml="auto">
										<Form.Label> Prix Attribué en m² : </Form.Label>
										<Form.Control
											type="number"
											min="0"
											name="prixAttribue"
											value={inputSousDossier.prixAttribue}
											onChange={handleChange}
											disabled={true}
											autoComplete="off"
											style={colorStyle}
										/>
										<small className="text-danger d-block">
											{erreurs.prixAttribue ? messages.prixAttribue : null}
										</small>
									</Col>
								</Row>
							) : null}

							<Row style={rowStyle}>
								<Col>
									<Form.Label> Observation : </Form.Label>
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
									<label className="form-check-label">
										<input
											className="form-check-input"
											type="checkbox"
											name="approbation"
											checked={inputs.approbation}
											onChange={handleChange}
											autoComplete="off"
										/>
										<span className="form-check-sign">Validez-vous ? </span>
									</label>

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

					<Button variant="success" onClick={validation}>
						Validé
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
	//#endregion
}
