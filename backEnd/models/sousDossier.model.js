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
p_numeroDossier,
p_numeroAffaire,
prixAttribue
FROM
SOUS_DOSSIER `;

const REQUETE_DECOMPTE = `
SELECT
    numeroSousDossier,
    observationSD,
    DATE_FORMAT(dateDepotSD, '%d-%m-%Y') as dateDepotSD,
    mesureAttribuable,
    lettreDesistement,
    planMere,
    certificatSituationJuridique,
    p_numeroDossier,
    p_numeroAffaire,
    prixAttribue,

    FORMAT((prixAttribue * mesureAttribuable), 0, 'de_DE') as PT,
    FORMAT(
        (((prixAttribue * mesureAttribuable) * 5) / 100),
        0,
        'de_DE'
    ) as FCD,

    1 as DF,
    FORMAT(
        (((prixAttribue * mesureAttribuable) * 2) / 100),
        0,
        'de_DE'
    ) as DP,
    25000 as Acc,
    5000 as Bordereau,

    FORMAT(
        (
            (
                (prixAttribue * mesureAttribuable) + ((prixAttribue * mesureAttribuable) * 5) / 100
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
    1 `

const ORDER_BY = ` ORDER BY numeroSousDossier DESC `;

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

SousDossier.getIdSousDossier = (id, result) => {
  dbConn.query(
    REQUETE_BASE + ` WHERE  numeroSousDossier = ?` + ORDER_BY + ` LIMIT 1 `,
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
  dbConn.query(
    REQUETE_DECOMPTE,
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

SousDossier.updateSousDossier = (updateSousDossier, id, result) => {
  dbConn.query(
    `UPDATE sous_dossier SET ? WHERE  numeroSousDossier = ${id}`,
    updateSousDossier,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = SousDossier;
