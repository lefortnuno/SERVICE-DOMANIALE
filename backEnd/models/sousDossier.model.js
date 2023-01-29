let dbConn = require("../config/db");

let SousDossier = function (sousDossier) {
	this.numeroSousDossier = sousDossier.numeroSousDossier;
	this.p_numeroAffaire = sousDossier.p_numeroAffaire;
	this.p_numeroDossier = sousDossier.p_numeroDossier;
	this.observationSD = sousDossier.observationSD;
	this.dateDepotSD = sousDossier.dateDepotSD;
	this.mesureAttribuable = sousDossier.mesureAttribuable;
	this.prixAttribue = sousDossier.prixAttribue;
	this.lettreDesistement = sousDossier.lettreDesistement;
	this.planMere = sousDossier.planMere;
	this.VISA = sousDossier.VISA;
	this.preVISA = sousDossier.preVISA;
	this.certificatSituationJuridique = sousDossier.certificatSituationJuridique;
};

const CHIIFRE_CA = `100`;
const ORDER_BY = ` ORDER BY numeroSousDossier DESC `;

//#region //
const ATTRIBUES = `
    numeroSousDossier,
    observationSD,
    mesureAttribuable,
    lettreDesistement,
    planMere,
    certificatSituationJuridique,
    VISA,
    preVISA,
    p_numeroAffaire,
    prixAttribue `;
//#endregion

//#region // REQUETE_BASE
const REQUETE_BASE = `
SELECT
    numeroSousDossier,
    observationSD,
    DATE_FORMAT(dateDepotSD, '%d-%m-%Y') as dateDepotSD,
    mesureAttribuable,
    lettreDesistement,
    planMere,
    certificatSituationJuridique,
    VISA,
    preVISA,
    p_numeroDossier,
    p_numeroAffaire,
    prixAttribue
FROM SOUS_DOSSIER `;
//#endregion

//#region //
const REQUETE_DECOMPTE =
	`
SELECT
    numeroSousDossier,
    observationSD,
    DATE_FORMAT(dateDepotSD, '%d-%m-%Y') as dateDepotSD,
    mesureAttribuable,
    lettreDesistement,
    planMere,
    certificatSituationJuridique,
    VISA,
    preVISA,
    p_numeroDossier,
    p_numeroAffaire,
    prixAttribue,

    FORMAT((prixAttribue * mesureAttribuable * ` +
	CHIIFRE_CA +
	`), 0, 'de_DE') as PT,
    FORMAT(
        (((prixAttribue * mesureAttribuable * ` +
	CHIIFRE_CA +
	`) * 5) / 100),
        0,
        'de_DE'
    ) as FCD,
    FORMAT(
        ((prixAttribue * mesureAttribuable * ` +
	CHIIFRE_CA +
	`) + (((prixAttribue * mesureAttribuable * ` +
	CHIIFRE_CA +
	`) * 5) / 100)),
        0,
        'de_DE'
    ) as PT_TTL,

    15000 as DF,
    FORMAT(
        (((prixAttribue * mesureAttribuable * ` +
	CHIIFRE_CA +
	`) * 2) / 100),
        0,
        'de_DE'
    ) as DP,
    25000 as Acc,
    5000 as Bord,

    FORMAT(
        (
            (
                (prixAttribue * mesureAttribuable * ` +
	CHIIFRE_CA +
	`) + ((prixAttribue * mesureAttribuable * ` +
	CHIIFRE_CA +
	`) * 5) / 100
            ) + 75000
        ),
        0,
        'de_DE'
    ) as prixTerrain
    
FROM
    SOUS_DOSSIER
WHERE
    p_numerodossier = ?
ORDER BY
    numeroSousDossier DESC
LIMIT
    1 `;

//#region //
const REQUETE_PREVISA =
	`
SELECT
    count(p_numeroDossier) as attentePreVISA,
    max(p_numeroDossier) as p_numeroDossier,
    SUM(DATEDIFF(NOW(), dateDepotSD)) as nombreJour,
    DATE_FORMAT(dateDepotSD, '%d-%m-%Y') as dateDepotSD, ` +
	ATTRIBUES +
	`
FROM
    SOUS_DOSSIER,
    DOSSIER
WHERE
    DOSSIER.numeroDossier = SOUS_DOSSIER.p_numeroDossier
    AND DOSSIER.numeroAffaire = SOUS_DOSSIER.p_numeroAffaire
    AND (preVisa = 0 AND p_numeroProcedure = 1)
GROUP BY
    p_numeroDossier
ORDER BY
    p_numeroDossier ASC `;

const NBR_PRE_VISA = `
SELECT
    count(p_numeroDossier) as isaPreVisa,
    SUM(DATEDIFF(NOW(), dateDepotSD)) as nombreJour
FROM
    SOUS_DOSSIER,
    DOSSIER
WHERE
    DOSSIER.numeroDossier = SOUS_DOSSIER.p_numeroDossier
    AND DOSSIER.numeroAffaire = SOUS_DOSSIER.p_numeroAffaire
    AND (
        preVisa = 0
        AND p_numeroProcedure = 1
    )
GROUP BY
    p_numeroDossier
ORDER BY
    p_numeroDossier ASC
`;
//#endregion

//#region //
const REQUETE_VISA =
	`
SELECT
    count(p_numeroDossier) as attenteVISA,
    max(p_numeroDossier) as p_numeroDossier, 
    SUM(DATEDIFF(NOW(), dateDepotSD)) as nombreJour,
    DATE_FORMAT(dateDepotSD, '%d-%m-%Y') as dateDepotSD, ` +
	ATTRIBUES +
	`
FROM
    SOUS_DOSSIER,
    DOSSIER
WHERE
    DOSSIER.numeroDossier = SOUS_DOSSIER.p_numeroDossier
    AND DOSSIER.numeroAffaire = SOUS_DOSSIER.p_numeroAffaire
    AND (Visa = 0 AND p_numeroProcedure = 10)
GROUP BY p_numeroDossier ORDER BY p_numeroDossier ASC `;

const NBR_VISA = `
SELECT
    count(p_numeroDossier) as isaVisa,
    SUM(DATEDIFF(NOW(), dateDepotSD)) as nombreJour
FROM
    SOUS_DOSSIER,
    DOSSIER
WHERE
    DOSSIER.numeroDossier = SOUS_DOSSIER.p_numeroDossier
    AND DOSSIER.numeroAffaire = SOUS_DOSSIER.p_numeroAffaire
    AND (
        Visa = 0
        AND p_numeroProcedure = 10
    )
GROUP BY
    p_numeroDossier
ORDER BY
    p_numeroDossier ASC
`;
//#endregion

SousDossier.addSousDossier = (newSousDossier, result) => {
	dbConn.query("INSERT INTO SOUS_DOSSIER SET ?", newSousDossier, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, { success: true });
		}
	});
};

SousDossier.addSousDossierNewDemande = (newSousDossier) => {
	dbConn.query("INSERT INTO SOUS_DOSSIER SET ?", newSousDossier);
};

SousDossier.getAllSousDossiersOfDossier = (id, result) => {
	dbConn.query(REQUETE_BASE` WHERE p_numeroDossier = ?`, id, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

SousDossier.getAllAttentePREVISA = (id, result) => {
	dbConn.query(REQUETE_PREVISA, id, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

SousDossier.getNbAttentePREVISA = (id, result) => {
	dbConn.query(NBR_PRE_VISA, id, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

SousDossier.getAllAttenteVISA = (id, result) => {
	dbConn.query(REQUETE_VISA, id, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

SousDossier.getNbAttenteVISA = (id, result) => {
	dbConn.query(NBR_VISA, id, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

SousDossier.getIdSousDossier = (id, result) => {
	dbConn.query(
		REQUETE_BASE + ` WHERE numeroSousDossier = ?` + ORDER_BY + ` LIMIT 1 `,
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

SousDossier.getLastSousDossierOfDossier = (id, result) => {
	dbConn.query(
		REQUETE_BASE + ` WHERE p_numerodossier = ?` + ORDER_BY + ` LIMIT 1 `,
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

SousDossier.getDecompte = (id, result) => {
	dbConn.query(REQUETE_DECOMPTE, id, (err, res) => {
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

SousDossier.updateSousDossier = (updateSousDossier, id, result) => {
	dbConn.query(
		`UPDATE sous_dossier SET ? WHERE  numeroSousDossier = ${id}`,
		updateSousDossier,
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				result(null, { success: true });
			}
		}
	);
};

module.exports = SousDossier;
