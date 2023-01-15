import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";

import { libraryList, AjoutLibrary } from "../../api/file.js";

import HeaderContext from "../../contexts/header/header.context";
import FooterContext from "../../contexts/footer/footer.context";
import SidebarContext from "../../contexts/sidebar/sidebar.context";
import GoogleMap from "../GoogleMapIntegration/GoogleMap";
import ModalAjout from "../historique/ModalAjout";
import {
	AccessLogoE_TokotanyImage,
	AccessDrapeauFanjakanaImage,
} from "../access/accessAll";

import StatisiqueProcedureUneDossier from "../statistiques/stat.one.dossier";

import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
	BsCapslockFill,
	BsPrinterFill,
	BsBook,
	BsBookFill,
} from "react-icons/bs";

const base = `terrain`;
const URL_DE_BASE = base + `/`;

export default function DetailsTerrain() {
	//#region // MES VARIABLE
	const navigate = useNavigate();
	const u_info = getDataUtilisateur();
	const { numeroTitre } = useParams();
	//#endregion

	//#region // IMPRIMER UN DOC
	const compRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => compRef.current,
		documentTitle: "Decompte Prix du Terrain",
		onAfterPrint: () => toast.success("Impression du document Reussi"),
	});
	//#endregion

	//#region // RECUPERER LES DONNEER DU DOSSIER
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getOneTerrain();
	}, []);

	function getOneTerrain() {
		axios
			.get(URL_DE_BASE + `${numeroTitre}`, u_info.opts)
			.then(function (response) {
				if (response.status === 200) {
					const u = response.data[0];
					setUsers(u);
					console.log("UUUUU : ", u);
				} else {
					toast.warning("Vous n'êtes pas autorisé à accéder à cette page!");
				}
			});
	}

	//#endregion

	return (
		<>
			{libraryList.forEach((x) => AjoutLibrary(x))}

			<div className="wrapper">
				<HeaderContext>
					<form className="navbar-left navbar-form nav-search mr-md-3">
						<div className="input-group">
							<input
								type="text"
								name="searchValue"
								placeholder="Rechercher ...."
								className="form-control"
								autoComplete="off"
							/>
							<div className="input-group-append">
								<span className="input-group-text">
									<i className="la la-search search-icon"></i>
								</span>
							</div>
						</div>
					</form>
				</HeaderContext>

				<SidebarContext />

				<div className="main-panel">
					<div className="content">
						<div className="container-fluid">
							<div className="row">
								<div className="col-md-4">
									<div className="row">
										<div className="card col-12">
											<div className="card-header ">
												<h4 className="card-title">INFO PROPRIETAIRE</h4>
											</div>
											<div className="card-body">
												<div className="form-row">
													<div className="form-group">
														<label> Numéro de CIN : </label>
														<span> {users.cin} </span>
													</div>

													<div className="form-group">
														<label>Nom : </label>
														<span> {users.nom} </span>
													</div>

													<div className="form-group">
														<label>Prènom : </label>
														<span> {users.prenom} </span>
													</div>

													<div className="form-group">
														<label> Numéro de téléphone : </label>
														<span> 0{users.numeroTelephone} </span>
													</div>

													<div className="form-group">
														<label> Etat Morale : </label>
														<span>
															{" "}
															{users.etatMorale === 1
																? "Personne Morale"
																: "Individu Normale"}
														</span>
													</div>
												</div>
											</div>
										</div>

										<div className="card col-12">
											<div className="card-header ">
												<h4 className="card-title">GOOGLE MAPS DU TERRAIN</h4>
											</div>
											<div className="card-body">
												<GoogleMap
													latitude={users.t_labordeLat}
													longitude={users.t_labordeLong}
												/>
											</div>
										</div>
									</div>
								</div>

								<div className="col-md-8">
									<div className="card">
										<div className="card-header ">
											<h4 className="card-title">LIVRE DU TERRAIN</h4>
										</div>
										<div className="card-body">
											<div className="main_view">
												<div className="header_book text-center">
													<span>REPOBLIKAN'I MADAGADIKARA</span>
													<br />
													<span>Fitiavana - Tanindrazana - Fandrosoa</span>
												</div>

												<div className="nom_domaine">
													<span>
														Direction des domaines et des services fonciers
													</span>
												</div>

												<div className="region_de_conservation">
													<p>
														<i>Conservation de la propriété de </i>{" "}
														<span className="region">Fianarantsoa</span>
													</p>
												</div>

												<div className="titre_book">
													<span className="name_book">
														DUPLICATA DU TITRE FONCIER
													</span>
													<p className="text-center">
														n°
														<span className="big_font">
															{users.immatriculationTerrain}{" "}
														</span>
													</p>
													<p>
														DE LA PROPRIETE DITE :{" "}
														<span className="big_font">
															"
															<span className="name">{users.nomPropriete}</span>
															"
														</span>
													</p>
												</div>

												<div className="marge"></div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col-md-12">
									<div className="card">
										<div className="card-header ">
											<h4 className="card-title">VENTE DEFINITIVE</h4>
										</div>
										<div className="card-body">
											<div className="row">
												<div className="col-md-12">
													<p className="text-center title_head_table">
														MUTATIONS TOTALES ET DE DROITS INIDIVIS
													</p>

													<table className=" table table-bordered table_mutation">
														<thead className="text-center">
															<tr>
																<th style={{ width: "80px" }} rowSpan={"2"}>
																	Numéro de bordereau
																</th>
																<th colSpan={"2"}>Date de l'inscription</th>
																<th rowSpan={"2"}>Mode de mutation</th>
																<th style={{ width: "350px" }} rowSpan={"2"}>
																	Nom et prénoms de l'ancien titulaire <br />{" "}
																	(Ne remplir que pour les mutations parielles
																	indivises en indiquant la fraction mutée)
																</th>
																<th style={{ width: "350px" }} rowSpan={"2"}>
																	Nom prénoms ,nouveau titulaire
																</th>
																<th colSpan={"2"}>Prix de la mutation</th>
															</tr>
															<tr>
																<th>Année</th>
																<th style={{ width: "140px" }}>Quantième</th>
																<th>F.</th>
																<th style={{ width: "50px" }}>C.</th>
															</tr>
														</thead>

														<tbody>
															<tr>
																<td className="text-center">03</td>
																<td className="text-center">2018</td>
																<td className="text-center">28 Septembre</td>
																<td className="text-center">Vente définitif</td>
																<td></td>
																<td>{users.nom} {users.prenom}</td> 
																<td>Ar {users.prixTerrain}</td>
																<td></td>
															</tr>
															<tr>
																<td className="text-center">03</td>
																<td className="text-center">2018</td>
																<td className="text-center">28 Septembre</td>
																<td className="text-center">Vente définitif</td>
																<td></td>
																<td>RASOA TEMPLATE</td>
																<td>25.800</td>
																<td></td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<FooterContext />
				</div>
			</div>
		</>
	);
}
