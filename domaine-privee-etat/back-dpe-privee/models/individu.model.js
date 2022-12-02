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

const REQUETE_BASE = `SELECT INDIVIDU.cin, nom, prenom, lieunais, DATE_FORMAT(datenais, '%d-%m-%Y'), profession, domicile, DATE_FORMAT(dateLivrance, '%d-%m-%Y') as dateLivrance, lieuLivrance, INDIVIDU.codeEtatCivil as codeEtatCivilEtranger, REQUERANT.numeroRequerant as numeroRequerant, etatMorale, complementInformation, ETAT_CIVIL.codeEtatCivil as codeEtatCivil,  nature, cinConjoint, nomConjoint, prenomConjoint, DATE_FORMAT(dateNature, '%d-%m-%Y') as dateNature, lieuNature FROM INDIVIDU, REQUERANT, ETAT_CIVIL WHERE ETAT_CIVIL.codeEtatCivil = INDIVIDU.codeEtatCivil AND INDIVIDU.cin = REQUERANT.cin `;
const ORDER_BY = ` ORDER BY numeroRequerant DESC`;

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
  dbConn.query(REQUETE_BASE+ORDER_BY, (err, res) => {
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
      } else {
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
      } else {
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
