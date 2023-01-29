import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BsReplyFill, BsSave } from "react-icons/bs";

const URL_DE_BASE = `utilisateur/`;
const URL_CIN = `individu/`;
let isValidate = false;
let existanceIndividu = false;
let contenuTab = false;

export default function FormulaireEnregistrement() {
	//#region // MES VARIABLES
	const u_info = getDataUtilisateur();
	const navigate = useNavigate();

	const cinRecherche = {
		cin: "",
		nom: "",
	};

	const mesInputs = {
		identification: "",
		photoPDP: "",
		mdp: "",
		confirmationMdp: "",
		unite: "",
		u_cin: "",
	};

	const [picPhotoPDP, setPicPhotoPDP] = useState({
		file: [],
		filepreview: null,
	});

	const [latNumeroCompte, setLatNumeroCompte] = useState({
		numeroCompte: "",
	});
	const [inputs, setInputs] = useState([mesInputs]);
	const [donnee, setDonnee] = useState([cinRecherche]);

	const [erreurs, setErreurs] = useState([]);
	const [messages, setMessages] = useState({
		messageErreur: "",
		identification: "",
		photoPDP: "",
		mdp: "",
		confirmationMdp: "",
		unite: "",
		u_cin: "",
		p_cin: "",
	});
	//#endregion

	//#region // DERNIERE NUMERO COMPTE UTILISATEUR FUNC
	useEffect(() => {
		getlastUtilisateur();
	}, []);

	function getlastUtilisateur() {
		axios
			.get(URL_DE_BASE + `numeroCompte/`, u_info.opts)
			.then(function (response) {
				if (response.status === 200) {
					setLatNumeroCompte(response.data);
				} else {
					toast.warning("Vous n'êtes pas autorisé à accéder à cette page!");
				}
			});
	}

	//#endregion

	//#region // HANDLE CHANGE IMAGE FUNC
	const handlePicturePhotoPDP = (event) => {
		setPicPhotoPDP({
			...picPhotoPDP,
			file: event.target.files[0],
			filepreview: URL.createObjectURL(event.target.files[0]),
		});

		setErreurs((values) => ({ ...values, messageErreur: false }));
		setErreurs((values) => ({ ...values, photoPDP: false }));
		isValidate = true;
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

		if (
			name === "identification" ||
			name === "mdp" ||
			name === "confirmationMdp"
		) {
			if (value.length === 0) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: name + " obligatoire",
				}));
			} else if (value.length < 4) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: name + " trop court",
				}));
			} else if (value.length > 8) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: name + " trop long",
				}));
			} else {
				isValidate = true;
				setErreurs((values) => ({ ...values, [name]: false }));
				setMessages((values) => ({ ...values, [name]: "" }));
			}
		}

		if (name === "unite") {
			setErreurs((values) => ({ ...values, [name]: false }));
		}

		if (name === "x_u_cin") {
			rechercheIndividu(value);
			if (value.length === 0) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: "Numéro de CIN obligatoire",
				}));
			} else if (value.length > 12) {
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

		if (name === "confirmationMdp") {
			if (value !== inputs.mdp) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: " Les mot de pass ne correspondent pas",
				}));
			} else {
				isValidate = true;
				setErreurs((values) => ({ ...values, [name]: false }));
				setMessages((values) => ({ ...values, [name]: "" }));
			}
		}

		if (name === "mdp") {
			setErreurs((values) => ({ ...values, confirmationMdp: false }));
			setMessages((values) => ({ ...values, confirmationMdp: "" }));
		}
	};
	//#endregion

	//#region //VALIDATION FORMULAIRE
	const validation = (event) => {
		event.preventDefault();

		if (!inputs.unite) {
			setErreurs((values) => ({ ...values, unite: true }));
			setMessages((values) => ({
				...values,
				unite: "Selectionner votre domaine",
			}));
			isValidate = false;
		}

		if (!inputs.u_cin) {
			if (existanceIndividu) {
				inputs.u_cin = donnee[0].cin;
				setErreurs((values) => ({ ...values, u_cin: false }));
				setMessages((values) => ({
					...values,
					u_cin: "",
				}));
				isValidate = true;
			} else {
				setErreurs((values) => ({ ...values, u_cin: true }));
				setMessages((values) => ({
					...values,
					u_cin: "Numéro de CIN obligatoire",
				}));
				isValidate = false;
			}
		}

		const inputsObligatoire = [
			"mdp",
			"identification",
			"x_u_cin",
			"mdp",
			"confirmationMdp",
		];

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

		if (picPhotoPDP.file.length === 0) {
			setErreurs((values) => ({ ...values, photoPDP: true }));
			setMessages((values) => ({
				...values,
				photoPDP: "Veuillez choisir une photo de profile",
			}));
			isValidate = false;
		}
 
		if (isValidate && existanceIndividu) {
			onSubmit();
		}
	};
	//#endregion

	//#region // FONCTION DU BOUTTON ENREGISTRER
	const onSubmit = () => {
		const dataInputs = Object.assign(inputs, { roleU: u_info.u_attribut });

		axios.post(URL_DE_BASE, dataInputs, u_info.opts).then(function (response) {
			if (response.status === 200) {
				if (response.data.success) {
					if (picPhotoPDP.file.length !== 0) {
						ajoutPhotoPDP();
					}
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

	//#region // IMAGE PHOTO DE FICHE MERE --FACE-- DE L'INDIVIDU
	const ajoutPhotoPDP = async () => {
		const formdata = new FormData();
		formdata.append("photoPDP", picPhotoPDP.file);
		const numeroCompteAnticiper = latNumeroCompte.numeroCompte;
		axios
			.put(
				URL_DE_BASE + `photoPDP/` + `${numeroCompteAnticiper}`,
				formdata,
				u_info.opts,
				{
					headers: { "Content-Type": "multipart/form-data" },
				}
			)
			.then((res) => {
				if (res.data.success) {
					toast.success("Compte creer avec success.");
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

		navigate("/utilisateur/");
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
						setMessages((values) => ({
							...values,
							p_cin: "",
						}));

						contenuTab = true;
						existanceIndividu = true;
					} else {
						setDonnee([{ message: ux.message }]);
						setErreurs((values) => ({ ...values, p_cin: true }));
						setMessages((values) => ({
							...values,
							p_cin: ux.message,
						}));

						contenuTab = true;
						existanceIndividu = false;
					}
				} else {
					setDonnee([cinRecherche]);
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
							<div
								className="input-field monPhotoPDP login100-pic js-tilt "
								data-tilt
							>
								{!picPhotoPDP.filepreview ? (
									<img
										src={process.env.PUBLIC_URL + `/logins/images/img-01.png`}
										alt="image"
									/>
								) : (
									<img
										src={picPhotoPDP.filepreview}
										alt="image"
										style={{
											width: "150px",
											height: "150px",
											borderRadius: "50%",
										}}
									/>
								)}
							</div>
							<div className="input-field">
								<label>Photo de profile</label>
								<input
									type="file"
									name="photoPDP"
									onChange={handlePicturePhotoPDP}
									autoComplete="off"
									placeholder="Photo"
								/>
								<small className="text-danger d-block">
									{erreurs.photoPDP ? messages.photoPDP : null}
								</small>
							</div>

							<div className="input-field">
								<label>Identifiant :</label>
								<input
									type="text"
									name="identification"
									onChange={handleChange}
									autoComplete="off"
									placeholder="Entrez votre identifiant"
								/>
								<small className="text-danger d-block">
									{erreurs.identification ? messages.identification : null}
								</small>
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
									name="x_u_cin"
									onChange={handleChange}
									autoComplete="off"
									placeholder="Entrez votre numéro de CIN"
								/>
								<small className="text-danger d-block">
									{erreurs.x_u_cin ? messages.x_u_cin : null}
								</small>
							</div>

							{contenuTab && donnee.length !== 0 ? (
								<>
									<div className="input-field">
										<label> Sélectionner un Numéro de CIN: </label>
										<select
											name="u_cin"
											value={donnee.cin}
											onChange={handleChange}
											autoComplete="off"
											style={{
												backgroundColor: "rgb(226, 226, 226)",
												color: "#000",
											}}
										>
											{donnee.map((d, index) => (
												<option value={d.cin} key={index}>
													If°{d.cin} - {d.nom}
												</option>
											))}
										</select>
									</div>
								</>
							) : null}

							<div className="input-field">
								<label>Unité : </label>
								<select name="unite" onChange={handleChange} autoComplete="off">
									<option> </option>
									<option value={true}>CIRCONSCRIPTION</option>
									<option value={false}>CONSERVATEUR</option>
								</select>
								<small className="text-danger d-block">
									{erreurs.unite ? messages.unite : null}
								</small>
							</div>

							<div className="input-field">
								<label>Mot de passe : </label>
								<input
									type="password"
									name="mdp"
									onChange={handleChange}
									autoComplete="off"
									placeholder="Entrez votre mot de passe"
								/>
								<small className="text-danger d-block">
									{erreurs.mdp ? messages.mdp : null}
								</small>
							</div>

							<div className="input-field">
								<label>Confirmez mot de passe : </label>
								<input
									type="password"
									name="confirmationMdp"
									onChange={handleChange}
									autoComplete="off"
									placeholder="Confirmez votre mot de passe"
								/>
								<small className="text-danger d-block">
									{erreurs.confirmationMdp ? messages.confirmationMdp : null}
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
