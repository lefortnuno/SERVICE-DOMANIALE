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

const REQUETE_BASE = ` SELECT numeroSousDossier, observationSD, DATE_FORMAT(dateDepotSD, '%d-%m-%Y') as dateDepotSD, mesureAttribuable, prixAttribue, lettreDesistement, planMere, certificatSituationJuridique, p_numeroDossier, p_numeroAffaire FROM SOUS_DOSSIER `;

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
  dbConn.query(REQUETE_BASE` WHERE numeroSousDossier = ?`, id, (err, res) => {
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
        result(null, res);
      }
    }
  );
};

module.exports = SousDossier;
