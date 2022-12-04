let dbConn = require("../config/db");
const Histo = require("./historique.model");
const Bureau = require("./bureau.model");

const Procedure = function (procedure) {
  this.numProcedure = procedure.numProcedure;
  this.nomProcedure = procedure.nomProcedure;
  this.natureProcedure = procedure.natureProcedure;
  this.movProcedure = procedure.movProcedure;
  this.idBureau = procedure.idBureau;
};
const REQUETE_BASE = `SELECT numProcedure, nomProcedure, natureProcedure, movProcedure, PROCEDURES.idBureau, nomBureau, adressBureau `+
`FROM PROCEDURES, BUREAU WHERE PROCEDURES.idBureau = BUREAU.idBureau `
const ORDER_BY = ` ORDER BY numProcedure DESC`


Procedure.addProcedure = (newProcedure, result) => {
    Bureau.getIdBureau(newProcedure.idBureau, (err, resBureau) => {
      if (resBureau) {
        dbConn.query(
          "INSERT INTO Procedures SET ?",
          newProcedure,
          (err, res) => {
            if (err) {
              result(err, null);
            } else {
              result(null, res);
            }
          }
        );
      } else {
        result(null, { message: "Bureau introuvable ! inconnu" });
      }
    });
};

Procedure.getAllProcedures = (result) => {
  dbConn.query(REQUETE_BASE+ORDER_BY, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Procedure.getIdProcedure = (id, result) => {
  dbConn.query("SELECT * FROM Procedures WHERE numProcedure = ?", id, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Procedure.updateProcedure = (updateProcedure, id, result) => {
  dbConn.query(
    `update Procedures set ? where numProcedure = ${id}`,
    updateProcedure,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Procedure.searchProcedure = (valeur, result) => {
  dbConn.query(
    REQUETE_BASE +
      `AND ( nomBureau LIKE '%${valeur}%' OR nomProcedure LIKE '%${valeur}%' )` +
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

module.exports = Procedure;
