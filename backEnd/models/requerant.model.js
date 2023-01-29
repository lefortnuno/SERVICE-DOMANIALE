let dbConn = require("../config/db");

let Requerant = function (individu) {
  this.numeroRequerant = individu.numeroRequerant;
  this.etatMorale = individu.etatMorale;
  this.complementInformation = individu.complementInformation;
  this.p_cin = individu.p_cin;
  this.numeroTelephone = individu.numeroTelephone;
};

const REQUETE_BASE = `
SELECT
    numeroRequerant,
    etatMorale,
    numeroTelephone,
    complementInformation,
    p_cin,
    nom,
    prenom
FROM
    REQUERANT,
    INDIVIDU
WHERE
    REQUERANT.p_cin = INDIVIDU.cin `;

const ORDER_BY = ` ORDER BY numeroRequerant DESC `;

Requerant.addRequerant = (newRequerant, result) => {
  dbConn.query("INSERT INTO Requerant SET ?", newRequerant, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, { success: true });
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
  dbConn.query(REQUETE_BASE + `AND p_cin = ?`, id, (err, res) => {
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
      `AND ( p_cin LIKE '%${valeur}%' OR nom LIKE '%${valeur}%' OR prenom LIKE '%${valeur}%' )` +
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

Requerant.apercuRequerant = (valeur, result) => {
  dbConn.query(
    REQUETE_BASE + `AND ( p_cin LIKE '${valeur}%' )` + ORDER_BY,
    (err, res) => {
      if (err) {
        result({ err, message: "erreur !", success: false }, null);
      } else {
        if (res.length !== 0) {
          result(null, { success: true, res });
        } else {
          result(null, {
            success: false,
            message: "Requérant non trouvé.",
          });
        }
      }
    }
  );
};

Requerant.deleteRequerant = (numeroRequerant, result) => {
  dbConn.query(
    `DELETE FROM Requerant WHERE numeroRequerant = ${numeroRequerant}`,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, { success: true});
      }
    }
  );
};

module.exports = Requerant;
