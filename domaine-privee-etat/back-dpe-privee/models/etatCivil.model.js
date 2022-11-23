let dbConn = require("../config/db");

let EtatCivil = function (etatcivil) {
  this.codeEtatCivil = etatcivil.codeEtatCivil;
  this.nature = etatcivil.nature;
  this.cinConjoint = etatcivil.cinConjoint;
  this.nomConjoint = etatcivil.nomConjoint;
  this.prenomConjoint = etatcivil.prenomConjoint;
  this.dateNature = etatcivil.dateNature;
  this.lieuNature = etatcivil.lieuNature;
};

EtatCivil.addEtatCivil = (newEtatCivil, result) => {
  dbConn.query("INSERT INTO etat_civil SET ?", newEtatCivil, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

EtatCivil.getAllEtatCivils = (result) => {
  dbConn.query("SELECT * FROM etat_civil", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

EtatCivil.getIdEtatCivil = (id, result) => {
  dbConn.query("SELECT * FROM etat_civil WHERE codeEtatCivil = ?", id, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

EtatCivil.updateEtatCivil = (updateEtatCivil, id, result) => {
  dbConn.query(
    `update etat_civil set ? where codeEtatCivil = ${id}`,
    updateEtatCivil,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = EtatCivil;
