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

const REQUETE_DECOMPTE = `
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

    FORMAT((prixAttribue * mesureAttribuable * 10000), 0, 'de_DE') as PT,
    FORMAT(
        (((prixAttribue * mesureAttribuable * 10000) * 5) / 100),
        0,
        'de_DE'
    ) as FCD,
    FORMAT(
        ((prixAttribue * mesureAttribuable * 10000) + (((prixAttribue * mesureAttribuable * 10000) * 5) / 100)),
        0,
        'de_DE'
    ) as PT_TTL,

    15000 as DF,
    FORMAT(
        (((prixAttribue * mesureAttribuable * 10000) * 2) / 100),
        0,
        'de_DE'
    ) as DP,
    25000 as Acc,
    5000 as Bord,

    FORMAT(
        (
            (
                (prixAttribue * mesureAttribuable * 10000) + ((prixAttribue * mesureAttribuable * 100000) * 5) / 100
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

const ORDER_BY = ` ORDER BY numeroSousDossier DESC `;

const REQUETE_PREVISA = `
SELECT
    count(p_numeroDossier) as attentePreVISA,
    max(p_numeroDossier) as p_numeroDossier, 
    numeroSousDossier,
    observationSD,
    SUM(DATEDIFF(NOW(), dateDepotSD)) as nombreJour,
    DATE_FORMAT(dateDepotSD, '%d-%m-%Y') as dateDepotSD,
    mesureAttribuable,
    lettreDesistement,
    planMere,
    certificatSituationJuridique,
    VISA,
    preVISA,
    p_numeroAffaire,
    prixAttribue
FROM
    SOUS_DOSSIER 
WHERE 
    preVisa = 0
GROUP BY p_numeroDossier  ORDER BY p_numeroDossier ASC `

const REQUETE_VISA = `
SELECT
    count(p_numeroDossier) as attenteVISA,
    max(p_numeroDossier) as p_numeroDossier, 
    numeroSousDossier,
    observationSD,
    SUM(DATEDIFF(NOW(), dateDepotSD)) as nombreJour,
    DATE_FORMAT(dateDepotSD, '%d-%m-%Y') as dateDepotSD,
    mesureAttribuable,
    lettreDesistement,
    planMere,
    certificatSituationJuridique,
    VISA,
    preVISA,
    p_numeroAffaire,
    prixAttribue
FROM
    SOUS_DOSSIER 
WHERE 
    Visa = 0
GROUP BY p_numeroDossier ORDER BY p_numeroDossier ASC `


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

SousDossier.getAllAttenteVISA = (id, result) => {
	dbConn.query(REQUETE_VISA, id, (err, res) => {
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
				result(null, {success: true});
			}
		}
	);
};

module.exports = SousDossier;
