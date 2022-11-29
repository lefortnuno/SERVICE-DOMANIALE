let dbConn = require("../config/db");
const Dossier = require("./dossier.model");
const Compte = require("./utilisateur.model");

const Historique = function (historique) {
  this.numHisto = historique.numHisto;
  this.mouvement = historique.mouvement;
  this.dateMouvement = historique.dateMouvement;
  this.dateRDV = historique.dateRDV;
  this.dispoDossier = historique.dispoDossier;
  this.approbation = historique.approbation;
  this.Observation = historique.Observation;
  this.numAffaire = historique.numAffaire;
  this.numCompte = historique.numCompte;
  this.numProcedure = historique.numProcedure;
};

Historique.addHistorique = (newHistorique, result) => {
  Dossier.getNumDossier(newHistorique.numAffaire, (err, resDossier) => {
    Compte.getIdUtilisateur(newHistorique.numCompte, (err, resCompte) => {
      if (resDossier && resCompte) {
        dbConn.query(
          "INSERT INTO Historique SET ?",
          newHistorique,
          (err, res) => {
            if (err) {
              result(err, null);
            } else {
              result(null, res);
            }
          }
        );
      } else if (resDossier && !resCompte) {
        result(null, { message: "Compte introuvable ! inconnu" });
      } else if (!resDossier && resCompte) {
        result(null, { message: "Dossier introuvable ! inconnu" });
      } else {
        result(null, { message: "Dossier et Compte introuvable ! inconnu" });
      }
    });
  });
};

Historique.addHistoNewDemande = (newHistorique) => {
  Dossier.getNumDossier(
    newHistorique.numAffaire,
    (err, resNumAffaireDossier) => {
      if (resNumAffaireDossier) {
        dbConn.query("INSERT INTO HISTORIQUE SET ?", newHistorique);
      } else {
        return { message: "Dossier Mere non trouver ! Inconnu !" };
      }
    }
  );
};


Historique.getAllHistoriques = (result) => {
  dbConn.query(
    "SELECT * FROM Historique ORDER BY numHisto DESC",
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Historique.getIdHistorique = (id, result) => {
  dbConn.query(
    "SELECT * FROM historique WHERE numHisto = ?",
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

Historique.searchHistorique = (valeur, result) => {

  let req = `select * from Historique, dossier where dossier.numAffaire=historique.numAffaire AND dossier.numAffaire LIKE '%${valeur.numAffaire}%' ORDER BY numHisto DESC`;

  if (valeur.checkBoxDepart) {
    req = `select * from Historique where mouvement = 'depart' ORDER BY numHisto DESC`;
  }
  if (valeur.checkBoxArriver) {
    req = `select * from Historique where mouvement = 'arriver' ORDER BY numHisto DESC`;
  }
  if (valeur.checkBoxDepart && valeur.numAffaire) {
    req = `select * from Historique, dossier where dossier.numAffaire=historique.numAffaire AND dossier.numAffaire LIKE '%${valeur.numAffaire}%' AND mouvement = 'depart' ORDER BY numHisto DESC`;
  } else if (valeur.numAffaire && valeur.checkBoxArriver) {
    req = `select * from Historique, dossier where dossier.numAffaire=historique.numAffaire AND dossier.numAffaire LIKE '%${valeur.numAffaire}%' AND mouvement = 'arriver' ORDER BY numHisto DESC`;
  }

  dbConn.query(req, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Historique.updateHistorique = (updateHistorique, id, result) => {
  dbConn.query(
    `update Historique set ? where numHisto = ${id}`,
    updateHistorique,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Historique;
