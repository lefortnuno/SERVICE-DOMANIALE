let dbConn = require("../config/db");

const Historique = function (historique) {
  this.numeroHisto = historique.numeroHisto;
  this.mouvement = historique.mouvement;
  this.dateDebutMouvement = historique.dateDebutMouvement;
  this.dateFinMouvement = historique.dateFinMouvement;
  this.dateRDV = historique.dateRDV;
  this.dispoDossier = historique.dispoDossier;
  this.approbation = historique.approbation;
  this.accomplissement = historique.accomplissement;
  this.observation = historique.observation;
  this.h_numeroAffaire = historique.h_numeroAffaire;
  this.h_numeroDossier = historique.h_numeroDossier;
  this.p_numeroCompte = historique.p_numeroCompte;
};

const REQUETE_BASE = `SELECT numeroHisto, mouvement, DATE_FORMAT(dateDebutMouvement, '%d-%m-%Y') as dateDebutMouvement, DATE_FORMAT(dateFinMouvement, '%d-%m-%Y') as dateFinMouvement, DATE_FORMAT(dateRDV, '%d-%m-%Y') as dateRDV, dispoDossier, approbation, observation, accomplissement, h_numeroAffaire, h_numeroDossier, dependance, natureAffectation, empietement, lettreDemande, planAnnexe, pvDelimitation, superficieTerrain,DATE_FORMAT(dateDemande, '%d-%m-%Y') as dateDemande, droitDemande, observationDossier, REQUERANT.numeroRequerant, etatMorale, p_numeroProcedure, nomProcedure, natureProcedure, movProcedure, p_numeroCompte, identification, u_cin, nom, prenom, p_idBureau, nomBureau, adressBureau, numeroSousDossier, observationSD, DATE_FORMAT(dateDepotSD, '%d-%m-%Y') as dateDepotSD, mesureAttribuable, prixAttribue, lettreDesistement, planMere, certificatSituationJuridique FROM HISTORIQUE, INDIVIDU, REQUERANT, COMPTE, BUREAU, PROCEDURES, SOUS_DOSSIER, DOSSIER WHERE HISTORIQUE.h_numeroAffaire = DOSSIER.numeroAffaire AND  HISTORIQUE.p_numeroCompte = COMPTE.numeroCompte `;

const ORDER_BY = ` ORDER BY numeroHisto DESC `;

Historique.addHistorique = (newHistorique, result) => {
  dbConn.query("INSERT INTO Historique SET ?", newHistorique, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      console.log(res);
      result(null, { success: true });
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
      `AND ( mouvement = 'Arriver' AND dispoDossier = 1 ) ` +
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
      `AND ( mouvement = 'Depart' AND dispoDossier = 0 ) ` +
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

Historique.getCahierNouvelleDemande = (result) => {
  dbConn.query(
    REQUETE_BASE +
      `AND ( dispoDossier = 1 AND p_numeroProcedure = 1) ` +
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
  dbConn.query(REQUETE_BASE + ` AND numeroHisto = ?`, id, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Historique.searchHistorique = (valeur, result) => {
  dbConn.query(
    REQUETE_BASE +
      ` AND (h_numeroAffaire LIKE '%${valeur}%' OR u_cin LIKE '%${valeur}%'  OR nom LIKE '%${valeur}%'  OR prenom LIKE '%${valeur}%' )` +
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
    `update Historique set ? where numeroHisto = ${id}`,
    updateHistorique,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, { success: true });
      }
    }
  );
};

module.exports = Historique;
