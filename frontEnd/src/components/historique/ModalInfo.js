import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";

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
const URL_SOUS_DOSSIER = `sousDossier/`;
const URL_IM_TERRAIN = `terrain/`;

let i = 0;
let isValidate = false;

export default function ModalInfo(props) {
	//#region // MES VARIABLES
	const u_info = getDataUtilisateur();

	const mesInputs = {
		h_numeroAffaire: "",
		h_numeroDossier: "",
		approbation: false,
		prixTerrain: false,
		nomPropriete: "",
	};
	const mesInputsDecompte = {
		prixTerrain: "",
	};
	const mesInputsTerrain = {
		prixTerrain: "",
	};
	const mesIMInputs = {
		t_cin: "",
	};
	const mesNextInputs = {
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

	const [inputs, setInputs] = useState(mesInputs);
	const [inputsDecompte, setInputsDecompte] = useState(mesInputsDecompte);
	const [inputsTerrain, setInputsTerrain] = useState(mesInputsTerrain);
	const [imInputs, setIMInputs] = useState(mesIMInputs);
	const [nextInputs, setNextInputs] = useState(mesNextInputs);
	const [erreurs, setErreurs] = useState([]);
	const [messages, setMessages] = useState({
		approbation: "",
		immatriculationTerrain: "Sigle d'I.M obligatoire",
		nomPropriete: "Nom Propriete obligatoire",
		observation: "Une observation du dossier est obligatoire",
		dateRDV: "Une date de rendez-vous est obligatoire",
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

				if (u.p_numeroProcedure <= 11) {
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
							setIMInputs({ t_cin: u.p_cin });

							if (u.p_numeroProcedure === 9) {
								getDecompte(u.h_numeroDossier);
								getTerrain(u.p_cin, u.numeroRequerant, u.h_numeroDossier);
							}
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
	function getDecompte(xxx) {
		axios
			.get(URL_SOUS_DOSSIER + `decompte/` + `${xxx}`, u_info.opts)
			.then(function (response) {
				if (response.status === 200) {
					setInputsDecompte(response.data[0]);
				}
			});
	}
	//#endregion

	//#region // RECUPERER LE TERRAIN EN QUESTION
	function getTerrain(cin, numeroRequerant, numeroDossier) {
		const valeur_de_recherche = {
			cin,
			numeroDossier,
			numeroRequerant,
		};

		axios
			.post(URL_IM_TERRAIN + `le_Terrain/`, valeur_de_recherche, u_info.opts)
			.then(function (response) {
				if (response.status === 200) {
					console.log(" ATO VE ? ", response.data[0]);
					setInputsTerrain(response.data[0]);
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
		isValidate = true;

		if (name === "observation" || name === "nomPropriete") {
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
			} else if (value.length > 100) {
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
	};
	//#endregion

	//#region // FUNCTION AJOUT NOUVEAU HISTO
	const onSubmit = () => {
		let newData = {
			mouvement: nextInputs.movProcedure,
			observation: nextInputs.observation,
			p_numeroCompte: u_info.u_numeroCompte,
			h_numeroDossier: inputs.h_numeroDossier,
			h_numeroAffaire: inputs.h_numeroAffaire,
			h_numeroProcedure: nextInputs.numeroProcedure,
			dispoDossier: 1,
			dateRDV: nextInputs.dateRDV,
		};

		if (nextInputs.movProcedure === `Depart`) {
			newData.dispoDossier = 0;
		}

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

		axios
			.put(URL_BASE + `next/` + `${id}`, upData, u_info.opts)
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

	//#region // FUNCTION AJOUT PRIX DU TERRAIN A LA TABLE TERRAIN
	const prixDuTerrain = (id) => {
		const upData = {
			prixTerrain: inputsDecompte.prixTerrain,
		};

		axios
			.put(URL_IM_TERRAIN + `prixTerrain/` + `${id}`, upData, u_info.opts)
			.then(function (response) {
				if (response.status === 200) {
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
			mesureAttribuable: nextInputs.mesureAttribuable,
			prixAttribue: nextInputs.prixAttribue,
			lettreDesistement: inputs.lettreDesistement,
			planMere: inputs.planMere,
			certificatSituationJuridique: inputs.certificatSituationJuridique,
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

	//#region // FUNCTION  AJOUT NOUVEAU IMMATRICULATION selon la phase
	const ajoutNouveauTerrain = () => {
		const newData = {
			immatriculationTerrain: inputs.immatriculationTerrain,
			nomPropriete: inputs.nomPropriete,
			t_cin: imInputs.t_cin,
			t_numeroDossier: inputs.h_numeroDossier,
			t_numeroAffaire: inputs.h_numeroAffaire,
		};

		axios
			.post(URL_IM_TERRAIN, newData, u_info.opts)
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

	//#region // SCHEMA VALIDATION FORMULAIRE -----
	const validation = (event) => {
		event.preventDefault();

		const inputsObligatoire = ["approbation"];
		const nextInputsObligatoire = ["observation", "dateRDV"];

		if (nextInputs.numeroProcedure === 4) {
			nextInputsObligatoire.pop();
			nextInputsObligatoire.push("prixAttribue");
		} else if (nextInputs.numeroProcedure === 5) {
			nextInputsObligatoire.pop();
			nextInputsObligatoire.push("nomPropriete", "immatriculationTerrain");
		} else if (nextInputs.numeroProcedure === 10) {
			nextInputsObligatoire.push("prixTerrain");
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
			onSubmit();
			histoAccApp(id);
			if (nextInputs.numeroProcedure === 4) {
				ajoutSousDossier();
			}

			if (nextInputs.numeroProcedure === 5) {
				ajoutNouveauTerrain();
			}
			if (nextInputs.numeroProcedure === 10) {
				prixDuTerrain(inputsTerrain.numeroTitre);
			}
		}
	};
	//#endregion

	//#region // CLOSE MODAL
	const resetDonnee = async () => {
		// inputsDecompte.splice(0, inputsDecompte.length);
		// inputsTerrain.splice(0, inputsTerrain.length);
		// imInputs.splice(0, imInputs.length);
		// nextInputs.splice(0, nextInputs.length);
		setInputs(mesInputs);
		setInputsDecompte(mesInputsDecompte);
		setInputsTerrain(mesInputsTerrain);
		setIMInputs(mesIMInputs);
		setNextInputs(mesNextInputs);

		const inputsArray = [];
		inputsArray.push(
			mesInputs,
			mesInputsDecompte,
			mesInputsTerrain,
			mesIMInputs,
			mesNextInputs
		);

		isValidate = false;
		setErreurs((values) => ({ ...values, observation: false }));
		setErreurs((values) => ({ ...values, dateRDV: false }));
		setErreurs((values) => ({ ...values, approbation: false }));
		setErreurs((values) => ({ ...values, prixTerrain: false }));
	};

	function onClose() {
		props.onHide();
		i = 0;

		resetDonnee();
	}
	//#endregion

	const rowStyle = {
		marginTop: "1rem",
	};
	const colorStyle = {
		color: "#000",
	};

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
							:-- Validation --:
						</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Container>
							<Row>
								<Col>
									<Form.Label>Numéro Affaire : </Form.Label>
									<Form.Control
										type="text"
										name="h_numeroAffaire"
										value={inputs.h_numeroAffaire}
										onChange={handleChange}
										disabled={true}
										autoComplete="off"
									/>
								</Col>
								<Col>
									<Form.Label> Prochaine Phase : </Form.Label>
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
							</Row>

							{nextInputs.numeroProcedure === 5 ? (
								<>
									<Row style={rowStyle}>
										<Col>
											<div className="fields">
												<div className="input-field">
													<label>Sigle Numéro d'I.M :</label>
													<select
														name="immatriculationTerrain"
														onChange={handleChange}
														autoComplete="off"
													>
														<option value="">- SIGLE I.M</option>
														<option value="V">- V</option>
														<option value="AX">- AX</option>
														<option value="X">- X</option>
													</select>
												</div>
											</div>
											<small className="text-danger d-block">
												{erreurs.immatriculationTerrain
													? messages.immatriculationTerrain
													: null}
											</small>
										</Col>
									</Row>
									<Row style={rowStyle}>
										<Col col="md-6" ml="auto">
											<Form.Label> Nom Propriete : </Form.Label>
											<Form.Control
												type="text"
												name="nomPropriete"
												value={inputs.nomPropriete}
												onChange={handleChange}
												placeholder="Nom de la propriete"
												autoComplete="off"
											/>
											<small className="text-danger d-block">
												{erreurs.nomPropriete ? messages.nomPropriete : null}
											</small>
										</Col>
										<Col col="md-6" ml="auto">
											<Form.Label> CIN du requerant : </Form.Label>
											<Form.Control
												type="text"
												min="0"
												name="t_cin"
												value={imInputs.t_cin}
												onChange={handleChange}
												placeholder="Numero CIN du Requerant"
												autoComplete="off"
												disabled={true}
												style={colorStyle}
											/>
											<small className="text-danger d-block">
												{erreurs.t_cin ? messages.t_cin : null}
											</small>
										</Col>
									</Row>
								</>
							) : null}

							<Row style={rowStyle}>
								{nextInputs.numeroProcedure === 4 ? (
									<>
										<Col col="md-6" ml="auto">
											<Form.Label>  Prix du m² Proposer : </Form.Label>
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
									</>
								) : null}
							</Row>

							<Row style={rowStyle}>
								{nextInputs.numeroProcedure !== 5 &&
								nextInputs.numeroProcedure !== 4 ? (
									<Col>
										<Form.Label> Date de Rendez-vous : </Form.Label>
										<Form.Control
											type="date"
											name="dateRDV"
											onChange={handleChange}
											value={nextInputs.dateRDV}
											autoComplete="off"
											inline="true"
											disabled={false}
										/>
										<small className="text-danger d-block">
											{erreurs.dateRDV ? messages.dateRDV : null}
										</small>
									</Col>
								) : null}

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

								{inputs.p_numeroProcedure === 9 ? (
									<Col>
										<label className="form-check-label">
											<input
												className="form-check-input"
												type="checkbox"
												name="prixTerrain"
												checked={inputs.prixTerrain}
												onChange={handleChange}
												autoComplete="off"
											/>
											<span className="form-check-sign">
												Payement de Ar {inputsDecompte.prixTerrain},00 fait ?
											</span>
										</label>

										<small className="text-danger d-block">
											{erreurs.prixTerrain ? messages.prixTerrain : null}
										</small>
									</Col>
								) : null}
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
}
