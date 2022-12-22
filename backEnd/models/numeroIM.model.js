let dbConn = require("../config/db");

let NumeroIM = function (numeroIM) {
  this.autoNumIM = numeroIM.autoNumIM;
};

NumeroIM.addNumeroIM = () => {
  dbConn.query("INSERT INTO NUMERO_IM (`autoNumIM`) VALUES (NULL)");
};

NumeroIM.getLastIdNumeroIM = (result) => {
  dbConn.query(
    "SELECT autoNumIM FROM NUMERO_IM ORDER BY autoNumIM DESC LIMIT 1",
    (err, resLastIM) => {
      if (!err) {
        /*
        RECUPERATION DE LA DERNIERE ID + INCREMENTATION ET ENREGISTREMENENT NEW AUTO_NUMERO_IM
      */
        let id = 0;
        if (resLastIM.length === 0) {
          id = 1;
        } else {
          const tmpID = Object.values(resLastIM);
          id = Object.values(tmpID[0]);
          id = id[0] + 1;
        }
        NumeroIM.addNumeroIM()
        return result(null, id);
      }
    }
  );
};

module.exports = NumeroIM;
