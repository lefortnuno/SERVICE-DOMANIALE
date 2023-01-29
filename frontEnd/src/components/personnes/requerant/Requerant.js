import axios from "../../../api/axios";
import getDataUtilisateur from "../../../api/udata";
import { libraryList, AjoutLibrary } from "../../../api/file.js";

import HeaderContext from "../../../contexts/header/header.context";
import FooterContext from "../../../contexts/footer/footer.context";
import SidebarContext from "../../../contexts/sidebar/sidebar.context";
import ModalEdition from "./ModalEdit";
import DeleteConfirmation from "../../../contexts/ModalSuppr";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
	PersoIndividu,
	PersoUtilisateur,
	NouveauPersoRequerant,
} from "../perso";

import { BsFillTrashFill, BsPencilSquare, BsEye } from "react-icons/bs";

const base = `requérant`;
const URL_DE_BASE = `requerant/`;

export default function Requerant() {
	const navigate = useNavigate();
	const u_info = getDataUtilisateur();

	//#region //------------DONNEE UTILISATEUR------------
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers();
	}, []);

	function getUsers() {
		axios.get(URL_DE_BASE, u_info.opts).then(function (response) {
			if (response.status === 200) {
				setUsers(response.data);
				console.log(response.data);
			} else {
				toast.warning("Vous n'êtes pas autorisé à accéder à cette page!");
			}
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
		getUsers();
		setShowEdit(false);
	};
	//#endregion

	//#region //------------MODAL DELETE UTILISATEUR------------
	const [id, setId] = useState(null);
	const [displayConfirmationModal, setDisplayConfirmationModal] =
		useState(false);
	const [deleteMessage, setDeleteMessage] = useState(null);
	const showDeleteModal = (id) => {
		setId(id);
		setDeleteMessage(
			`Etes vous sûre de vouloir supprimer le requerant N°${
				users.find((x) => x.numeroRequerant === id).numeroRequerant
			} 
      ${users.find((x) => x.numeroRequerant === id).nom} 
      ${
				users.find((x) => x.numeroRequerant === id).prenom
			} definitivement de notre base de donnée ?`
		);
		setDisplayConfirmationModal(true);
	};

	const hideConfirmationModal = () => {
		setDisplayConfirmationModal(false);
	};

	const submitDelete = (id) => {
		axios.delete(URL_DE_BASE + `${id}`, u_info.opts).then(function (response) {
			getUsers();
			setDisplayConfirmationModal(false);

			if (response.data.success) {
				toast.success("Suppression Reussi.");
			} else if (response.data.errno === 1451) {
				toast.error(
					"Suppression non effectuer ! Le requerant possede des dossiers !"
				);
			} else {
				toast.error("Echec de la suppression!");
			}
		});
	};
	//#endregion

	//#region   //----- MA RECHERCHE -----
	const [contenuTab, setContenuTab] = useState(false);
	function rechercheElement(event) {
		const valeur = event.target.value;
		if (!valeur) {
			getUsers();
			setContenuTab(true);
		} else {
			axios
				.get(URL_DE_BASE + `recherche/${valeur}`, u_info.opts)
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
	const [itemsPerPage, setItemsPerPage] = useState(5);

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

				<ModalEdition showEdit={showEdit} onHide={closeEditModal}>
					{numCompteEdit}
				</ModalEdition>

				<DeleteConfirmation
					showModal={displayConfirmationModal}
					confirmModal={submitDelete}
					hideModal={hideConfirmationModal}
					id={id}
					message={deleteMessage}
				/>

				<div className="main-panel">
					<div className="content">
						<div className="container-fluid">
							<div className="row">
								<PersoIndividu />

								{u_info.u_attribut === "Chef" ||
								u_info.u_attribut === "Chef Adjoint" ||
								u_info.u_attribut === "Administrateur" ? (
									<PersoUtilisateur />
								) : null}

								<NouveauPersoRequerant />
							</div>

							<div className="row">
								<div className="col-md-12">
									<div className="card">
										<div className="card-header ">
											<h4 className="card-title">Liste des {base}s</h4>
										</div>
										<div className="card-body">
											<div className="table-responsive text-nowrap">
												<table className="table table-striped w-auto">
													<thead>
														<tr>
															<th scope="col">#</th>
															<th scope="col">Numéro_CIN</th>
															<th scope="col">Nom et Prénom</th>
															<th scope="col">Moralité_Requérant</th>
															<th scope="col">Téléphone</th>
															<th scope="col">Information_complémentaire</th>
															<th scope="col" className="text-center">
																Modifier
															</th>
															{u_info.u_attribut === "Chef" ||
															u_info.u_attribut === "Administrateur" ? (
																<th scope="col" className="text-center">
																	Supprimer
																</th>
															) : null}
														</tr>
													</thead>
													<tbody>
														{contenuTab || users.length !== 0 ? (
															currentItems.map((user, key) => (
																<tr key={key}>
																	<th scope="row">{user.numeroRequerant} </th>
																	<td>{user.p_cin}</td>
																	<td>
																		{user.nom} {user.prenom}
																	</td>
																	<td>
																		{user.etatMorale === 1 ? (
																			<>Personne morale</>
																		) : (
																			<>Personne normale</>
																		)}
																	</td>
																	<td>0{user.numeroTelephone}</td>
																	<td>{user.complementInformation}</td>

																	<td className="text-center">
																		<button
																			type="button"
																			className="btn btn-outline-primary btn-sm m-1 waves-effect"
																			variant="default"
																			name="numCompteEdit"
																			onClick={() =>
																				showEditModal(user.numeroRequerant)
																			}
																		>
																			<BsPencilSquare />
																		</button>
																	</td>

																	{u_info.u_attribut === "Chef" ||
																	u_info.u_attribut === "Chef Adjoint" ||
																	u_info.u_attribut === "Administrateur" ? (
																		<td className="text-center">
																			<button
																				type="button"
																				className="btn btn-outline-danger btn-sm m-1 waves-effect"
																				variant="default"
																				onClick={() =>
																					showDeleteModal(user.numeroRequerant)
																				}
																			>
																				<BsFillTrashFill />
																			</button>
																		</td>
																	) : null}
																</tr>
															))
														) : (
															<tr>
																<td
																	colSpan={10}
																	className="text-danger text-center"
																>
																	La liste est vide ....
																</td>
															</tr>
														)}
													</tbody>
												</table>
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
