import getDataUtilisateur from "../../api/udata";
import { Link, useNavigate } from "react-router-dom";

import { BsGearFill, BsGear, BsBell, BsPower } from "react-icons/bs";

export default function ProfilHeader() {
	const navigate = useNavigate();
	const u_info = getDataUtilisateur();

	const seDeconnecterDuSession = (event) => {
		event.preventDefault();
		localStorage.clear();
		navigate("/");
	};

	return (
		<>
			<li className="nav-item dropdown">
				<a
					className="dropdown-toggle profile-pic"
					data-toggle="dropdown"
					href="#"
					aria-expanded="false"
				>
					<img
						src={process.env.PUBLIC_URL + `/picture/pdp/${u_info.u_photoPDP}`}
						alt="pdp"
						style={{ width: "40px", height: "40px", borderRadius: "50%" }}
					/>
					<span> {u_info.u_identification} </span>
				</a>
				<ul className="dropdown-menu dropdown-user">
					<li>
						<div className="user-box">
							<div className="u-img">
								<img
									src={
										process.env.PUBLIC_URL + `/picture/pdp/${u_info.u_photoPDP}`
									}
									alt="pdp"
								/>
							</div>
							<div className="u-text">
								<h4> {u_info.u_identification} </h4>
								<p className="text-muted">{u_info.u_nom}@gmail.com</p>
								<Link
									to="/mesDossiers/"
									className="btn btn-rounded btn-danger btn-sm"
								>
									Mes dossiers
								</Link>
							</div>
						</div>
					</li>
					<div className="dropdown-divider"></div>
					<Link to="/utilisateur/" className="dropdown-item">
						<i>
							<BsGearFill />
						</i>{" "}
						Paramètre de compte
					</Link>
					<div className="dropdown-divider"></div>
					<a
						className="dropdown-item"
						href="#"
						onClick={(e) => seDeconnecterDuSession(e)}
					>
						<i className="fa fa-power-off"></i> Se déconnecter
					</a>
				</ul>
			</li>
		</>
	);
}
