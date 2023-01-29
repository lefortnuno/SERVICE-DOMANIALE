let dbConn = require("../config/db");

//#region IDENTATION DE CODE
//#endregion

let Utilisateur = function (utilisateur) {
	this.numeroCompte = utilisateur.numeroCompte;
	this.identification = utilisateur.identification;
	this.photoPDP = utilisateur.photoPDP;
	this.attribut = utilisateur.attribut;
	this.mdp = utilisateur.mdp;
	this.statu = utilisateur.statu;
	this.unite = utilisateur.unite;
	this.u_cin = utilisateur.u_cin;
};

const REQUETE_ADVANCER = `SELECT numeroCompte, identification, photoPDP, attribut, mdp, statu, unite, u_cin, nom, prenom FROM compte, individu WHERE compte.u_cin = individu.cin `;
const ORDER_BY = ` ORDER BY numeroCompte DESC `;

const NOTIFICATION_COMPTE = `SELECT count(numeroCompte) as attenteActivation FROM COMPTE WHERE statu = 0 `;

Utilisateur.addUtilisateur = (newUtilisateur, result) => {
	dbConn.query("INSERT INTO compte SET ?", newUtilisateur, (err, res) => {
		if (!err) {
			result(null, { success: true, message: "Ajout reussi !" });
		} else {
			result(err, null);
		}
	});
};

Utilisateur.loginUtilisateur = (values, result) => {
	const requete = ` AND (identification=? AND statu=1)`;
	dbConn.query(
		REQUETE_ADVANCER + requete,
		[values.identification, values.mdp],
		(err, res) => {
			if (!err) {
				result(null, res);
			} else {
				result(err, null);
			}
		}
	);
};

Utilisateur.getAllUtilisateurs = (result) => {
	dbConn.query(REQUETE_ADVANCER + ORDER_BY, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Utilisateur.getAttenteActivation = (result) => {
	dbConn.query(NOTIFICATION_COMPTE, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Utilisateur.getAllAttenteActivation = (result) => {
	dbConn.query(REQUETE_ADVANCER + ` AND statu = 0 ` + ORDER_BY, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Utilisateur.getLastIdUtilisateurs = (result) => {
	dbConn.query(
		`SELECT numeroCompte FROM compte ` + ORDER_BY + `LIMIT 1`,
		(err, res) => {
			if (err) {
				return result(err, null);
			} else {
				let id = 0;
				if (res.length === 0) {
					id = 1;
				} else {
					const tmpID = Object.values(res);
					id = Object.values(tmpID[0]);
					id = id[0] + 1;
				}
				return result(null, id);
			}
		}
	);
};

Utilisateur.getLastNumeroCompteUtilisateur = (result) => {
	dbConn.query(
		`SELECT numeroCompte FROM compte ` + ORDER_BY + `LIMIT 1`,
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				let id = 0;
				if (res.length === 0) {
					id = 1;
				} else {
					const tmpID = Object.values(res);
					id = Object.values(tmpID[0]);
					id = id[0] + 1;
				}
				result(null, { numeroCompte: id });
			}
		}
	);
};

Utilisateur.getIdUtilisateur = (numeroCompte, result) => {
	dbConn.query(
		REQUETE_ADVANCER + ` AND numeroCompte = ?`,
		numeroCompte,
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				if (res.length !== 0) {
					result(null, res);
				} else {
					result(null, res);
				}
			}
		}
	);
};

Utilisateur.searchUtilisateurByParams = (valeur, result) => {
	dbConn.query(
		REQUETE_ADVANCER +
			`AND (identification LIKE '%${valeur}%' OR nom LIKE '%${valeur}%' OR prenom LIKE '%${valeur}%')` +
			ORDER_BY,
		(err, res) => {
			if (err) {
				result({ err, message: "erreur !", success: false }, null);
			} else {
				if (res.length !== 0) {
					result(null, { res, message: "trouvable !", success: true });
				} else {
					result(null, { res, message: "Introuvable !", success: false });
				}
			}
		}
	);
};

Utilisateur.updateUtilisateur = (newUtilisateur, numeroCompte, result) => {
	dbConn.query(
		`UPDATE compte SET ? WHERE numeroCompte = ${numeroCompte}`,
		newUtilisateur,
		function (err, res) {
			if (err) {
				result(err, null);
			} else {
				result(null, { success: true, message: "Reussi" });
			}
		}
	);
};

Utilisateur.deleteUtilisateur = (numeroCompte, result) => {
	Utilisateur.getIdUtilisateur(numeroCompte, (err, resAttribut) => {
		if (
			resAttribut &&
			(resAttribut[0].attribut === "client" ||
				resAttribut[0].attribut === "utilisateur")
		) {
			dbConn.query(
				`DELETE FROM compte WHERE numeroCompte = ${numeroCompte}`,
				function (err, res) {
					if (err) {
						result(err, null);
					} else {
						result(null, { success: true });
					}
				}
			);
		} else {
			result(null, {
				success: false,
				message: `Echec Suppression! attribut du compte: ${resAttribut[0].attribut}`,
			});
		}
	});
};

module.exports = Utilisateur;
