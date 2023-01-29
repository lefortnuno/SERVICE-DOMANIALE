import axios from "../../../api/axios";
import getDataUtilisateur from "../../../api/udata";
import { libraryList, AjoutLibrary } from "../../../api/file.js";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import HeaderContext from "../../../contexts/header/header.context";
import FooterContext from "../../../contexts/footer/footer.context";
import SidebarContext from "../../../contexts/sidebar/sidebar.context";

import { BsReplyFill, BsSearch } from "react-icons/bs";

const base = `individu`;
const URL_DE_BASE = base + `/`;

export default function DetailsIndividu() {
	const { cin } = useParams();
	const navigate = useNavigate();
	const u_info = getDataUtilisateur();

	//#region //------------DONNEE UTILISATEUR------------
	const [inputs, setInputs] = useState([]);

	useEffect(() => {
		getOneUser();
	}, []);
	//#endregion

	//#region // RECUPERER UN INDIVIDU
	function getOneUser() {
		axios.get(URL_DE_BASE + `${cin}`, u_info.opts).then(function (response) {
			setInputs(response.data[0]);
			console.log("response : ", response.data[0]);
		});
	}
	//#endregion

	//#region //------------MODAL EDIT UTILISATEUR------------
	const [numCompteEdit, setNumCompteEdit] = useState("");
	const [showEdit, setShowEdit] = useState(false);
	const showEditModal = (numCompte) => {
		setNumCompteEdit(numCompte);
		setShowEdit(true);
	};
	const closeEditModal = () => {
		getOneUser();
		setShowEdit(false);
	};
	//#endregion

	const handlePage = () => {
		navigate("/individu/");
	};

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
								<div className="card col-12">
									<div className="card-header">
										<h4 className="card-title">
											<BsReplyFill
												onClick={handlePage}
												className="text-danger"
												style={{ cursor: "pointer" }}
											/>{" "}
											Détails sur l'individu
										</h4>
										<p className="card-category"> </p>
									</div>
									<div className="card-body">
										{inputs ? (
											<div className="form-row">
												<div className="form-group">
													<label> Numéro de CIN : </label>
													<span> {inputs.cin} </span>
												</div>

												<div className="form-group">
													<label>Nom : </label>
													<span> {inputs.nom} </span>
												</div>

												<div className="form-group">
													<label>Prénom : </label>
													<span> {inputs.prenom} </span>
												</div>

												<div className="form-group">
													<label> Numéro de téléphone : </label>
													<span> 0{inputs.numeroTelephone} </span>
												</div>

												<div className="form-group">
													<label> Date de naissance : </label>
													<span> {inputs.dateNaiss} </span>
												</div>

												<div className="form-group">
													<label> Lieu de naissance : </label>
													<span> {inputs.lieuNaiss} </span>
												</div>

												<div className="form-group">
													<label> Adress du domicile : </label>
													<span> {inputs.domicile} </span>
												</div>

												<div className="form-group">
													<label> Profession : </label>
													<span> {inputs.profession} </span>
												</div>

												<div className="form-group">
													<label> Date de délivrance du CIN: </label>
													<span> {inputs.dateLivrance} </span>
												</div>

												<div className="form-group">
													<label>Lieu de délivrance du CIN : </label>
													<span> {inputs.lieuLivrance} </span>
												</div>

												{inputs.etatCivil !== "Marié" ? (
													<div className="form-group">
														<label> Etat Civil : </label>
														<span> {inputs.etatCivil} </span>
													</div>
												) : (
													<>
														<div className="form-group">
															<label> Etat Civil : </label>
															<span> {inputs.etatCivil} </span>
														</div>

														<div className="form-group">
															<label> Nom du conjoint : </label>
															<span> {inputs.nomConjoint} </span>
														</div>

														<div className="form-group">
															<label> Date de mariage : </label>
															<span> {inputs.dateEtatCivil} </span>
														</div>

														<div className="form-group">
															<label> Lieu de mariage : </label>
															<span> {inputs.lieuEtatCivil} </span>
														</div>
													</>
												)}
											</div>
										) : (
											<>
												<div className="grid-row">
													<div className="colmun colmun-left">
														<img
															src={
																process.env.PUBLIC_URL +
																`/picture/pageNotFound/404 2.png`
															}
															alt="image-left"
														/>
														<h1 className="px-spc-b-20">
															Veuillez vous reconnecter au serveur.
														</h1>
													</div>
												</div>
											</>
										)}
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
