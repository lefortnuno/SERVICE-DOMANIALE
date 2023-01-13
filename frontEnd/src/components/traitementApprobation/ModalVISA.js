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

import { BsNodePlusFill, BsFolder2Open } from "react-icons/bs";

const URL_DE_VISA = `sousDossier/attenteVISA/`; 
const URL_DE_BASE = `sousDossier/`;

let i = 0;
let isValidate = false;

export default function ModalVISA(props) {
	//#region // MES VARIABLES
	const u_info = getDataUtilisateur();

	const mesInputs = {
		p_numeroAffaire: "",
		p_numeroDossier: "",
		VISA: false,
	};

	const [inputs, setInputs] = useState(mesInputs);
	const [erreurs, setErreurs] = useState([]);
	const [messages, setMessages] = useState([]);

	const id = props.children;
	//#endregion

	//#region // FUNC POUR EVITER UNE BOUCLE INFINIE
	while (props.show && i === 0) {
		if (i !== 0) {
			break;
		}
		getSousDossier(id);
		i = 1;
	}
	//#endregion

	//#region // RECUPERER UN SOUS DOSSIER
	function getSousDossier(id) {
		axios.get(URL_DE_BASE + `${id}`, u_info.opts).then(function (response) {
			if (response.status === 200) {
				const u = response.data[0];
				setInputs(u); 
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
		setErreurs((values) => ({ ...values, [name]: false }));
        isValidate = true
	};
	//#endregion

	//#region // FUNCTION AJOUT NOUVEAU HISTO
	const onSubmit = () => { 
		axios
			.put(URL_DE_BASE + `${id}`, inputs, u_info.opts)
			.then(function (response) {
				if (response.status === 200 && response.data.success) {
					toast.success("VISA Octroyer avec success");
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

	//#region // SCHEMA VALIDATION FORMULAIRE -----
	const validation = (event) => {
		event.preventDefault();

        if (!inputs.VISA){
            
				setErreurs((values) => ({ ...values, VISA: true }));
				setMessages((values) => ({
					...values,
					VISA: "Votre signature est vivement recommandée à cet endroit Chef.",
				}));
				isValidate = false;
        }

		console.log("---------", isValidate, "---------");

		if (isValidate) {
			onSubmit();
		}
	};
	//#endregion

	//#region // CLOSE MODAL
	const resetDonnee = async () => {
		setInputs(mesInputs);

		const inputsArray = [];
		inputsArray.push(mesInputs);

		isValidate = false;
		// setErreurs((values) => ({ ...values, observation: false }));
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
							:-- Concéder un pré-VISA --:
						</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Container>
							<Row>
								<div className="col-md-6">
									<div className="card card-stats card-info">
										<div className="card-body ">
											<div className="row">
												<div className="col-3">
													<div className="icon-big text-center">
														<i>
															<BsFolder2Open />
														</i>
													</div>
												</div>
												<div className="col-7 d-flex align-items-center">
													<div className="numbers">
														<h4 className="card-title mb-1">
															{inputs.p_numeroAffaire}
														</h4>
														<h6 className="card-category">
															{inputs.observationSD}
														</h6>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<Col>
									<label className="form-check-label">
										<input
											className="form-check-input"
											type="checkbox"
											name="VISA"
											checked={inputs.VISA}
											onChange={handleChange}
											autoComplete="off"
										/>
										<span className="form-check-sign">
											<i>
												<BsNodePlusFill
													className={
														inputs.VISA ? "text-info" : "text-white"
													}
												/>{" "}
											</i>
											Octroyer VISA ?
										</span>
									</label>

									<small className="text-danger d-block">
										{erreurs.VISA ? messages.VISA : null}
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
}
