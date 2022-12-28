let dbConn = require("../config/db");

let EtatCivil = function (etatcivil) {
  this.codeEtatCivil = etatcivil.codeEtatCivil;
  this.etatCivil = etatcivil.etatCivil;
  this.cinConjoint = etatcivil.cinConjoint;
  this.nomConjoint = etatcivil.nomConjoint;
  this.prenomConjoint = etatcivil.prenomConjoint;
  this.dateEtatCivil = etatcivil.dateEtatCivil;
  this.lieuEtatCivil = etatcivil.lieuEtatCivil;
};

EtatCivil.addEtatCivil = (newEtatCivil, result) => {
  dbConn.query("INSERT INTO etat_civil SET ?", newEtatCivil, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, {success: true});
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
EtatCivil.getLastEtatCivil = (result) => {
  dbConn.query("SELECT codeEtatCivil FROM etat_civil ORDER BY codeEtatCivil DESC LIMIT 1", (err, res) => {
    if (err) {
       result(err, null);
    } else {
      const tmpID = Object.values(res);
      id = Object.values(tmpID[0]);
       result(null, id);
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
