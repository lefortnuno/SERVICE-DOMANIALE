// JE N'AI PAS REUSSI A ACTUALISER LES DONNEE ENVOYER EN TEMPS REEL

import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

//#region   //----- MES VARIABLES -----
export let donneeRecherche = [];
export let firstPageBoolean = false;
export let enRecherche = false;

export function setFirstPageTrue() {
	firstPageBoolean = true; 
}

export function setFirstPageFalse() {
	firstPageBoolean = false;
}

export function setDonneeRecherche(data) {
	donneeRecherche.splice(0, donneeRecherche.length);
	donneeRecherche.push(...data); 
}

export function setDonneeRechercheVide() {
	donneeRecherche.splice(0, donneeRecherche.length);
}
//#endregion

export default function SearchContext({ URL_DE_BASE }) {
	const u_info = getDataUtilisateur();

	//#region //------------DONNEE UTILISATEUR------------
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers();
	}, []);

	function getUsers() {
		axios.get(URL_DE_BASE, u_info.opts).then(function (response) {
			if (response.status === 200) {
				setDonneeRecherche(response.data);
			} else {
				toast.warning("Vous n'êtes pas autorisé à accéder à cette page!");
			}
		});
	}
	//#endregion

	//#region   //----- MA RECHERCHE -----
	function rechercheElement(event) {
		const valeur = event.target.value;
		if (!valeur) {
			getUsers();
		} else {
			axios
				.get(URL_DE_BASE + `recherche/${valeur}`, u_info.opts)
				.then((response) => {
					if (response.data.success) {
						setDonneeRecherche(response.data.res);
					} else {
						setDonneeRecherche(response.data.res);
					}
				});
		}
	}
	//#endregion

	return (
		<>
			<form className="navbar-left navbar-form nav-search mr-md-3">
				<div className="input-group">
					<input
						type="text"
						name="searchValue"
						placeholder="Rechercher ...."
						className="form-control"
						autoComplete="off"
						onClick={setFirstPageTrue}
						onChange={rechercheElement}
					/>
					<div className="input-group-append">
						<span className="input-group-text">
							<i className="la la-search search-icon"></i>
						</span>
					</div>
				</div>
			</form>
		</>
	);
}
