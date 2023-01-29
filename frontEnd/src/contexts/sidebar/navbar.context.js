import { Link } from "react-router-dom";
import getDataUtilisateur from "../../api/udata";

import {
	BsFolder2Open,
	BsGlobe2,
	BsGeoAlt,
	BsHouse,
	BsInfoLg,
	BsGoogle,
	BsPeople,
	BsStickies,
	BsReception4,
} from "react-icons/bs";

export default function NavbarContext() {
	const u_info = getDataUtilisateur();
	return (
		<>
			<ul className="nav">
				<li className="nav-item ">
					<Link to="/accueil/">
						<i>
							<BsHouse />
						</i>
						<p> Accueil </p>
						<span className="badge badge-count">3</span>
					</Link>
				</li>
				{u_info.u_attribut !== "Usager" ? (
					<>
						<li className="nav-item ">
							<Link to="/dossier/">
								<i className="">
									<BsFolder2Open />
								</i>
								<p> Dossiers </p>
								<span className="badge badge-count">1</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/individu/">
								<i>
									<BsPeople />
								</i>
								<p> Personnes </p>
								<span className="badge badge-count">3</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/C_ND/">
								<i>
									<BsStickies />
								</i>
								<p> Cahiers </p>
								<span className="badge badge-count">5</span>
							</Link>
						</li>
						<br />
						<li className="nav-item ">
							<Link to="/terrain/">
								<i>
									<BsGlobe2 />
								</i>
								<p>Terrain</p>
								<span className="badge badge-success">3</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/stats/">
								<i>
									<BsReception4 />
								</i>
								<p>Statisique</p>
								<span className="badge badge-info">3</span>
							</Link>
						</li>
					</>
				) : null}
			</ul>
		</>
	);
}
