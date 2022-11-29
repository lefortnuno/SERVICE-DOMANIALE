let dbConn = require("../config/db");
const Individu = require("../models/individu.model");

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
  Individu.getCinIndividu(newDossier.cin, (err, resIndividu) => {
    if (resIndividu) {
      dbConn.query("INSERT INTO Requerant SET ?", newRequerant, (err, res) => {
        if (err) {
          result(err, null);
        } else {
          result(null, res);
        }
      });
    } else {
      result(null, {
        message: " CIN Individu non trouver ! Inconnu !",
        success: false,
      });
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

// Requerant.deleteRequerant = (numeroRequerant, result) => {
//   dbConn.query(
//     `DELETE FROM Requerant WHERE numeroRequerant = ${numeroRequerant}`,
//     function (err, res) {
//       if (err) {
//         result(err, null);
//       } else {
//         result(null, {
//           message: `suppresion success, numeroRequerant : ${numeroRequerant}`,
//         });
//       }
//     }
//   );
// };

module.exports = Requerant;
