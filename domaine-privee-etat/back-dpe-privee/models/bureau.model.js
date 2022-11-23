let dbConn = require("../config/db");

let Bureau = function (bureau) {
  this.idBureau = bureau.idBureau;
  this.nomBureau = bureau.nomBureau;
  this.adressBureau = bureau.adressBureau;
};

Bureau.addBureau = (newBureau, result) => {
  dbConn.query("INSERT INTO Bureau SET ?", newBureau, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Bureau.getAllBureau = (result) => {
  dbConn.query("SELECT * FROM Bureau", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Bureau.getIdBureau = (id, result) => {
  dbConn.query("SELECT * FROM Bureau WHERE idBureau = ?", id, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Bureau.updateBureau = (updateBureau, id, result) => {
  dbConn.query(
    `update Bureau set ? where idBureau = ${id}`,
    updateBureau,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Bureau;
