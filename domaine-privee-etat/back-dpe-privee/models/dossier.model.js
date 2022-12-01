let dbConn = require("../config/db");
const Requerant = require("./requerant.model");
const Phase = require("./phase.model");

let Dossier = function (dossier) {
  this.idDossier = dossier.idDossier;
  this.numAffaire = dossier.numAffaire;
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
  this.numeroRequerant = dossier.numeroRequerant;
  this.cin = dossier.cin;
  this.etatMorale = dossier.etatMorale;
  this.complementInformation = dossier.complementInformation;
  this.nom = dossier.nom;
  this.prenom = dossier.prenom;
  this.numPhase = dossier.numPhase;
  this.lettreDesistement = dossier.lettreDesistement;
  this.planMere = dossier.planMere;
  this.certificatSituationJuridique = dossier.certificatSituationJuridique;
};

const REQUETE_BASE =
  ` SELECT` +
  ` idDossier, DOSSIER.numAffaire as numAffaire, dependance, empietement, natureAffectation, lettreDemande, planAnnexe, pvDelimitation, superficieTerrain, DATE_FORMAT(dateDemande, '%d-%m-%Y') as dateDemande, droitDemande, observationDossier, DOSSIER.numeroRequerant as numeroRequerantEtranger, numPhase,` +
  ` numSousDossier, obseravation_S_D,DATE_FORMAT(dateDepot_S_D, '%d-%m-%Y') as dateDepot_S_D, mesureAttribuable, prixAttribue, lettreDesistement, planMere, certificatSituationJuridique, SOUS_DOSSIER.numAffaire as numAffaireEtranger, ` +
  ` REQUERANT.numeroRequerant as numeroRequerant, etatMorale, complementInformation, REQUERANT.cin as cinEtranger, ` +
  `INDIVIDU.cin as cin, nom, prenom ` +
  ` FROM DOSSIER, SOUS_DOSSIER, INDIVIDU, REQUERANT ` +
  ` WHERE DOSSIER.numAffaire = SOUS_DOSSIER.numAffaire AND INDIVIDU.cin = REQUERANT.cin AND REQUERANT.numeroRequerant = DOSSIER.numeroRequerant`;
const ORDER_BY = ` ORDER BY idDossier DESC`;

Dossier.addDossier = (newDossier, result) => {
  Requerant.getIdRequerant(newDossier.numeroRequerant, (err, resRequerant) => {
    Phase.getIdPhase(newDossier.numPhase, (err, resPhase) => {
      if (resRequerant && resPhase) {
        dbConn.query("INSERT INTO dossier SET ?", newDossier, (err, res) => {
          if (err) {
            result(err, null);
          } else {
            result(null, { success: true, message: "Ajout reussi !" });
          }
        });
      } else if (resRequerant && !resPhase) {
        result(null, {
          message: " Phase non trouver !",
          success: false,
        });
      } else if (!resRequerant && resPhase) {
        result(null, {
          message: " Numero requerant non trouver !",
          success: false,
        });
      } else {
        result(null, {
          message: " CIN Individu et Phase non trouver !",
          success: false,
        });
      }
    });
  });
};

Dossier.getAllDossiers = (result) => {
  dbConn.query(REQUETE_BASE + ORDER_BY, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Dossier.getIdDossier = (id, result) => {
  dbConn.query(REQUETE_BASE + " AND idDossier = ?", id, (err, res) => {
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

Dossier.getDossierRequerant = (id, result) => {
  dbConn.query(REQUETE_BASE + " AND REQUERANT.numeroRequerant = ?", id, (err, res) => {
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

Dossier.getNumDossier = (numAffaire, result) => {
  dbConn.query(
    " select numAffaire from dossier where numAffaire = ?",
    numAffaire,
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
    `update dossier set ? where idDossier = ${id}`,
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

Dossier.avortementDossier = (updateDossier, id, result) => {
  dbConn.query(
    `update dossier set ? where idDossier = ${id}`,
    updateDossier,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, {
          message: `Avortement success, idDossier : ${id}`,
        });
      }
    }
  );
};

Dossier.searchDossier = (valeur, result) => {
  dbConn.query(
    REQUETE_BASE +
      ` AND (Dossier.numAffaire LIKE '%${valeur}%' OR INDIVIDU.cin LIKE '%${valeur}%')` +
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

module.exports = Dossier;
