let dbConn = require("../config/db");
const Requerant = require("./requerant.model");
const Dossier = require("./dossier.model");

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

REQUETE_BASE =
  `SELECT INDIVIDU.cin, nom, prenom, lieunais, DATE_FORMAT(datenais, '%d-%m-%Y'), profession, domicile, DATE_FORMAT(dateLivrance, '%d-%m-%Y'), lieuLivrance, INDIVIDU.codeEtatCivil, ` +
  `REQUERANT.numeroRequerant, REQUERANT.etatMorale, REQUERANT.complementInformation, ` +
  `ETAT_CIVIL.codeEtatCivil , ETAT_CIVIL.nature, ETAT_CIVIL.cinConjoint, ETAT_CIVIL.nomConjoint, ETAT_CIVIL.prenomConjoint, DATE_FORMAT(ETAT_CIVIL.dateNature, '%d-%m-%Y'), ETAT_CIVIL.lieuNature ` +
  `FROM INDIVIDU, REQUERANT, ETAT_CIVIL WHERE ETAT_CIVIL.codeEtatCivil = INDIVIDU.codeEtatCivil AND INDIVIDU.cin = REQUERANT.cin `;
ORDER_BY = ` ORDER BY numeroRequerant DESC`;

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
  dbConn.query("SELECT * FROM individu WHERE cin = ?", id, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      if (res.length !== 0) {
        result(null, res);
        // result(null, {success: true, res});
      } else {
        // result(null, {success : false, message: "Individu non trouver !"});
        result(null, null);
      }
    }
  });
};

Individu.getCinIndividuVoirPlus = (id, result) => {
  dbConn.query(REQUETE_BASE + `AND INDIVIDU.cin = ?`, id, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      if (res.length !== 0) {
        result(null, res);
        // result(null, {success: true, res});
      } else {
        // result(null, {success : false, message: "Individu non trouver !"});
        result(null, null);
      }
    }
  });
};

Individu.searchIndividu = (valeur, result) => {
  dbConn.query(
    REQUETE_BASE +
      `AND ( INDIVIDU.cin LIKE '%${valeur}%' OR nom LIKE '%${valeur}%' OR prenom LIKE '%${valeur}%' )` +
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
