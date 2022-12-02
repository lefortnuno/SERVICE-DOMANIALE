let dbConn = require("../config/db");
const Individu = require("./individu.model");
const Dossier = require("./dossier.model");

let Requerant = function (individu) {
  this.numeroRequerant = individu.numeroRequerant;
  this.etatMorale = individu.etatMorale;
  this.complementInformation = individu.complementInformation;
  this.cin = individu.cin;
  this.nom = individu.nom;
  this.prenom = individu.prenom;
};

const REQUETE_BASE =
  `SELECT REQUERANT.numeroRequerant as numeroRequerant, etatMorale, complementInformation, REQUERANT.cin as cin, ` +
  `INDIVIDU.cin as cinEtranger, nom, prenom, numAffaire ` +
  `FROM REQUERANT, INDIVIDU, DOSSIER WHERE `+
  `REQUERANT.cin = INDIVIDU.cin AND DOSSIER.numeroRequerant = REQUERANT.numeroRequerant `;
const ORDER_BY = ` ORDER BY numeroRequerant DESC`;

Requerant.addRequerant = (newRequerant, result) => {
  Individu.getCinIndividu(newRequerant.cin, (errr, resI) => {
    if(errr){
      result(null, err);
    } else {
      if(resI){
        console.log(resI);
        dbConn.query("INSERT INTO Requerant SET ?", newRequerant, (err, res) => {
          if (err) {
            result(err, null);
          } else {
            result(null, res);
          }
        });
      }
    }
  })
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
  dbConn.query(REQUETE_BASE + `AND REQUERANT.numeroRequerant = ?`, id, (err, res) => {
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

Requerant.searchRequerant = (valeur, result) => {
  dbConn.query(
    REQUETE_BASE +
      `AND ( REQUERANT.cin LIKE '%${valeur}%' OR nom LIKE '%${valeur}%' OR prenom LIKE '%${valeur}%' )` +
      ORDER_BY,
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
