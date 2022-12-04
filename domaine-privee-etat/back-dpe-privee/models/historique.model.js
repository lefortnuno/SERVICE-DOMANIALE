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
  this.accomplissement = historique.accomplissement;
  this.observation = historique.observation;
  this.numAffaire = historique.numAffaire;
  this.numCompte = historique.numCompte;
};

const REQUETE_BASE = `SELECT numHisto, mouvement, dateMouvement, dateRDV, dispoDossier, approbation, observation, accomplissement, DOSSIER.numAffaire, dependance, natureAffectation, empietement, lettreDemande, planAnnexe, pvDelimitation, superficieTerrain,DATE_FORMAT(dateDemande, '%d-%m-%Y') as dateDemande, droitDemande, observationDossier, REQUERANT.numeroRequerant, etatMorale, PROCEDURES.numProcedure, nomProcedure, natureProcedure, movProcedure, DATE_FORMAT(dateRDV, '%d-%m-%Y') as dateRDV, COMPTE.numCompte, identification, INDIVIDU.cin, nom, prenom, BUREAU.idBureau, nomBureau, adressBureau, SOUS_DOSSIER.numSousDossier, obseravation_S_D, DATE_FORMAT(dateDepot_S_D, '%d-%m-%Y') as dateDepot_S_D, mesureAttribuable, prixAttribue, lettreDesistement, planMere,certificatSituationJuridique FROM HISTORIQUE, INDIVIDU, REQUERANT, COMPTE, BUREAU, PROCEDURES, SOUS_DOSSIER, DOSSIER WHERE HISTORIQUE.numAffaire = DOSSIER.numAffaire AND  HISTORIQUE.numCompte = COMPTE.numCompte AND DOSSIER.numeroRequerant = REQUERANT.numeroRequerant AND DOSSIER.numAffaire = SOUS_DOSSIER.numAffaire AND DOSSIER.numProcedure = PROCEDURES.numProcedure AND INDIVIDU.cin = REQUERANT.cin AND BUREAU.idBureau = PROCEDURES.idBureau `;

const ORDER_BY = ` ORDER BY numHisto DESC `;

Historique.addHistorique = (newHistorique, result) => {
  dbConn.query("INSERT INTO Historique SET ?", newHistorique, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      console.log(res);
      result(null, {success: true});
    }
  });
};

Historique.addHistoNewDemande = (newHistorique) => {
  dbConn.query("INSERT INTO HISTORIQUE SET ?", newHistorique);
};

Historique.getAllHistoriques = (result) => {
  dbConn.query(REQUETE_BASE + ORDER_BY, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Historique.getCahierInterne = (result) => {
  dbConn.query(
    REQUETE_BASE +
      `AND ( mouvement = 'Interne' AND dispoDossier = 1 ) ` +
      ORDER_BY,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Historique.getCahierArriver = (result) => {
  dbConn.query(
    REQUETE_BASE +
      `AND ( mouvement = 'arriver' AND dispoDossier = 1 ) ` +
      ORDER_BY,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Historique.getCahierDepart = (result) => {
  dbConn.query(
    REQUETE_BASE +
      `AND ( mouvement = 'depart' AND dispoDossier = 0 ) ` +
      ORDER_BY,
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
    REQUETE_BASE + ` AND HISTORIQUE.numHisto = ?`,
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
  dbConn.query(
    REQUETE_BASE +
      ` AND (Dossier.numAffaire LIKE '%${valeur}%' OR INDIVIDU.cin LIKE '%${valeur}%'  OR INDIVIDU.nom LIKE '%${valeur}%'  OR INDIVIDU.prenom LIKE '%${valeur}%' )` +
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

Historique.updateHistorique = (updateHistorique, id, result) => {
  dbConn.query(
    `update Historique set ? where numHisto = ${id}`,
    updateHistorique,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, {success: true});
      }
    }
  );
};

module.exports = Historique;
