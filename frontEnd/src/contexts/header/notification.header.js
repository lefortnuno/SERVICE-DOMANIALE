import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const URL_DE_NOTIF = `utilisateur/attenteActivation/`;
const URL_DE_VISA = `sousDossier/nbAttenteVISA/`;
const URL_DE_PREVISA = `sousDossier/nbAttentePREVISA/`;

let notifAdjoint;
let notifChef;
let notifAdmin;

export default function NotificationHeader() {
	const navigate = useNavigate();
	const u_info = getDataUtilisateur();

	useEffect(() => {
		getPREVISA();
		getVISA();
		getNotif();
	}, []);

	//#region //------------DONNEE VISA ------------
	const [visa, setVISA] = useState([]);
	const [visaDepuis, setVISADepuis] = useState([]);

	function getVISA() {
		axios.get(URL_DE_VISA, u_info.opts).then(function (response) {
			if (response.status === 200) {
				if (response.data.length === 0) {
					setVISA({ isaVisa: 0 });
				} else {
					setVISA(response.data[0]);
					setVISADepuis(response.data[0].nombreJour);
				}
			}
		});
	}
	//#endregion

	//#region //------------DONNEE PREVISA ------------
	const [previsa, setPREVISA] = useState([]);
	const [previsaDepuis, setPREVISADepuis] = useState([]);

	function getPREVISA() {
		axios.get(URL_DE_PREVISA, u_info.opts).then(function (response) {
			if (response.status === 200) {
				if (response.data.length === 0) {
					setVISA({ isaPreVisa: 0 });
				} else {
					setPREVISA(response.data[0]);
					setPREVISADepuis(response.data[0].nombreJour);
				}
			}
		});
	}
	//#endregion

	//#region //------------ NOTIFICATION ------------
	const [notif, setNotif] = useState([]);

	function getNotif() {
		axios.get(URL_DE_NOTIF, u_info.opts).then(function (response) {
			if (response.status === 200) {
				setNotif(response.data[0]);
			}
		});
	}

	notifAdjoint = previsa.isaPreVisa + notif.attenteActivation;
	notifChef = visa.isaVisa + notif.attenteActivation;
	notifAdmin = notif.attenteActivation;
	//#endregion

	return (
		<>
			{u_info.u_attribut === "Chef" ||
			u_info.u_attribut === "Chef Adjoint" ||
			u_info.u_attribut === "Administrateur" ? (
				<li className="nav-item dropdown hidden-caret">
					<a
						className="nav-link dropdown-toggle"
						href="#"
						id="navbarDropdown"
						role="button"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						<i className="la la-bell"></i>
						{u_info.u_attribut === "Chef Adjoint" ? (
							<>
								{notifAdjoint === 0 ? null : (
									<span className="notification"> {notifAdjoint}</span>
								)}
							</>
						) : null}

						{u_info.u_attribut === "Chef" ? (
							<>
								{notifChef === 0 ? null : (
									<span className="notification"> {notifChef}</span>
								)}
							</>
						) : null}

						{u_info.u_attribut === "Administrateur" ? (
							<>
								{notifAdmin === 0 ? null : (
									<span className="notification"> {notifAdmin}</span>
								)}
							</>
						) : null}
					</a>

					<ul
						className="dropdown-menu notif-box"
						aria-labelledby="navbarDropdown"
					>
						<li>
							{u_info.u_attribut === "Chef Adjoint" ? (
								<div className="dropdown-title">
									Vous avez {notifAdjoint} notifications
								</div>
							) : null}

							{u_info.u_attribut === "Chef" ? (
								<div className="dropdown-title">
									Vous avez {notifChef} notifications
								</div>
							) : null}

							{u_info.u_attribut === "Administrateur" ? (
								<div className="dropdown-title">
									Vous avez {notifAdmin} notifications
								</div>
							) : null}
						</li>

						<li>
							<div className="notif-center">
								{u_info.u_attribut === "Chef Adjoint" ? (
									<>
										{previsa.isaPreVisa === 0 ? null : (
											<Link to="/preVISA/">
												<div className="notif-icon notif-primary">
													<i className="la la-comment"></i>
												</div>
												<div className="notif-content">
													<span className="block">
														{" "}
														{previsa.isaPreVisa} Validation nouvelle demande
													</span>
													<span className="time">
														depuis {previsaDepuis} jours
													</span>
												</div>
											</Link>
										)}
									</>
								) : null}

								{u_info.u_attribut === "Chef" ? (
									<>
										{visa.isaVisa === 0 ? null : (
											<Link to="/VISA/">
												<div className="notif-icon notif-primary">
													<i className="la la-comment"></i>
												</div>
												<div className="notif-content">
													<span className="block">
														{" "}
														{visa.isaVisa} Validation P.A.V{" "}
													</span>
													<span className="time">
														depuis {visaDepuis} jours{" "}
													</span>
												</div>
											</Link>
										)}
									</>
								) : null}

								{notifAdmin === 0 ? null : (
									<Link to="/validationCompte/">
										<div className="notif-icon notif-success">
											<i className="la la-user-plus"></i>
										</div>
										<div className="notif-content">
											<span className="block">
												{notifAdmin} Nouveau compte à approuver
											</span>
											<span className="time">il y a quelque minutes</span>
										</div>
									</Link>
								)}
							</div>
						</li>
						<li>
							{/* <a className="see-all" href="javascript:void(0);"> */}
							<span className="see-all" style={{ cursor: "pointer" }}>
								<strong>Voir toutes les notifications</strong>
								<i className="la la-angle-right"></i>
							</span>
						</li>
					</ul>
				</li>
			) : (
				<li className="nav-item dropdown hidden-caret">
					<a
						className="nav-link dropdown-toggle"
						href="#"
						id="navbarDropdown"
						role="button"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						<i className="la la-bell"></i>
					</a>
				</li>
			)}
		</>
	);
}
