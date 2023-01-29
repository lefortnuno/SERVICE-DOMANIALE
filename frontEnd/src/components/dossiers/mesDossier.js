import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";

import { libraryList, AjoutLibrary } from "../../api/file.js.js";
import { AccessCahierND } from "../access/accessCahier";
import { NouvelleDemande } from "../access/accessAll";

import HeaderContext from "../../contexts/header/header.context";
import FooterContext from "../../contexts/footer/footer.context";
import SidebarContext from "../../contexts/sidebar/sidebar.context";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { BsEye, BsPencilSquare, BsTrash } from "react-icons/bs";

const base = `dossier`;
const URL_DE_BASE = base + `/mesDossiers/`;

export default function DossierAgent() {
	const navigate = useNavigate();
	const u_info = getDataUtilisateur();

	//#region //------------DONNEE UTILISATEUR------------
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers();
	}, []);

	function getUsers() {
		const idCompte = {
			identification: u_info.u_identification,
			numeroCompte: u_info.u_numeroCompte,
		};
		axios.post(URL_DE_BASE, idCompte, u_info.opts).then(function (response) {
			if (response.status === 200) {
				setUsers(response.data);
			} else {
				toast.warning("Vous n'êtes pas autorisé à accéder à cette page!");
			}
		});
	}
	//#endregion

	//#region   //----- MA RECHERCHE -----
	const [contenuTab, setContenuTab] = useState(false);
	function rechercheElement(event) {
		const valeur = event.target.value;
		const idCompte = {
			identification: u_info.u_identification,
			numeroCompte: u_info.u_numeroCompte,
			value: valeur,
		};

		if (!valeur) {
			getUsers();
			setContenuTab(false);
		} else {
			axios
				.post(URL_DE_BASE + `recherche/`, idCompte, u_info.opts)
				.then((response) => {
					if (response.data.success) {
						setUsers(response.data.res);
						setContenuTab(true);
					} else {
						setUsers(response.data.res);
						setContenuTab(false);
					}
				});
		}
	}
	//#endregion

	//#region  //----- MY PAGINATION -----
	const [currentPage, setcurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(8);

	const [pageNumberLimit, setPageNumberLimit] = useState(5);
	const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
	const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

	const handleClick = (event) => {
		setcurrentPage(Number(event.target.id));
	};

	function retourALaPremierPage() {
		setcurrentPage(1);
		if (currentPage > 5) {
			setmaxPageNumberLimit(5);
			setminPageNumberLimit(0);
		}
	}

	const pages = [];
	const nbrPage = Math.ceil(users.length / itemsPerPage);
	for (let i = 1; i <= nbrPage; i++) {
		pages.push(i);
	}

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

	const renderPageNumbers = pages.map((number) => {
		if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
			return (
				<li
					key={number}
					id={number}
					onClick={handleClick}
					className={currentPage == number ? "active" : null}
				>
					{number}
				</li>
			);
		} else {
			return null;
		}
	});

	const handleNextbtn = () => {
		setcurrentPage(currentPage + 1);
		if (currentPage + 1 > maxPageNumberLimit) {
			setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
			setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
		}
	};

	const handlePrevbtn = () => {
		setcurrentPage(currentPage - 1);
		if (currentPage - 2 < minPageNumberLimit) {
			setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
			setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
		}
	};
	//#endregion

	//#region //------------MODAL EDIT UTILISATEUR------------
	const [numCompteEdit, setNumCompteEdit] = useState("");
	const [showEdit, setShowEdit] = useState(false);
	const showEditModal = (numCompte) => {
		setNumCompteEdit(numCompte);
		setShowEdit(true);
	};
	const closeEditModal = () => {
		getUsers();
		setShowEdit(false);
	};
	//#endregion

	return (
		<>
			{libraryList.forEach((x) => AjoutLibrary(x))}

			<div className="wrapper">
				<HeaderContext>
					<form className="navbar-left navbar-form nav-search mr-md-3">
						<div className="input-group">
							<input
								type="number_format"
								maxLength="20"
								name="searchValue"
								placeholder="Rechercher ...."
								className="form-control"
								autoComplete="off"
								onClick={retourALaPremierPage}
								onChange={rechercheElement}
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
								{u_info.u_attribut !== "Usager" ? <AccessCahierND /> : null}
								<NouvelleDemande />
							</div>

							<div className="row">
								<div className="col-md-12">
									<div className="card">
										<div className="card-header ">
											<h4 className="card-title">Liste de mes {base}s</h4>
										</div>
										<div className="card-body">
											<div className="row">
												{contenuTab || users.length !== 0 ? (
													currentItems.map((dossier, index) => (
														<>
															<div className="col-md-3" key={index}>
																<div
																	className={
																		dossier.p_numeroProcedure === 1 ||
																		dossier.p_numeroProcedure === 2 ||
																		dossier.p_numeroProcedure === 3
																			? "card card-stats card-warning"
																			: dossier.p_numeroProcedure === 4 ||
																			  dossier.p_numeroProcedure === 5 ||
																			  dossier.p_numeroProcedure === 6 ||
																			  dossier.p_numeroProcedure === 7
																			? "card card-stats card-semi-warning"
																			: dossier.p_numeroProcedure === 8 ||
																			  dossier.p_numeroProcedure === 9 ||
																			  dossier.p_numeroProcedure === 10
																			? "card card-stats card-info"
																			: dossier.p_numeroProcedure === 11
																			? "card card-stats card-success"
																			: dossier.p_numeroProcedure === 69
																			? "card card-stats card-danger"
																			: null
																	}
																>
																	<Link
																		to={`/viewDossier/${dossier.numeroDossier}`}
																	>
																		<div className="card-body ">
																			<div className="row">
																				<div className="col-3">
																					<div className="icon-big text-center">
																						<i
																							className={
																								dossier.p_numeroProcedure < 4
																									? "la la-check-circle"
																									: "la la-check-circle"
																							}
																						></i>
																					</div>
																				</div>
																				<div className="col-7 d-flex align-items-center">
																					<div className="numbers">
																						<p className="card-category">
																							{dossier.numeroAffaire}
																						</p>
																						<h4 className="card-title">
																							{dossier.nom}
																						</h4>
																					</div>
																				</div>
																			</div>
																		</div>
																	</Link>
																</div>
															</div>
														</>
													))
												) : (
													<>
														<div className="col-md-4">
															<div className="card card-stats card-danger">
																<div className="card-body ">
																	<div className="row">
																		<div className="col-5">
																			<div className="icon-big text-center">
																				<i className="la la-times-circle-o text-danger"></i>
																			</div>
																		</div>
																		<div className="col-7 d-flex align-items-center">
																			<div className="numbers">
																				<p className="card-category">Aucune</p>
																				<h4 className="card-title">Dossier</h4>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</>
												)}
											</div>
										</div>

										{nbrPage !== 1 && nbrPage !== 0 && users.length !== 0 ? (
											<>
												<ul className="pageNumbers">
													<li>
														<button
															disabled={currentPage == pages[0] ? true : false}
															onClick={handlePrevbtn}
														>
															Précédent
														</button>
													</li>
													{renderPageNumbers}
													<li>
														<button
															disabled={
																currentPage == pages[pages.length - 1]
																	? true
																	: false
															}
															onClick={handleNextbtn}
														>
															Suivant
														</button>
													</li>
												</ul>
												<br />
											</>
										) : null}
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
