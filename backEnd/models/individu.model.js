let dbConn = require("../config/db");

let Individu = function (individu) {
  this.cin = individu.cin;
  this.nom = individu.nom;
  this.prenom = individu.prenom;
  this.lieuNaiss = individu.lieuNaiss;
  this.dateNaiss = individu.dateNaiss;
  this.profession = individu.profession;
  this.domicile = individu.domicile;
  this.dateLivrance = individu.dateLivrance;
  this.lieuLivrance = individu.lieuLivrance;
  this.p_codeEtatCivil = individu.p_codeEtatCivil;
};

const REQUETE_BASE = `SELECT cin, nom, prenom, lieuNaiss, DATE_FORMAT(dateNaiss, '%d-%m-%Y') as dateNaiss, profession, domicile, DATE_FORMAT(dateLivrance, '%d-%m-%Y') as dateLivrance, lieuLivrance, p_codeEtatCivil ,  etatCivil, cinConjoint, nomConjoint, prenomConjoint, DATE_FORMAT(dateEtatCivil, '%d-%m-%Y') as dateEtatCivil, lieuEtatCivil FROM INDIVIDU, ETAT_CIVIL WHERE ETAT_CIVIL.codeEtatCivil = INDIVIDU.p_codeEtatCivil `;
const ORDER_BY = ` ORDER BY p_codeEtatCivil DESC`;

Individu.addIndividu = (newIndividu, result) => {
  dbConn.query("INSERT INTO individu SET ?", newIndividu, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, { success: true });
    }
  });
};

Individu.getAllIndividus = (result) => {
  dbConn.query(REQUETE_BASE + ORDER_BY, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Individu.getCinIndividu = (id, result) => {
  dbConn.query(REQUETE_BASE + `AND cin = ?`, id, (err, res) => {
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

Individu.searchIndividu = (valeur, result) => {
  dbConn.query(
    REQUETE_BASE + `AND (cin LIKE '%${valeur}%' OR nom LIKE '%${valeur}%' OR prenom LIKE '%${valeur}%')` + ORDER_BY,
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

Individu.apercuIndividu = (valeur, result) => {
  dbConn.query(
    REQUETE_BASE + `AND ( cin LIKE '${valeur}%' )` + ORDER_BY + ` LIMIT 10 `,
    (err, res) => {
      if (err) {
        result({ err, message: "erreur !", success: false }, null);
      } else {
        if (res.length !== 0) {
          result(null, {success: true, res});
        } else {
          result(null, {
            success: false,
            message:
              "Numéro de CIN indisponible",
          });
        }
      }
    }
  );
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
