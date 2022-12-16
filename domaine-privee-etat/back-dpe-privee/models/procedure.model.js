let dbConn = require("../config/db");
const Histo = require("./historique.model");
const Bureau = require("./bureau.model");

const Procedure = function (procedure) {
  this.numeroProcedure = procedure.numeroProcedure;
  this.nomProcedure = procedure.nomProcedure;
  this.natureProcedure = procedure.natureProcedure;
  this.movProcedure = procedure.movProcedure;
  this.p_idBureau = procedure.p_idBureau;
};

const REQUETE_BASE = `SELECT numeroProcedure, nomProcedure, natureProcedure, movProcedure, p_idBureau, nomBureau, adressBureau FROM PROCEDURES, BUREAU WHERE PROCEDURES.p_idBureau = BUREAU.idBureau `
const ORDER_BY = ` ORDER BY numeroProcedure ASC `


Procedure.addProcedure = (newProcedure, result) => {
    Bureau.getIdBureau(newProcedure.p_idBureau, (err, resBureau) => {
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
  dbConn.query(REQUETE_BASE+ `AND numeroProcedure = ? `,  id, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Procedure.updateProcedure = (updateProcedure, id, result) => {
  dbConn.query(
    `update Procedures set ? where numeroProcedure = ${id}`,
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
      `AND ( nomBureau LIKE '%${valeur}%' OR nomProcedure LIKE '%${valeur}%' OR natureProcedure LIKE '%${valeur}%')` +
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
