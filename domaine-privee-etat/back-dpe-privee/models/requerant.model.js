let dbConn = require("../config/db");
const Individu = require("../models/individu.model");
const Dossier = require("../models/dossier.model");

let Requerant = function (individu) {
  this.numeroRequerant = individu.numeroRequerant;
  this.etatMorale = individu.etatMorale;
  this.complementInformation = individu.complementInformation;
  this.cin = individu.cin;
  this.nom = individu.nom;
  this.prenom = individu.prenom;
};

const REQUETE_BASE =
  `SELECT numeroRequerant, etatMorale, complementInformation, REQUERANT.cin as cin, ` +
  `INDIVIDU.cin as cinEtranger, nom, prenom ` +
  `FROM REQUERANT, INDIVIDU WHERE REQUERANT.cin = INDIVIDU.cin `;
const ORDER_BY = ` ORDER BY numeroRequerant DESC`;

Requerant.addRequerant = (newRequerant, result) => {
  Individu.getCinIndividu(newRequerant.cin, (erreur, resIndividu) => {
    if (erreur) {
      result(erreur, null);
    } else {
      if (resIndividu) {
        dbConn.query(
          "INSERT INTO Requerant SET ?",
          newRequerant,
          (err, res) => {
            if (err) {
              result(err, null);
            } else {
              result(null, res);
            }
          }
        );
      } else {
        result(null, {
          message: " CIN Individu non trouver ! Inconnu !",
          success: false,
        });
      }
    }
  });
};

Requerant.addRequerantNewIndividu = (newRequerant, result) => {
  dbConn.query("INSERT INTO Requerant SET ?", newRequerant, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Requerant.getAllRequerants = (result) => {
  dbConn.query(REQUETE_BASE + ORDER_BY, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Requerant.getIdRequerant = (id, result) => {
  dbConn.query(REQUETE_BASE + `AND numeroRequerant = ?`, id, (err, res) => {
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

Requerant.getCINRequerant = (id, result) => {
  dbConn.query(REQUETE_BASE + `AND individu.cin = ?`, id, (err, res) => {
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

Requerant.searchRequerant = (values, result) => {
  const req =
    REQUETE_BASE +
    `AND (INDIVIDU.cin LIKE '%${values.value}%' OR nom LIKE '%${values.value}%' OR prenom LIKE '%${values.value}%')` +
    ORDER_BY;

  dbConn.query(req, (err, res) => {
    if (err) {
      result({ err, message: "erreur !", success: false }, null);
    } else {
      if (res.length !== 0) {
        result(null, { res, message: "trouvable !", success: true });
      } else {
        result(null, { res, message: "Introuvable !", success: false });
      }
    }
  });
};

Requerant.updateRequerant = (updateRequerant, numeroRequerant, result) => {
  dbConn.query(
    `update Requerant set ? where numeroRequerant = ${numeroRequerant}`,
    updateRequerant,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Requerant.deleteRequerant = (id, result) => {
  // VERIFIER SI LES COMPTE REQUERANT DE L'INDIVIDU ON DES DOSSIERS ?
  Dossier.getDossierRequerant(element, (error, resDosReq) => {
    if (!error) {
      if (resDosReq) {
        result(null, {
          success: false,
          message: "Le requerant possede un ou plusieurs dossier.",
        });
      } else {
        dbConn.query(
          `DELETE FROM requerant WHERE numeroRequerant = ${id}`,
          function (err, res) {
            if (err) {
              result(err, null);
            } else {
              result(null, {
                success: true,
                message: `suppresion success.`,
              });
            }
          }
        );
      }
    } else {
      result(err, null);
    }
  });
};

module.exports = Requerant;
