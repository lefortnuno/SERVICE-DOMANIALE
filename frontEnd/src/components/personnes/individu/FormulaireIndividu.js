import axios from "../../../api/axios";
import verifDiffDate from "../../../api/verifDate";

import { useState } from "react";

import getDataUtilisateur from "../../../api/udata";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsReplyFill } from "react-icons/bs";

const URL_DE_BASE = `individu/`;
let isValidate = false;

export default function FormulaireNouveauIndividu() {
	//#region // MES VARIABLES
	const u_info = getDataUtilisateur();
	const navigate = useNavigate();
	const dateAujourdHui = new Date();
	const mesInputs = {
		etatMorale: "",
		cin: "",
		nom: "",
		prenom: "",
		cinConjoint: "",
		nomConjoint: "",
		prenomConjoint: "",
		lieuNaiss: "",
		dateNaiss: "",
		numeroTelephone: "",
		domicile: "",
		profession: "",
		dateLivrance: "",
		lieuLivrance: "",
		etatCivil: "",
		lieuEtatCivil: "",
		dateEtatCivil: "",
		complementInformation: "",
	};

	const [inputs, setInputs] = useState(mesInputs);

	const [erreurs, setErreurs] = useState([]);
	const [messages, setMessages] = useState(mesInputs);
	//#endregion

	//#region // HANDLE CHANGE FONCTION
	const handleChange = (event) => { 
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		setInputs((values) => ({ ...values, [name]: value }));
		setErreurs((values) => ({ ...values, messageErreur: false }));
		setErreurs((values) => ({ ...values, [name]: false }));
		setErreurs((values) => ({ ...values, messageErreur: false }));

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

		if (
			name === "dateNaiss" ||
			name === "dateLivrance" ||
			name === "dateEtatCivil"
		) {
			setErreurs((values) => ({ ...values, dateNaiss: false }));
			setErreurs((values) => ({ ...values, dateLivrance: false }));
			setErreurs((values) => ({ ...values, dateEtatCivil: false }));
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
			"dateNaiss",
			"domicile",
			"profession",
			"dateLivrance",
			"lieuLivrance",
			"complementInformation",
			"numeroTelephone",
		];

		const depObligatoire = [
			"cinConjoint",
			"nomConjoint",
			"prenomConjoint",
			"lieuEtatCivil",
			"dateEtatCivil",
		];

		if (!inputs.etatMorale) {
			inputs.etatMorale = "false";
		}
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

		if (inputs.dateNaiss) {
			const t_dateN = new Date(inputs.dateNaiss);
			const t_date = new Date();

			const r_date = verifDiffDate(t_dateN, t_date);
			if (r_date.year < 18 || r_date.year > 110) {
				isValidate = false;
				setErreurs((values) => ({ ...values, dateNaiss: true }));
				setMessages((values) => ({
					...values,
					dateNaiss: "Date de naissance anormale",
				}));
			}
		}

		if (inputs.dateLivrance) {
			const t_dateL = new Date(inputs.dateLivrance);
			const t_date = new Date();

			const r_date = verifDiffDate(t_dateL, t_date);
			if (r_date.year < 0) {
				isValidate = false;
				setErreurs((values) => ({ ...values, dateLivrance: true }));
				setMessages((values) => ({
					...values,
					dateLivrance: "Date de delivrance anormale",
				}));
			}
		}

		if (inputs.dateEtatCivil) {
			const t_dateE = new Date(inputs.dateEtatCivil);
			const t_date = new Date();

			const r_date = verifDiffDate(t_dateE, t_date);
			if (r_date.year < 0) {
				isValidate = false;
				setErreurs((values) => ({ ...values, dateEtatCivil: true }));
				setMessages((values) => ({
					...values,
					dateEtatCivil: "Date de mariage anormale",
				}));
			}
		}

		if (inputs.dateNaiss && inputs.dateLivrance) {
			const t_dateNaiss = new Date(inputs.dateNaiss);
			const t_dateLivr = new Date(inputs.dateLivrance);

			const r_date = verifDiffDate(t_dateNaiss, t_dateLivr);
			if (r_date.year < 18) {
				isValidate = false;
				setErreurs((values) => ({ ...values, dateLivrance: true }));
				setMessages((values) => ({
					...values,
					dateLivrance: "Date de delivrance du CIN anormale",
				}));
			}
		}

		if (inputs.dateNaiss && inputs.dateEtatCivil) {
			const t_dateNaiss = new Date(inputs.dateNaiss);
			const t_dateMariage = new Date(inputs.dateEtatCivil);

			const r_date = verifDiffDate(t_dateNaiss, t_dateMariage);
			if (r_date.year < 15 || r_date.year > 100) {
				isValidate = false;
				setErreurs((values) => ({ ...values, dateEtatCivil: true }));
				setMessages((values) => ({
					...values,
					dateEtatCivil: "Date de mariage anormale",
				}));
			}
		}

		console.log(" --------- ", isValidate, " --------------");
		if (isValidate) {
			onSubmit();
		} else {
			toast.warn("Verifier les champs!");
		}
	};
	//#endregion

	//#region // FONCTION DU BOUTTON ENREGISTRER
	const onSubmit = () => {
		const dataInputs = Object.assign(inputs, {
			roleU: u_info.u_attribut,
			numeroCompte: u_info.u_numeroCompte,
		});

		axios
			.post(URL_DE_BASE, dataInputs, u_info.opts)
			.then(function (response) {
				if (response.status === 200) {
					if (response.data.success) {
						toast.success("Ajout Reussi.");

						onClose();
					} else if (response.data.errno === 1062) {
						setErreurs((values) => ({ ...values, messageErreur: true }));
						setMessages((values) => ({
							...values,
							messageErreur:
								"--- Ajout non effectuer ! Ce numéro de CIN a déjà été enregistrer ! ---",
						}));
						toast.error(
							"Ajout non effectuer ! Ce numéro de CIN a déjà été enregistrer !"
						);
					} else {
						toast.error("Echec de l'Ajout!");
					}
				} else {
					toast.error("Echec de l'Ajout!");
				}
			})
			.catch((e) => {
				if (e.response.status === 403) {
					toast.error("Vous n'etes pas autoriser à ajouter un individu!");
				}
			});
	};
	//#endregion

	//#region // QUAND JE FERMER MON MODAL, CETTE FONCTIO EST APPELLER
	function onClose() {
		const inputsArray = Object.keys(inputs);

		inputsArray.forEach((element) => {
			inputs[element] = "";
			isValidate = false;
			setErreurs((values) => ({ ...values, [element]: false }));
		});

		navigate("/individu/");
	}
	//#endregion

	//#region // RENDU HTML ----
	return (
		<>
			<form>
				<div className="form first">
					<div className="details personal">
						<div className="fields">
							<div className="input-field">
								<label>Etat Morale : </label>
								<select
									name="etatMorale"
									onChange={handleChange}
									autoComplete="off"
								>
									<option value={false}>- Individu Normale</option>
									<option value={true}> - Personne Morale </option>
								</select>
							</div>

							<div className="input-field">
								<label>Numéro de CIN :</label>
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

							<div className="input-field">
								<label>Nom : </label>
								<input
									type="text"
									name="nom"
									onChange={handleChange}
									autoComplete="off"
									placeholder="Nom de l'individu"
								/>
								<small className="text-danger d-block">
									{erreurs.nom ? messages.nom : null}
								</small>
							</div>

							<div className="input-field">
								<label>Prénom : </label>
								<input
									type="text"
									name="prenom"
									onChange={handleChange}
									autoComplete="off"
									placeholder="Prénom de l'individu"
								/>
								<small className="text-danger d-block">
									{erreurs.prenom ? messages.prenom : null}
								</small>
							</div>

							<div className="input-field">
								<label>Date de naissance :</label>
								<input
									type="date"
									name="dateNaiss"
									onChange={handleChange}
									autoComplete="off"
									placeholder=""
								/>
								<small className="text-danger d-block">
									{erreurs.dateNaiss ? messages.dateNaiss : null}
								</small>
							</div>

							<div className="input-field">
								<label>Lieu de naissance: </label>
								<input
									type="text"
									name="lieuNaiss"
									onChange={handleChange}
									autoComplete="off"
									placeholder="Lieu de naissance"
								/>
								<small className="text-danger d-block">
									{erreurs.lieuNaiss ? messages.lieuNaiss : null}
								</small>
							</div>

							<div className="input-field">
								<label>Numéro de téléphone : </label>
								<input
									type="number"
									min="1"
									name="numeroTelephone"
									onChange={handleChange}
									autoComplete="off"
									placeholder="+261 "
								/>
								<small className="text-danger d-block">
									{erreurs.numeroTelephone ? messages.numeroTelephone : null}
								</small>
							</div>

							<div className="input-field">
								<label>Adresse du domicile : </label>
								<input
									type="text"
									name="domicile"
									onChange={handleChange}
									autoComplete="off"
									placeholder="Adresse du domicile"
								/>
								<small className="text-danger d-block">
									{erreurs.domicile ? messages.domicile : null}
								</small>
							</div>

							<div className="input-field">
								<label>Profession : </label>
								<input
									type="text"
									name="profession"
									onChange={handleChange}
									autoComplete="off"
									placeholder="Profession exercer"
								/>
								<small className="text-danger d-block">
									{erreurs.profession ? messages.profession : null}
								</small>
							</div>

							<div className="input-field">
								<label>Date de délivrance du CIN :</label>
								<input
									type="date"
									name="dateLivrance"
									onChange={handleChange}
									autoComplete="off"
									placeholder=""
								/>
								<small className="text-danger d-block">
									{erreurs.dateLivrance ? messages.dateLivrance : null}
								</small>
							</div>

							<div className="input-field">
								<label>Lieu de délivrance du CIN : </label>
								<input
									type="text"
									name="lieuLivrance"
									onChange={handleChange}
									autoComplete="off"
									placeholder="Lieu de délivrance du CIN"
								/>
								<small className="text-danger d-block">
									{erreurs.lieuLivrance ? messages.lieuLivrance : null}
								</small>
							</div>

							<div className="input-field">
								<label>Etat Civil : </label>
								<select
									name="etatCivil"
									onChange={handleChange}
									autoComplete="off"
								>
									<option value="Célibataire">- Célibataire</option>
									<option value="Marié"> - Marié </option>
									<option value="Divorcé"> - Divorcé </option>
									<option value="Veuve"> - Veuve </option>
								</select>
							</div>

							{inputs.etatCivil === "Marié" ? (
								<>
									<div className="input-field">
										<label>Numéro de CIN du conjoint :</label>
										<input
											type="number"
											min="0"
											name="cinConjoint"
											onChange={handleChange}
											autoComplete="off"
											placeholder="Numéro CIN du conjoint...."
										/>
										<small className="text-danger d-block">
											{erreurs.cinConjoint ? messages.cinConjoint : null}
										</small>
									</div>

									<div className="input-field">
										<label>Nom du conjoint : </label>
										<input
											type="text"
											name="nomConjoint"
											onChange={handleChange}
											autoComplete="off"
											placeholder="Nom du conjoint ...."
										/>
										<small className="text-danger d-block">
											{erreurs.nomConjoint ? messages.nomConjoint : null}
										</small>
									</div>

									<div className="input-field">
										<label>Prénom du conjoint : </label>
										<input
											type="text"
											name="prenomConjoint"
											onChange={handleChange}
											autoComplete="off"
											placeholder="Prénom du conjoint ...."
										/>
										<small className="text-danger d-block">
											{erreurs.prenomConjoint ? messages.prenomConjoint : null}
										</small>
									</div>

									<div className="input-field">
										<label>Date de Mariage :</label>
										<input
											type="date"
											name="dateEtatCivil"
											onChange={handleChange}
											autoComplete="off"
											placeholder=""
										/>
										<small className="text-danger d-block">
											{erreurs.dateEtatCivil ? messages.dateEtatCivil : null}
										</small>
									</div>

									<div className="input-field">
										<label>Lieu de Mariage : </label>
										<input
											type="text"
											name="lieuEtatCivil"
											onChange={handleChange}
											autoComplete="off"
											placeholder="Lieu de mariage ...."
										/>
										<small className="text-danger d-block">
											{erreurs.lieuEtatCivil ? messages.lieuEtatCivil : null}
										</small>
									</div>
								</>
							) : null}

							<div className="input-field">
								<label>Observation :</label>
								<textarea
									as="text"
									name="complementInformation"
									onChange={handleChange}
									autoComplete="off"
									placeholder="Une observation à ajouter ? exemple : ''individu tres menacant et insistant, ....'' "
								/>
								<small className="text-danger d-block">
									{erreurs.complementInformation
										? messages.complementInformation
										: null}
								</small>
							</div>
						</div>
						{erreurs.messageErreur ? (
							<span className="text-danger text-center d-block">
								{messages.messageErreur}
							</span>
						) : null}

						<div className="buttons">
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
	//#endregion
}
