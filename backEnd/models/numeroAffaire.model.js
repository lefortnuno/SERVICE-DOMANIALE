let dbConn = require("../config/db");
const Dossier = require("./dossier.model");

let NumeroAffaire = function (numeroAffaire) {
  this.autoNumAffaire = numeroAffaire.autoNumAffaire;
};

NumeroAffaire.addNumeroAffaire = () => {
  dbConn.query("INSERT INTO numero_affaire  (`autoNumAffaire`) VALUES (NULL)");
};


NumeroAffaire.getLastIdNumeroAffaire = (result) => {
  dbConn.query("SELECT autoNumAffaire FROM numero_affaire ORDER BY autoNumAffaire DESC LIMIT 1", (err, resLastNumAffaire) => {
    if (!err) {
      /*
      RECUPERATION DE LA DERNIERE ID + INCREMENTATION ET ENREGISTREMENENT NEW AUTO_NUMERO_IM
    */
      let id = 0;
      if (resLastNumAffaire.length === 0) {
        id = 1;
      } else {
        const tmpID = Object.values(resLastNumAffaire);
        id = Object.values(tmpID[0]);
        id = id[0] + 1;
      }
      NumeroAffaire.addNumeroAffaire()
      return result(null, id);
    }
  });
};


module.exports = NumeroAffaire;
