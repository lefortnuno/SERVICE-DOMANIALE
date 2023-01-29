import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";
import { libraryList, AjoutLibrary } from "../../api/file.js";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import Context from "../../contexts/Context";
import { AccessProcedures } from "../access/accessAll";
import { DrapeauFanjakana } from "../accueil/drapeauGov";

const base = `bureau`;
const URL_DE_BASE = base + `/`;

export default function Bureau() {
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
			} else {
				toast.warning("Vous n'êtes pas autorisé à accéder à cette page!");
			}
		});
	}
	//#endregion

	//#region   //----- MA RECHERCHE -----
	const [contenuTab, setContenuTab] = useState(false);
	function rechercheUtilisateur(event) {
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
			<Context>
				<div className="row">
					<DrapeauFanjakana />
					<AccessProcedures />
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
												<th scope="col">Bureau</th>
												<th scope="col">adresse du Bureau</th>
												{u_info.u_attribut === "Chef" ||
												u_info.u_attribut === "Administrateur" ? (
													<th scope="col" className="text-center">
														Edit
													</th>
												) : null}
											</tr>
										</thead>
										<tbody>
											{contenuTab || users.length !== 0 ? (
												currentItems.map((user, key) => (
													<tr key={key}>
														<th scope="row">{user.idBureau} </th>
														<td>{user.nomBureau}</td>
														<td>{user.adressBureau}</td>
														{u_info.u_attribut === "Chef" ||
														u_info.u_attribut === "Administrateur" ? (
															<td className="text-center">
																<button
																	type="button"
																	className="btn btn-outline-primary btn-sm m-1 waves-effect"
																	variant="default"
																	name="numCompteEdit"
																	onClick={() => showEditModal(user.numCompte)}
																>
																	<BsPencilSquare />
																</button>
															</td>
														) : null}
													</tr>
												))
											) : (
												<tr>
													<td colSpan={7} className="text-danger text-center">
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
													currentPage == pages[pages.length - 1] ? true : false
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
					{/* <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Users Statistics</h4>
                <p className="card-category">Users statistics this month</p>
              </div>
              <div className="card-body">
                <div id="monthlyChart" className="chart chart-pie"></div>
              </div>
            </div>
          </div> */}
				</div>

				{libraryList.forEach((x) => AjoutLibrary(x))}
			</Context>
		</>
	);
}
