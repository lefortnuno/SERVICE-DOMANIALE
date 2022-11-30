let dbConn = require("../config/db");

let Individu = function (individu) {
  this.cin = individu.cin;
  this.nom = individu.nom;
  this.prenom = individu.prenom;
  this.lieunais = individu.lieunais;
  this.datenais = individu.datenais;
  this.profession = individu.profession;
  this.domicile = individu.domicile;
  this.dateLivrance = individu.dateLivrance;
  this.lieuLivrance = individu.lieuLivrance;
  this.codeEtatCivil = individu.codeEtatCivil;
};

Individu.addIndividu = (newIndividu, result) => {
  dbConn.query("INSERT INTO individu SET ?", newIndividu, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, { success:true});
    }
  });
};

Individu.getAllIndividus = (result) => {
  dbConn.query("SELECT * FROM Individu", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Individu.getCinIndividu = (id, result) => {
  dbConn.query("SELECT * FROM individu WHERE cin = ?", id, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      if(res.length !== 0){
        result(null, res);
        // result(null, {success: true, res});
      } else {
        // result(null, {success : false, message: "Individu non trouver !"});
        result(null,  null);
      }
    }
  });
};

Individu.searchIndividu = (values, result) => {
  const req = `select * from Individu where cin LIKE '%${values.value}%' OR nom LIKE '%${values.value}%' OR prenom LIKE '%${values.value}%'`;
  
  dbConn.query(req, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Individu.updateIndividu = (updateIndividu, cin, result) => {
  dbConn.query(
    `update individu set ? where cin = ${cin}`,
    updateIndividu,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Individu;
