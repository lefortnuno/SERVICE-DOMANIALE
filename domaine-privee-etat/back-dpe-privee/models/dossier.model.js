let dbConn = require("../config/db");
const Individu = require("./individu.model");
const Compte = require("./utilisateur.model");
const Phase = require("./phase.model");

let Dossier = function (dossier) {
  this.idDossier = dossier.idDossier;
  this.numAffaire = dossier.numAffaire;
  this.dependance = dossier.dependance;
  this.empietement = dossier.empietement;
  this.lettreDemande = dossier.lettreDemande;
  this.planAnnexe = dossier.planAnnexe;
  this.pvDelimitation = dossier.pvDelimitation;
  this.superficieTerrain = dossier.superficieTerrain;
  this.dateDemande = dossier.dateDemande;
  this.droitDemande = dossier.droitDemande;
  this.observationDossier = dossier.observationDossier;
  this.cin = dossier.cin;
  this.numCompte = dossier.numCompte;
  this.phase = dossier.phase;
  this.lettreDesistement = dossier.lettreDesistement;
  this.planMere = dossier.planMere;
  this.certificatSituationJuridique = dossier.certificatSituationJuridique;
};

const mysqlRequete =
  ` SELECT` +
  ` idDossier, DOSSIER.numAffaire as numAffaire, dependance, empietement, lettreDemande, planAnnexe, pvDelimitation, superficieTerrain, DATE_FORMAT(dateDemande, '%d-%m-%Y') as dateDemande, droitDemande, observationDossier, cin, NumCompte, phase,` +
  ` numSousDossier, obseravation_S_D, dateDepot_S_D, mesureAttribuable, prixAttribuable, lettreDesistement, planMere, certificatSituationJuridique, SOUS_DOSSIER.numAffaire as numAffaireEtranger` +
  ` FROM DOSSIER, SOUS_DOSSIER` +
  ` WHERE DOSSIER.numAffaire = SOUS_DOSSIER.numAffaire`;
const orderBy = ` ORDER BY idDossier DESC`;

Dossier.addDossier = (newDossier, result) => {
  /*
   Verification Existance Numero CIN, Phase et EVENTUELLEMNT DU COMPTE
   */
  Individu.getCinIndividu(newDossier.cin, (err, resIndividu) => {
    Phase.getIdPhase(newDossier.phase, (err, resPhase) => {
      if (resIndividu && resPhase) {
        if (newDossier.numCompte) {
          Compte.getIdUtilisateur(newDossier.numCompte, (err, resCompte) => {
            if (resCompte) {
              dbConn.query(
                "INSERT INTO dossier SET ?",
                newDossier,
                (err, res) => {
                  if (err) {
                    result(err, null);
                  } else {
                    result(null, { success: true, message: "Ajout reussi !" });
                  }
                }
              );
            } else {
              result(null, {
                message: "Compte Utilisateur non trouver ! Inconnu !",
                success: false,
              });
            }
          });
        } else {
          dbConn.query("INSERT INTO dossier SET ?", newDossier, (err, res) => {
            if (err) {
              result(err, null);
            } else {
              result(null, { success: true, message: "Ajout reussi !" });
            }
          });
        }
      } else if (resIndividu && !resPhase) {
        result(null, {
          message: " Phase non trouver ! Inconnu !",
          success: false,
        });
      } else if (!resIndividu && resPhase) {
        result(null, {
          message: " CIN Individu non trouver ! Inconnu !",
          success: false,
        });
      } else {
        result(null, {
          message: " CIN Individu et Phase  non trouver ! Inconnu !",
          success: false,
        });
      }
    });
  });
};

Dossier.getAllDossiers = (result) => {
  dbConn.query(mysqlRequete + orderBy, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Dossier.getIdDossier = (id, result) => {
  dbConn.query(mysqlRequete + " AND idDossier = ?", id, (err, res) => {
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

Dossier.searchDossierByParams = (valeur, result) => {
  dbConn.query(
    mysqlRequete +
      ` AND (Dossier.numAffaire LIKE '%${valeur}%' OR cin LIKE '%${valeur}%')` +
      orderBy,
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
