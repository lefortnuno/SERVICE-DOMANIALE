let dbConn = require("../config/db");
const Individu = require("./individu.model");

//#region IDENTATION DE CODE
//#endregion

let Utilisateur = function (utilisateur) {
  this.numCompte = utilisateur.numCompte;
  this.identification = utilisateur.identification;
  this.photoPDP = utilisateur.photoPDP;
  this.attribut = utilisateur.attribut;
  this.mdp = utilisateur.mdp;
  this.etatCompte = utilisateur.etatCompte;
  this.cin = utilisateur.cin;
};

const BASED_REQUETE = `SELECT * FROM compte `;
const ADVANCED_REQUETE = `SELECT numCompte, identification, photoPDP, attribut, mdp, etatCompte, compte.cin as cin, individu.nom, individu.prenom FROM compte, individu WHERE compte.cin = individu.cin `;
const ORDER_BY = ` ORDER BY numCompte DESC `;

Utilisateur.addUtilisateur = (newUtilisateur, result) => {
  Individu.getCinIndividu(newUtilisateur.cin, (err, resp) => {
    console.log(resp);
    if (resp) {
      dbConn.query("INSERT INTO compte SET ?", newUtilisateur, (err, res) => {
        if (!err) {
          result(null, { success: true, message: "Ajout reussi !" });
        } else {
          result(err, null);
        }
      });
    } else {
      result(null, { success: false, message: "Individu introuvable !" });
    }
  });
};

Utilisateur.loginUtilisateur = (values, result) => {
  const requete = `AND identification=? AND mdp=?`;
  dbConn.query(
    ADVANCED_REQUETE + requete,
    [values.identification, values.mdp],
    (err, res) => {
      if (!err) {
        result(null, res);
      } else {
        result(err, null);
      }
    }
  );
};

Utilisateur.getAllUtilisateurs = (result) => {
  dbConn.query(BASED_REQUETE + ORDER_BY, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Utilisateur.getLastIdUtilisateurs = (result) => {
  dbConn.query(
    `SELECT numCompte FROM compte ` + ORDER_BY + `LIMIT 1`,
    (err, res) => {
      if (err) {
        return result(err, null);
      } else {
        let id = 0;
        if (res.length === 0) {
          id = 1;
        } else {
          const tmpID = Object.values(res);
          id = Object.values(tmpID[0]);
          id = id[0] + 1;
        }
        return result(null, id);
      }
    }
  );
};

Utilisateur.getIdUtilisateur = (numCompte, result) => {
  dbConn.query(BASED_REQUETE + `WHERE numCompte = ?`, numCompte, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      if (res.length !== 0) {
        result(null, res);
      } else {
        result(null, res);
      }
    }
  });
};

Utilisateur.searchUtilisateurByParams = (valeur, result) => {
  dbConn.query(
    BASED_REQUETE + `WHERW identification LIKE '%${valeur}%'` + ORDER_BY,
    valeur,
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

Utilisateur.updateUtilisateur = (newUtilisateur, numCompte, result) => {
  dbConn.query(
    `UPDATE compte SET ? WHERE numCompte = ${numCompte}`,
    newUtilisateur,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Utilisateur.deleteUtilisateur = (numCompte, result) => {
  dbConn.query(
    `DELETE FROM compte WHERE numCompte = ${numCompte}`,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, {
          message: `suppresion success, numCompte : ${numCompte}`,
        });
      }
    }
  );
};

Utilisateur.vraideleteUtilisateur = (numCompte, result) => {
  Utilisateur.getIdUtilisateur(numCompte, (err, resAttribut) => {
    if (resAttribut && resAttribut[0].attribut === "client") {
      dbConn.query(
        `DELETE FROM compte WHERE numCompte = ${numCompte}`,
        function (err, res) {
          if (err) {
            result(err, null);
          } else {
            result(null, {
              message: `suppresion success, numCompte : ${numCompte}`,
            });
          }
        }
      );
    } else if (!resAttribut && resAttribut[0].attribut === "client") {
      result(null, { message: "Pas de resultat ~" });
    } else if (resAttribut && resAttribut[0].attribut !== "client") {
      result(null, {
        message: `Echec Suppression! attribut du compte: ${resAttribut[0].attribut}`,
      });
    }
  });
};

Utilisateur.roleUtilisateur = (newUtilisateur, numCompte, result) => {
  dbConn.query(
    `UPDATE compte SET ? WHERE numCompte = ${numCompte}`,
    newUtilisateur,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Utilisateur;
