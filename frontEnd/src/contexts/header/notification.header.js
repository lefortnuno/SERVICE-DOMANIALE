import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const URL_DE_VISA = `sousDossier/attenteVISA/`;
const URL_DE_PREVISA = `sousDossier/attentePREVISA/`;
const URL_DE_UTILISATEUR = `oks`;

export default function NotificationHeader() {
	const navigate = useNavigate();
	const u_info = getDataUtilisateur();

	useEffect(() => {
		getPREVISA();
		getVISA();
	}, []);

	//#region //------------DONNEE VISA ------------
	const [visa, setVISA] = useState([]);
	const [visaDepuis, setVISADepuis] = useState([]);

	function getVISA() {
		axios.get(URL_DE_VISA, u_info.opts).then(function (response) {
			if (response.status === 200) {
				setVISA(response.data);
				setVISADepuis(response.data[0].nombreJour);
			} else {
				toast.warning("Vous n'êtes pas autorisé à accéder à cette page!");
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
				setPREVISA(response.data);
				setPREVISADepuis(response.data[0].nombreJour);
			} else {
				toast.warning("Vous n'êtes pas autorisé à accéder à cette page!");
			}
		});
	}
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
								{previsa.length === 0 ? null : (
									<span className="notification"> {previsa.length}</span>
								)}
							</>
						) : null}

						{u_info.u_attribut === "Chef" ? (
							<>
								{visa.length === 0 ? null : (
									<span className="notification"> {visa.length}</span>
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
									Vous avez {previsa.length} notifications
								</div>
							) : null}

							{u_info.u_attribut === "Chef" ? (
								<div className="dropdown-title">
									Vous avez {visa.length} notifications
								</div>
							) : null}
						</li>
						<li>
							<div className="notif-center">
								{u_info.u_attribut === "Chef Adjoint" ? (
									<>
										{previsa.length === 0 ? null : (
											<Link to="/preVISA/">
												<div className="notif-icon notif-primary">
													<i className="la la-comment"></i>
												</div>
												<div className="notif-content">
													<span className="block">
														{" "}
														{previsa.length} Validation nouvelle demande
													</span>
													<span className="time">
														il y a {previsaDepuis} jours
													</span>
												</div>
											</Link>
										)}
									</>
								) : null}

								{u_info.u_attribut === "Chef" ? (
									<>
										{visa.length === 0 ? null : (
											<Link to="/VISA/">
												<div className="notif-icon notif-primary">
													<i className="la la-comment"></i>
												</div>
												<div className="notif-content">
													<span className="block">
														{" "}
														{visa.length} Validation P.A.V{" "}
													</span>
													<span className="time">
														il y a {visaDepuis} jours{" "}
													</span>
												</div>
											</Link>
										)}
									</>
								) : null}

								{/* <Link to="/validationCompte/">
									<div className="notif-icon notif-success">
										<i className="la la-user-plus"></i>
									</div>
									<div className="notif-content">
										<span className="block">2 Nouveau compte à approuver</span>
										<span className="time">il y a 12 jours</span>
									</div>
								</Link> */}
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
