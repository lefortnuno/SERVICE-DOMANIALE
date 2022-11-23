let dbConn = require("../config/db");
const Histo = require("./historique.model");
const Bureau = require("./bureau.model");

const Procedure = function (procedure) {
  this.numProcedure = procedure.numProcedure;
  this.nomProcedure = procedure.nomProcedure;
  this.idBureau = procedure.idBureau;
};

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
  dbConn.query("SELECT * FROM Procedures", (err, res) => {
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

module.exports = Procedure;
