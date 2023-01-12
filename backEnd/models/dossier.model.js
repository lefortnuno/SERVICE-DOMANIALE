let dbConn = require("../config/db");

let Dossier = function (dossier) {
	this.numeroDossier = dossier.numeroDossier;
	this.numeroAffaire = dossier.numeroAffaire;
	this.dependance = dossier.dependance;
	this.natureAffectation = dossier.natureAffectation;
	this.empietement = dossier.empietement;
	this.lettreDemande = dossier.lettreDemande;
	this.planAnnexe = dossier.planAnnexe;
	this.pvDelimitation = dossier.pvDelimitation;
	this.superficieTerrain = dossier.superficieTerrain;
	this.dateDemande = dossier.dateDemande;
	this.droitDemande = dossier.droitDemande;
	this.observationDossier = dossier.observationDossier;
	this.p_numeroRequerant = dossier.p_numeroRequerant;
	this.p_numeroProcedure = dossier.p_numeroProcedure;
	this.lettreDesistement = dossier.lettreDesistement;
	this.planMere = dossier.planMere;
	this.certificatSituationJuridique = dossier.certificatSituationJuridique;
	this.labordeLat = dossier.labordeLat;
	this.labordeLong = dossier.labordeLong;
};
const ATTRIBUTS = `
    max(numeroSousDossier) as numeroSousDossier,
    numeroDossier,
    numeroAffaire,
	labordeLat,
	labordeLong,
    dependance,
    empietement,
    natureAffectation,
    lettreDemande,
    planAnnexe,
    pvDelimitation,
    superficieTerrain,
    DATE_FORMAT(dateDemande, '%d-%m-%Y') as dateDemande,
    droitDemande,
    observationDossier,
    p_numeroProcedure,
    nomProcedure,
    observationSD,
    DATE_FORMAT(dateDepotSD, '%d-%m-%Y') as dateDepotSD,
    mesureAttribuable,
    prixAttribue,
    lettreDesistement,
    planMere,
    certificatSituationJuridique,
    p_numeroRequerant,
    etatMorale,
    complementInformation,
    cin,
    nom,
    prenom,
    numeroTelephone `;

const REQUETE_BASE =
	` SELECT ` +
	ATTRIBUTS +
	`
FROM
    DOSSIER,
    SOUS_DOSSIER,
    INDIVIDU,
    REQUERANT,
    PROCEDURES
WHERE
    DOSSIER.numeroAffaire = SOUS_DOSSIER.p_numeroAffaire
    AND INDIVIDU.cin = REQUERANT.p_cin
    AND REQUERANT.numeroRequerant = DOSSIER.p_numeroRequerant
    AND PROCEDURES.numeroProcedure = DOSSIER.p_numeroProcedure `;

const REQUETE_MES_DOSSIERS =
	`SELECT
    max(numeroHisto) as numeroHisto, 
    numeroCompte,
    identification,
    ` +
	ATTRIBUTS +
	`
FROM
    DOSSIER,
    SOUS_DOSSIER,
    INDIVIDU,
    REQUERANT,
    PROCEDURES,
    COMPTE,
    HISTORIQUE
WHERE
    DOSSIER.numeroAffaire = SOUS_DOSSIER.p_numeroAffaire
    AND INDIVIDU.cin = REQUERANT.p_cin
    AND REQUERANT.numeroRequerant = DOSSIER.p_numeroRequerant
    AND PROCEDURES.numeroProcedure = DOSSIER.p_numeroProcedure
    AND HISTORIQUE.h_numeroAffaire = DOSSIER.numeroAffaire
    AND HISTORIQUE.h_numeroDossier = DOSSIER.numeroDossier
    AND HISTORIQUE.h_numeroProcedure = PROCEDURES.numeroProcedure
    AND HISTORIQUE.p_numeroCompte = COMPTE.numeroCompte
    AND (numeroCompte = ? AND identification = ?) `;

const REQUETE_NOUVELLE_DEMANDE = REQUETE_BASE + ` AND p_numeroProcedure=1 `;
const GROUP_BY = ` GROUP BY numeroAffaire `;
const ORDER_BY = ` ORDER BY numeroDossier DESC `;

Dossier.addDossier = (newDossier, result) => {
	dbConn.query("INSERT INTO dossier SET ?", newDossier, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, { success: true, message: "Ajout reussi !" });
		}
	});
};

Dossier.getAllDossiers = (result) => {
	dbConn.query(REQUETE_BASE + GROUP_BY + ORDER_BY, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Dossier.getMesDossiers = (valeur, result) => {
	dbConn.query(
		REQUETE_MES_DOSSIERS + GROUP_BY + ORDER_BY,
		[valeur.numeroCompte, valeur.identification],
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				result(null, res);
			}
		}
	);
};

Dossier.getDossiersNouvelleDemande = (result) => {
	dbConn.query(REQUETE_NOUVELLE_DEMANDE + GROUP_BY + ORDER_BY, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Dossier.getDerniereDossier = (result) => {
	dbConn.query(`SELECT * FROM DOSSIER ` + ORDER_BY + ` LIMIT 1`, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Dossier.getLastIdNumeroDossier = (result) => {
	dbConn.query(
		"SELECT numeroDossier FROM dossier ORDER BY numeroDossier DESC LIMIT 1",
		(err, resLastID) => {
			if (!err) {
				/*
      RECUPERATION DE LA DERNIERE ID + INCREMENTATION ET ENREGISTREMENENT NEW AUTO_NUMERO_IM
    */
				let id = 0;
				if (resLastID.length === 0) {
					id = 1;
				} else {
					const tmpID = Object.values(resLastID);
					id = Object.values(tmpID[0]);
					id = id[0] + 1;
				}
				return result(null, id);
			}
		}
	);
};

Dossier.getIdDossier = (id, result) => {
	dbConn.query(REQUETE_BASE + " AND numeroDossier = ?", id, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			if (res.length !== 0) {
				result(null, res);
			} else {
				result(null, null);
			}
		}
	});
};

Dossier.getHistoDossier = (id, result) => {
	dbConn.query(
		REQUETE_BASE + " AND numeroDossier = ?" + GROUP_BY,
		id,
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				if (res.length !== 0) {
					result(null, res);
				} else {
					result(null, null);
				}
			}
		}
	);
};

Dossier.getDossierRequerant = (id, result) => {
	dbConn.query(REQUETE_BASE + " AND p_numeroRequerant = ?", id, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			if (res.length !== 0) {
				result(null, res);
			} else {
				result(null, null);
			}
		}
	});
};

Dossier.getNumDossier = (numeroAffaire, result) => {
	dbConn.query(
		" select numeroAffaire from dossier where numeroAffaire = ?",
		numeroAffaire,
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				if (res.length !== 0) {
					result(null, res);
				} else {
					result(null, null);
				}
			}
		}
	);
};

Dossier.updateDossier = (updateDossier, id, result) => {
	dbConn.query(
		`update dossier set ? where numeroDossier = ${id}`,
		updateDossier,
		function (err, res) {
			if (err) {
				result(err, null);
			} else {
				result(null, res);
			}
		}
	);
};

Dossier.updateDossierProcedureByNumAffaire = (updateDossier, id, result) => {
	dbConn.query(
		`update dossier set ? where numeroAffaire = '${id}'`,
		updateDossier,
		function (err, res) {
			if (err) {
				result(err, null);
			} else {
				result(null, { success: true });
			}
		}
	);
};

Dossier.searchDossier = (valeur, result) => {
	dbConn.query(
		REQUETE_BASE +
			` AND ( numeroAffaire LIKE '%${valeur}%' OR p_cin LIKE '%${valeur}%' OR nom LIKE '%${valeur}%')` +
			GROUP_BY +
			ORDER_BY,
		valeur,
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

Dossier.searchMonDossier = (valeur, result) => {
	dbConn.query(
		REQUETE_MES_DOSSIERS +
			` AND ( numeroAffaire LIKE '%${valeur.value}%' OR p_cin LIKE '%${valeur.value}%' OR nom LIKE '%${valeur.value}%')` +
			GROUP_BY +
			ORDER_BY,
		[valeur.numeroCompte, valeur.identification],
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

module.exports = Dossier;
