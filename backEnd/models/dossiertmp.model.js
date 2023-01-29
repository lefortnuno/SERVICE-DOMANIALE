let dbConn = require("../config/db");
let individu = require("./individu.model");

let Dossiertmp = function (dossiertmp) {
  this.idTmpDossier = dossiertmp.idTmpDossier;
  this.dependance = dossiertmp.dependance;
  this.lettreDemande = dossiertmp.lettreDemande;
  this.planAnnexe = dossiertmp.planAnnexe;
  this.superficieTerrain = dossiertmp.superficieTerrain;
  this.pvDelimitation = dossiertmp.pvDelimitation;
  this.lettreDesistement = dossiertmp.lettreDesistement;
  this.planMere = dossiertmp.planMere;
  this.certificatSituationJuridique = dossiertmp.certificatSituationJuridique;
  this.cin = dossiertmp.cin;
};

Dossiertmp.addDossierTemporaire = (newDossierTemporaire, result) => {
  individu.getCinIndividu(newDossierTemporaire.cin, (err, resIndividu) => { 
    if (resIndividu.length !== 0) {
      dbConn.query(
        "INSERT INTO dossier_temporaire SET ?",
        newDossierTemporaire,
        (err, res) => {
          if (err) {
            result(err, null);
          } else {
            result(null, res);
          }
        }
      );
    } else {
      result(null, { message: "Individu non trouver ! Inconnu !" });
    }
  });
};

Dossiertmp.getAllDossierTemporaires = (result) => {
  dbConn.query("SELECT * FROM dossier_temporaire", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Dossiertmp.getIdDossierTemporaire = (id, result) => {
  dbConn.query(
    "SELECT * FROM dossier_temporaire WHERE idTmpDossier = ?",
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

Dossiertmp.searchDossierTemporaire = (values, result) => {
  let req;
  if (values.cin) {
    req = "select * from dossier_temporaire where cin = ?";
  }
  dbConn.query(req, [values.cin], function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Dossiertmp.updateDossierTemporaire = (newDossierTemporaire, id, result) => {
  dbConn.query(
    `update dossier_temporaire set ? where idTmpDossier = ${id}`,
    newDossierTemporaire,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Dossiertmp.deleteDossierTemporaire = (id, result) => {
  dbConn.query(
    `delete from dossier_temporaire where idTmpDossier = ${id}`,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, {
          message: `suppresion success, idTmpDossier : ${id}`,
        });
      }
    }
  );
};

module.exports = Dossiertmp;
