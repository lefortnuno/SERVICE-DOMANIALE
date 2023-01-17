import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BsReplyFill } from "react-icons/bs";

const URL_DE_BASE = `dossier/`;
const URL_DE_BASE_Tmp = `dossiertemporaire/`;
const URL_CIN = `requerant/`;
let isValidate = false;
let existanceIndividu = false;
let contenuTab = false;

export default function FormulaireNouvelleDemande() {
	//#region // MES VARIABLES
	const u_info = getDataUtilisateur();
	const navigate = useNavigate();
	const dateAujourdHui = new Date();
	const mesInputs = {
		numeroAffaire: "",
		natureAffectation: "",
		dependance: false,
		lettreDemande: false,
		planAnnexe: false,
		pvDelimitation: false,
		superficieTerrain: "",
		dateDemande: "",
		droitDemande: "",
		observationDossier: "",
		p_numeroRequerant: "",
		nom: "",
		etatMorale: "",
		lettreDesistement: false,
		planMere: false,
		certificatSituationJuridique: false,
		dateRDV: "",
	};

	const previsualisation = {
		numeroRequerant: "",
		etatMorale: "",
		complementInformation: "",
		nom: "",
		prenom: "",
		p_cin: "",
	};

	const [inputs, setInputs] = useState(mesInputs);

	const [donnee, setDonnee] = useState(previsualisation);

	const [erreurs, setErreurs] = useState([]);
	const [messages, setMessages] = useState({
		lettreDemande: "",
		planAnnexe: "",
		pvDelimitation: "",
		superficieTerrain: "",
		observationDossier: "",
		p_numeroRequerant: "",
		lettreDesistement: "",
		planMere: "",
		certificatSituationJuridique: "",
	});
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

		if (name === "observationDossier") {
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

		if (name === "cin") {
			rechercheIndividu(value);

			if (value.length === 0) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: "Numéro de CIN obligatoire",
				}));
			}
			// else if (value.length < 12) {
			//   isValidate = false;
			//   setErreurs((values) => ({ ...values, [name]: true }));
			//   setMessages((values) => ({
			//     ...values,
			//     [name]: "Numéro de CIN trop court",
			//   }));
			// }
			else if (value.length > 12) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: "Numéro de CIN trop long",
				}));
			} else {
				isValidate = true;
				setErreurs((values) => ({ ...values, [name]: false }));
				setMessages((values) => ({ ...values, [name]: "" }));
			}
		}

		if (name === "empietement") {
			if (!value) {
				setInputs((values) => ({ ...values, lettreDesistement: false }));
				setErreurs((values) => ({ ...values, lettreDesistement: false }));
				setMessages((values) => ({
					...values,
					lettreDesistement: false,
				}));
			}
		}

		if (name === "dependance") {
			if (!value) {
				setInputs((values) => ({ ...values, planMere: false }));
				setInputs((values) => ({
					...values,
					certificatSituationJuridique: false,
				}));
				setErreurs((values) => ({ ...values, planMere: false }));
				setErreurs((values) => ({
					...values,
					certificatSituationJuridique: false,
				}));
				setMessages((values) => ({
					...values,
					planMere: false,
				}));
				setMessages((values) => ({
					...values,
					certificatSituationJuridique: false,
				}));
			}
		}

		if (name === "superficieTerrain") {
			if (value < 7.5) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: [name] + " trop petite",
				}));
			} else if (value > 100) {
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

		if (name === "labordeLat" || name === "labordeLong") {
			if (value < -100) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: [name] + " anormallement petite",
				}));
			} else if (value > 100) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: [name] + " anormallement grand",
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
	const validation = (event) => {
		event.preventDefault();
		const inputsObligatoire = [
			"cin",
			"lettreDemande",
			"planAnnexe",
			"pvDelimitation",
			"superficieTerrain",
			"observationDossier",
			// "dateRDV",
		];

		if (!inputs.numeroAffaire) {
			inputs.numeroAffaire = "V";
		}
		if (!inputs.natureAffectation) {
			inputs.natureAffectation = "false";
		}

		if (!inputs.droitDemande) {
			inputs.droitDemande = "5.000";
		}

		if (!inputs.p_numeroRequerant) {
			if (existanceIndividu) {
				inputs.p_numeroRequerant = donnee[0].numeroRequerant;
				setErreurs((values) => ({ ...values, p_numeroRequerant: false }));
				setMessages((values) => ({
					...values,
					p_numeroRequerant: "",
				}));
				isValidate = true;
			} else {
				setErreurs((values) => ({ ...values, p_numeroRequerant: true }));
				setMessages((values) => ({
					...values,
					p_numeroRequerant: "Requérant obligatoire",
				}));
				isValidate = false;
			}
		}

		if (!inputs.dependance) {
			inputs.dependance = false;
			inputs.planMere = false;
			inputs.certificatSituationJuridique = false;
			setErreurs((values) => ({ ...values, planMere: false }));
			setMessages((values) => ({
				...values,
				planMere: false,
			}));
			setErreurs((values) => ({
				...values,
				certificatSituationJuridique: false,
			}));
			setMessages((values) => ({
				...values,
				certificatSituationJuridique: false,
			}));
		} else {
			if (!inputs.planMere) {
				setErreurs((values) => ({ ...values, planMere: true }));
				setMessages((values) => ({
					...values,
					planMere: "Plan Mère obligatoire",
				}));
				isValidate = false;
			}
			if (!inputs.certificatSituationJuridique) {
				setErreurs((values) => ({
					...values,
					certificatSituationJuridique: true,
				}));
				setMessages((values) => ({
					...values,
					certificatSituationJuridique: "C.S.J obligatoire",
				}));
				isValidate = false;
			}
		}

		if (!inputs.empietement) {
			inputs.empietement = false;
			inputs.lettreDesistement = false;
			setErreurs((values) => ({ ...values, lettreDesistement: false }));
			setMessages((values) => ({
				...values,
				lettreDesistement: false,
			}));
		} else {
			if (!inputs.lettreDesistement) {
				setErreurs((values) => ({ ...values, lettreDesistement: true }));
				setMessages((values) => ({
					...values,
					lettreDesistement: "Lettre de desistement obligatoire",
				}));
				isValidate = false;
			}
		}

		inputsObligatoire.forEach((element) => {
			if (!inputs[element]) {
				setErreurs((values) => ({ ...values, [element]: true }));
				setMessages((values) => ({
					...values,
					[element]: "champ " + [element] + "  obligatoire",
				}));
				isValidate = false;
			}
		});

		if (isValidate && existanceIndividu) {
			onSubmit();
		} else {
			toast.warn("Verifier les champs!");
		}
	};
	//#endregion

	//#region // FONCTION DU BOUTTON ENREGISTRER
	const onSubmit = () => {
		let VISA = false;
		let preVISA = false;

		if (u_info.u_attribut === "Chef Adjoint"){
			preVISA = true
		}

		const dataInputs = Object.assign(inputs, {
			roleU: u_info.u_attribut,
			numeroCompte: u_info.u_numeroCompte,
			VISA: VISA,
			preVISA: preVISA,
		});

		let URL_REQUEST;
		if (u_info.u_attribut === "Agent") {
			URL_REQUEST = URL_DE_BASE_Tmp;
		}
		if (
			u_info.u_attribut === "Chef" ||
			u_info.u_attribut === "Chef Adjoint" ||
			u_info.u_attribut === "Administrateur"
		) {
			URL_REQUEST = URL_DE_BASE;
		}

		console.log("dataInputs : ", dataInputs);
		axios.post(URL_REQUEST, dataInputs, u_info.opts).then(function (response) {
			if (response.status === 200) {
				if (response.data.success) {
					toast.success("Ajout Reussi.");

					onClose();
				} else {
					toast.error("Echec de l'Ajout!");
				}
			} else {
				toast.error("Echec de l'Ajout!");
			}
		});
	};
	//#endregion

	//#region // QUAND JE FERMER MON MODAL, CETTE FONCTION EST APPELLER
	const resetDonnee = async () => {
		donnee.splice(0, donnee.length);
		contenuTab = false;
	};

	function onClose() {
		const inputsArray = Object.keys(inputs);

		inputsArray.forEach((element) => {
			inputs[element] = "";
			isValidate = false;
			setErreurs((values) => ({ ...values, [element]: false }));
		});

		resetDonnee();

		navigate("/dossier/");
	}
	//#endregion

	//#region // ----- MA RECHERCHE -----
	function rechercheIndividu(valeur) {
		if (!valeur) {
			// getIndividu();
			contenuTab = false;
		} else {
			axios.get(URL_CIN + `apercu/${valeur}`, u_info.opts).then((response) => {
				if (response.status === 200) {
					const ux = response.data;
					if (ux.success) {
						const u = ux.res;
						setDonnee(u);
						setErreurs((values) => ({ ...values, p_cin: false }));
						setErreurs((values) => ({ ...values, p_numeroRequerant: false }));
						setMessages((values) => ({
							...values,
							p_cin: "",
						}));

						contenuTab = true;
						existanceIndividu = true;
					} else {
						const aucuneDonnee = Object.assign(
							{},
							{
								numeroRequerant: "0",
								p_cin: "0",
								nom: ux.message,
								etatMorale: "0",
								complementInformation: "",
								prenom: ux.message,
							}
						);

						setDonnee([aucuneDonnee]);
						setErreurs((values) => ({ ...values, p_cin: true }));
						setMessages((values) => ({
							...values,
							p_cin: ux.message,
						}));

						contenuTab = true;
						existanceIndividu = false;
					}
				} else {
					setDonnee([]);
					contenuTab = false;
					existanceIndividu = false;
				}
			});
		}
	}
	//#endregion

	return (
		<>
			<form>
				<div className="form first">
					<div className="details personal">
						<div className="fields">
							<div className="input-field">
								<label>Numéro d'affaire :</label>
								<select
									name="numeroAffaire"
									onChange={handleChange}
									autoComplete="off"
								>
									<option value="V">- V</option>
									<option value="AX">- AX</option>
									<option value="X">- X</option>
								</select>
							</div>

							<div className="input-field">
								<label>Nature d'affectation :</label>
								<select
									name="natureAffectation"
									onChange={handleChange}
									autoComplete="off"
								>
									<option value={false}>- Non affecté</option>
									<option value={true}>- Affecté</option>
								</select>
							</div>

							<div className="input-field">
								<label className="form-check-label">
									<input
										className="form-check-input"
										type="checkbox"
										name="dependance"
										onChange={handleChange}
										autoComplete="off"
									/>
									<span className="form-check-sign">Dependance</span>
								</label>
								{inputs.dependance ? (
									<>
										<label className="form-check-label">
											<input
												className="form-check-input"
												type="checkbox"
												name="planMere"
												onChange={handleChange}
												autoComplete="off"
											/>
											<span className="form-check-sign">Plan Mère</span>
											<small className="text-danger d-block">
												{erreurs.planMere ? messages.planMere : null}
											</small>
										</label>
										<label className="form-check-label">
											<input
												className="form-check-input"
												type="checkbox"
												name="certificatSituationJuridique"
												onChange={handleChange}
												autoComplete="off"
											/>
											<span className="form-check-sign">C.S.J</span>
											<small className="text-danger d-block">
												{erreurs.certificatSituationJuridique
													? messages.certificatSituationJuridique
													: null}
											</small>
										</label>
									</>
								) : null}
							</div>

							<div className="input-field">
								<label>
									Numéro de CIN :
									<small className="text-danger d-block">
										{erreurs.p_cin ? messages.p_cin : null}
									</small>
								</label>
								<input
									type="number"
									min="1"
									name="cin"
									onChange={handleChange}
									autoComplete="off"
									placeholder="Entrez le numéro de CIN"
								/>
								<small className="text-danger d-block">
									{erreurs.cin ? messages.cin : null}
								</small>
							</div>

							{contenuTab ? (
								<div className="input-field">
									<label>Numéro du requerant :</label>
									<select
										name="p_numeroRequerant"
										value={donnee.numeroRequerant}
										onChange={handleChange}
										autoComplete="off"
										style={{
											backgroundColor: "rgb(226, 226, 226)",
											color: "#000",
										}}
									>
										{donnee.map((d, index) => (
											<option value={d.numeroRequerant} key={index}>
												Req°{d.numeroRequerant} - {d.nom} :
												{d.etatMorale === 1 ? "P.Morale" : "P.Normale"}
											</option>
										))}
									</select>

									<small className="text-danger d-block">
										{erreurs.p_numeroRequerant
											? messages.p_numeroRequerant
											: null}
									</small>
								</div>
							) : null}

							<div className="input-field">
								<label className="form-check-label">
									<input
										className="form-check-input"
										type="checkbox"
										name="empietement"
										onChange={handleChange}
										autoComplete="off"
									/>
									<span className="form-check-sign">Empiétement</span>
								</label>
								{inputs.empietement ? (
									<>
										<label className="form-check-label">
											<input
												className="form-check-input"
												type="checkbox"
												name="lettreDesistement"
												onChange={handleChange}
												autoComplete="off"
											/>
											<span className="form-check-sign">
												Lettre de désistement
											</span>
											<small className="text-danger d-block">
												{erreurs.lettreDesistement
													? messages.lettreDesistement
													: null}
											</small>
										</label>
									</>
								) : null}
							</div>

							<div className="input-field">
								<label className="form-check-label">
									<input
										className="form-check-input"
										type="checkbox"
										name="planAnnexe"
										onChange={handleChange}
										autoComplete="off"
									/>
									<span className="form-check-sign">Plan y annexe</span>
									<small className="text-danger d-block">
										{erreurs.planAnnexe ? messages.planAnnexe : null}
									</small>
								</label>

								<label className="form-check-label">
									<input
										className="form-check-input"
										type="checkbox"
										name="lettreDemande"
										onChange={handleChange}
										autoComplete="off"
									/>
									<span className="form-check-sign">Lettre de demande</span>
									<small className="text-danger d-block">
										{erreurs.lettreDemande ? messages.lettreDemande : null}
									</small>
								</label>

								<label className="form-check-label">
									<input
										className="form-check-input"
										type="checkbox"
										name="pvDelimitation"
										onChange={handleChange}
										autoComplete="off"
									/>
									<span className="form-check-sign">PV de délimitation</span>
									<small className="text-danger d-block">
										{erreurs.pvDelimitation ? messages.pvDelimitation : null}
									</small>
								</label>
							</div>
							{inputs.pvDelimitation ? (
								<div className="input-field">
									<label>Superficie du terrain : (unité Are)</label>
									<input
										type="number"
										min="1"
										name="superficieTerrain"
										onChange={handleChange}
										autoComplete="off"
										placeholder="Entrez la superficie du terrain"
									/>
									<small className="text-danger d-block">
										{erreurs.superficieTerrain
											? messages.superficieTerrain
											: null}
									</small>
								</div>
							) : null}

							{/* <div className="input-field">
                <label>Date de demande:</label>
                <input
                  type="date"
                  name="dateDemande"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="" 
                />
              </div> */}

							<div className="input-field">
								<label>Droit demande:</label>
								<input
									type="text"
									name="droitDemande"
									onChange={handleChange}
									autoComplete="off"
									placeholder="Ar 5.000 "
									disabled={true}
									style={{
										backgroundColor: "rgb(226, 226, 226)",
										color: "#000",
									}}
								/>
							</div>

							{/* <div className="input-field">
                <label>Rendez-vous :</label>
                <input
                  type="date"
                  name="dateRDV"
                  onChange={handleChange}
                  value={inputs.dateRDV}
                  autoComplete="off"
                  placeholder=""
                  hidden={false}
                />
                <small className="text-danger d-block">
                  {erreurs.dateRDV ? messages.dateRDV : null}
                </small>
              </div> */}

							<div className="input-field">
								<label>Coordonnées de latitude : </label>
								<input
									type="number"
									min="1"
									name="labordeLat"
									onChange={handleChange}
									autoComplete="off"
									placeholder="Entrez le coordonnées de latitude du terrain"
								/>
								<small className="text-danger d-block">
									{erreurs.labordeLat ? messages.labordeLat : null}
								</small>
							</div>

							<div className="input-field">
								<label>Coordonnées de longitude :</label>
								<input
									type="number"
									min="1"
									name="labordeLong"
									onChange={handleChange}
									autoComplete="off"
									placeholder="Entrez le coordonnées de langitude du terrain"
								/>
								<small className="text-danger d-block">
									{erreurs.labordeLong ? messages.labordeLong : null}
								</small>
							</div>

							<div className="input-field">
								<label>Observation :</label>
								<textarea
									as="text"
									name="observationDossier"
									onChange={handleChange}
									autoComplete="off"
									placeholder="Une observation ? ...."
								/>
								<small className="text-danger d-block">
									{erreurs.observationDossier
										? messages.observationDossier
										: null}
								</small>
							</div>
						</div>

						<div className="buttons">
							{/* <div className="backBtn btn btn-danger" onClick={onClose}> */}
							<div className="backBtn btn btn-danger" onClick={onClose}>
								<BsReplyFill />
								<span className="btnText"> Annuler</span>
							</div>

							<button className="btn btn-success" onClick={validation}>
								<span className="btnText"> Enregistrer</span>
							</button>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}
