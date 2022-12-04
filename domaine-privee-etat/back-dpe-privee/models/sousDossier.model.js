let dbConn = require("../config/db");
let Dossier = require("./dossier.model");

let SousDossier = function (sousDossier) {
  this.numSousDossier = sousDossier.numSousDossier;
  this.numAffaire = sousDossier.numAffaire;
  this.obseravation_S_D = sousDossier.obseravation_S_D;
  this.dateDepot_S_D = sousDossier.dateDepot_S_D;
  this.mesureAttribuable = sousDossier.mesureAttribuable;
  this.prixAttribuable = sousDossier.prixAttribuable;
  this.lettreDesistement = sousDossier.lettreDesistement;
  this.planMere = sousDossier.planMere;
  this.certificatSituationJuridique = sousDossier.certificatSituationJuridique;
};

SousDossier.addSousDossier = (newSousDossier, result) => {
  Dossier.getIdDossier(
    newSousDossier.numAffaire,
    (err, resNumAffaireDossier) => {
      if (resNumAffaireDossier) {
        dbConn.query(
          "INSERT INTO SOUS_DOSSIER SET ?",
          newSousDossier,
          (err, res) => {
            if (err) {
              result(err, null);
            } else {
              result(null, res);
            }
          }
        );
      } else {
        result(null, { message: "Dossier Mere non trouver ! Inconnu !" });
      }
    }
  );
};

SousDossier.addSousDossierNewDemande = (newSousDossier) => {
  Dossier.getNumDossier(
    newSousDossier.numAffaire,
    (err, resNumAffaireDossier) => {
      if(err){
        console.log("err SOUS DOSSIER : ", err);
      } {
        if (resNumAffaireDossier) {
          dbConn.query("INSERT INTO SOUS_DOSSIER SET ?", newSousDossier);
        } else {
          return { message: "Dossier Mere non trouver ! Inconnu !" };
        }
      }
    }
  );
};

SousDossier.getAllSousDossiersOfDossier = (id, result) => {
  dbConn.query(
    "SELECT * FROM SOUS_DOSSIER where numAffaire = ?",
    id,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

SousDossier.getIdSousDossier = (id, result) => {
  dbConn.query(
    "SELECT * FROM SOUS_DOSSIER WHERE numSousDossier = ?",
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
    `UPDATE sous_dossier SET ? WHERE numSousDossier = ${id}`,
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
