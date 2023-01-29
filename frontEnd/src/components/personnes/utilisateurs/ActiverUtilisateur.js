import axios from "../../../api/axios";
import getDataUtilisateur from "../../../api/udata";
import { useState } from "react";
import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const URL_DE_BASE = `utilisateur/`;
let isValidate = false;
let i = 0;

export default function ModalActivation(props) {
	//#region // MES VARIABLES
	const identifiant = props.children;
	const u_info = getDataUtilisateur();
	const [inputs, setInputs] = useState({
		identification: "",
		statu: "",
		unite: "",
	});
	const [erreurs, setErreurs] = useState([]);
	const [messages, setMessages] = useState({
		identification: "",
		statu: "",
		unite: "",
	});
	//#endregion

	//#region // RECUPERER UN COMPTE
	// FUNC POUR EVITER UNE BOUCLE INFINIE
	while (props.showActive && i === 0) {
		if (i !== 0) {
			break;
		}
		getOneUser();
		i = 1;
	}

	function getOneUser() {
		axios
			.get(URL_DE_BASE + `${identifiant}`, u_info.opts)
			.then(function (response) {
				setInputs(response.data[0]);
			});
	}
	//#endregion

	//#region // FONCTION DU BOUTTON ENREGISTRER
	const onSubmit = () => { 
		axios
			.put(URL_DE_BASE + `statu/${identifiant}`, inputs, u_info.opts)
			.then(function (response) {
				if (response.status === 200) {
					toast.success("Statu du compte : Mise à jour avec succès.");
					onClose();
				} else {
					toast.error("Echec de la Modification du Statu du compte.");
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
	};
	//#endregion

	//#region //VALIDATION FORMULAIRE
	const validation = (event) => {
		event.preventDefault();
		isValidate = true;

		if (inputs.attribut === "false") {
			isValidate = false;
			toast.warn("Veuillez choisir un Rôle pour le compte.");
		}

		if (isValidate) {
			onSubmit();
		}  
	};
	//#endregion

	//#region // QUAND JE FERMER MON MODAL, CETTE FONCTIO EST APPELLER
	function onClose() {
		props.onHide();
		i = 0;

		const inputsArray = ["identification", "statu", "unite"];

		inputsArray.forEach((element) => {
			setInputs((values) => ({ ...values, [element]: "" }));
			inputs[element] = "";
			isValidate = false;
			setErreurs((values) => ({ ...values, [element]: false }));
		});
	}
	//#endregion

	const rowStyle = {
		marginTop: "1rem",
	};

	return (
		<>
			<Modal
				size="md"
				show={props.showActive}
				onHide={props.closeActiveModal}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header>
					<Modal.Title className="text-primary h6 md-6">
						:- ACTIVATION -:{" "}
						<select name="attribut" onChange={handleChange} autoComplete="off">
							<option value={false}>- Rôle - </option>
							<option value="Chef">- Chef </option>
							<option value="Chef Adjoint">- Chef Adjoint</option>
							<option value="Agent">- Agent</option>
							<option value="Usager">- Usager</option>
						</select>
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
						<Row>
							<Col col="md-8" ml="auto">
								<img
									src={
										process.env.PUBLIC_URL + `/picture/pdp/${inputs.photoPDP}`
									}
									alt="pdp"
									style={{
										width: "150px",
										height: "150px",
										borderRadius: "5%",
									}}
								/>
							</Col>

							<Col col="md-8" ml="auto">
								<div className="form-row">
									<div className="form-group">
										<label> Numéro de CIN : </label>
										<span> {inputs.u_cin} </span>
									</div>

									<div className="form-group">
										<label>Nom : </label>
										<span> {inputs.nom} </span>
									</div>

									<div className="form-group">
										<label>Prènom : </label>
										<span> {inputs.prenom} </span>
									</div>
								</div>
							</Col>
						</Row>

						<Row style={rowStyle}>
							<div className="form-row">
								<div className="form-group">
									<label> Identifiant : </label>
									<span> {inputs.identification} </span>
								</div>

								<div className="form-group">
									<label>Unité : </label>
									<span>
										{" "}
										{inputs.unite === 1
											? "Circonscription"
											: "Consevateur"}{" "}
									</span>
								</div>

								<div className="form-group">
									<label> Rôle Actuelle : </label>
									<span> {inputs.attribut} </span>
								</div>
							</div>
						</Row>

						<Row style={rowStyle}>
							<Col className="text-center">
								<div className="input-field">
									<label className="form-check-label">
										<input
											className="form-check-input"
											type="checkbox"
											name="statu"
											checked={inputs.statu}
											onChange={handleChange}
											autoComplete="off"
										/>
										<span className="form-check-sign">Activer le compte ?</span>{" "}
									</label>
								</div>
							</Col>
						</Row>
					</Form>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="danger" onClick={onClose}>
						Annuler
					</Button>

					<Button variant="primary" onClick={validation}>
						Enregistrer
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
