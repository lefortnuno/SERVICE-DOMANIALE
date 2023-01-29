let dbConn = require("../config/db");

const Stat = function (stat) {
  this.numeroHisto = stat.numeroHisto;
  this.mouvement = stat.mouvement;
  this.dateDebutMouvement = stat.dateDebutMouvement;
  this.dateFinMouvement = stat.dateFinMouvement;
  this.dateRDV = stat.dateRDV;
  this.dispoDossier = stat.dispoDossier;
  this.approbation = stat.approbation;
  this.accomplissement = stat.accomplissement;
  this.observation = stat.observation;
  this.h_numeroAffaire = stat.h_numeroAffaire;
  this.h_numeroDossier = stat.h_numeroDossier;
  this.p_numeroCompte = stat.p_numeroCompte;
  this.h_numeroProcedure = stat.h_numeroProcedure;
};

function toMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1); // parce que Janvier = 0, Fevrier = 1

  return date.toLocaleString("fr-FR", {
    month: "long",
  });
}

// -- STATS DE TEMPS PERDU PAR CHQ PROCEDURES PAR MOIS, EN QUELLE MOIS FaUT IL COMMEMNCER OHATRA.
const ALL_STATS_PROCEDURE_MONTH = `
  SELECT
      DATE_FORMAT(dateDebutMouvement, '%m') as Mois,
      AVG(IF(h_numeroProcedure = 1, DATEDIFF(dateFinMouvement, dateDebutMouvement), NULL)) as "N.D", 
      AVG(IF(h_numeroProcedure = 2, DATEDIFF(dateFinMouvement, dateDebutMouvement), NULL)) as "C.E.L", 
      AVG(IF(h_numeroProcedure = 3, DATEDIFF(dateFinMouvement, dateDebutMouvement), NULL)) as "2nd.R", 
      AVG(IF(h_numeroProcedure = 4, DATEDIFF(dateFinMouvement, dateDebutMouvement), NULL)) as "D.A.S", 
      AVG(IF(h_numeroProcedure = 5, DATEDIFF(dateFinMouvement, dateDebutMouvement), NULL)) as "I.M", 
      AVG(IF(h_numeroProcedure = 6, DATEDIFF(dateFinMouvement, dateDebutMouvement), NULL)) as "BORNAGE", 
      AVG(IF(h_numeroProcedure = 7, DATEDIFF(dateFinMouvement, dateDebutMouvement), NULL)) as "REMISE", 
      AVG(IF(h_numeroProcedure = 8, DATEDIFF(dateFinMouvement, dateDebutMouvement), NULL)) as "F.L.C", 
      AVG(IF(h_numeroProcedure = 9, DATEDIFF(dateFinMouvement, dateDebutMouvement), NULL)) as "DECOMPTE", 
      AVG(IF(h_numeroProcedure = 10, DATEDIFF(dateFinMouvement, dateDebutMouvement), NULL)) as "P.A.V", 
      AVG(IF(h_numeroProcedure = 11, DATEDIFF(dateFinMouvement, dateDebutMouvement), NULL)) as "MUTATION", 
      AVG(IF(h_numeroProcedure = 69, DATEDIFF(dateFinMouvement, dateDebutMouvement), NULL)) as "AVC"
  FROM
      HISTORIQUE
  GROUP BY
      MONTH(dateDebutMouvement) `;

// -- STATS DE TEMPS PERDU PAR CHQ PROCEDURES
const STATS_TEMPS_PERDU_PROCEDURE = `
SELECT 
    nomProcedure,
    AVG(DATEDIFF(dateFinMouvement, dateDebutMouvement)) as nombreJour
    --  SUM(DATEDIFF(dateFinMouvement, dateDebutMouvement)) as nombreJour
FROM
    HISTORIQUE,
    PROCEDURES
WHERE
    PROCEDURES.numeroProcedure = HISTORIQUE.h_numeroProcedure
GROUP BY
    h_numeroProcedure `;

// -- STATS DE SIGLE
const STATS_SIGLE = `
SELECT
    DATE_FORMAT(dateDebutMouvement, '%m') as Mois,
    COUNT(IF(h_numeroAffaire LIKE '%V%', 1, NULL)) as "V",
    COUNT(IF(h_numeroAffaire LIKE '%AX%', 1, NULL)) as "AX",
    COUNT(IF(h_numeroAffaire LIKE '%X%', 1, NULL)) as "X"
FROM
    HISTORIQUE
GROUP BY
    MONTH(dateDebutMouvement)`;

// -- STATS DE TEMPS CONSOMMER PAR UN PROCEDURE POUR UN SEUL DOSSIER
const STATS_SINGLE_DOSSIER = `  
SELECT 
    nomProcedure,
    SUM(DATEDIFF(dateFinMouvement, dateDebutMouvement)) as nombreJour
FROM
    HISTORIQUE,
    PROCEDURES
WHERE
    PROCEDURES.numeroProcedure = HISTORIQUE.h_numeroProcedure
    AND h_numeroDossier = ?
GROUP BY
    h_numeroProcedure ;
`

Stat.getAllStatsProcedureByMonth = (result) => {
  dbConn.query(ALL_STATS_PROCEDURE_MONTH, (err, res) => {
    if (err) { 
      result(err, null);
    } else {
      //stoquer les mois(en lettre) du stats
      const labels = [];

      //stoquer les mois(en chiffre) du stats
      const mois = [];

      //ce VALUES va ordonner toutes les donnees selon leur mois
      const values1 = [];
      const values2 = [];
      const values3 = [];
      const values4 = [];
      const values5 = [];
      const values6 = [];
      const values7 = [];
      const values8 = [];
      const values9 = [];
      const values10 = [];
      const values11 = [];
      const values12 = [];

      //stoquer les donnee du stats
      const donnee = [];
      let obj1 = {};
      let obj2 = {};
      let obj3 = {};
      let obj4 = {};
      let obj5 = {};
      let obj6 = {};
      let obj7 = {};
      let obj8 = {};
      let obj9 = {};
      let obj10 = {};
      let obj11 = {};
      let obj12 = {};

      //stoquer les donnee de retour
      const data = [];

      if (res.length !== 0) {
        //pour chaque element du resultat du mysql dans RES
        res.forEach((element) => {
          //pour chaque element du variable ELEMENT de chq ligne, je les stock dans M
          for (const m in element) {
            // Recuperation des mois disponible
            if (m === "Mois") {
              //element[m] design la valeur du mois en chiffre, je les stock dans MOIS
              mois.push(element[m]);
            }

            // Recuperation des valeur correspondant a chq mois
            if (m === "N.D") {
              values1.push(element[m]);
            }
            if (m === "C.E.L") {
              values2.push(element[m]);
            }
            if (m === "2nd.R") {
              values3.push(element[m]);
            }
            if (m === "D.A.S") {
              values4.push(element[m]);
            }
            if (m === "I.M") {
              values5.push(element[m]);
            }
            if (m === "BORNAGE") {
              values6.push(element[m]);
            }
            if (m === "REMISE") {
              values7.push(element[m]);
            }
            if (m === "F.L.C") {
              values8.push(element[m]);
            }
            if (m === "DECOMPTE") {
              values9.push(element[m]);
            }
            if (m === "P.A.V") {
              values10.push(element[m]);
            }
            if (m === "MUTATION") {
              values11.push(element[m]);
            }
            if (m === "AVC") {
              values12.push(element[m]);
            }
          }
        });

        // je stock chq VALUES dans OBJ
        obj1 = Object.assign(obj1, { values: values1 });
        obj2 = Object.assign(obj2, { values: values2 });
        obj3 = Object.assign(obj3, { values: values3 });
        obj4 = Object.assign(obj4, { values: values4 });
        obj5 = Object.assign(obj5, { values: values5 });
        obj6 = Object.assign(obj6, { values: values6 });
        obj7 = Object.assign(obj7, { values: values7 });
        obj8 = Object.assign(obj8, { values: values8 });
        obj9 = Object.assign(obj9, { values: values9 });
        obj10 = Object.assign(obj10, { values: values10 });
        obj11 = Object.assign(obj11, { values: values11 });
        obj12 = Object.assign(obj12, { values: values12 });

        // puis j'ajout OBJ a l'array DONNEE
        donnee.push(obj1);
        donnee.push(obj2);
        donnee.push(obj3);
        donnee.push(obj4);
        donnee.push(obj5);
        donnee.push(obj6);
        donnee.push(obj7);
        donnee.push(obj8);
        donnee.push(obj9);
        donnee.push(obj10);
        donnee.push(obj11);
        donnee.push(obj12);
        // pour avoir un format de donnee DONNE[0] = Tableau de plusieur Objet

        mois.forEach((e) => {
          // je stock la valeur des mois en lettre dans labels
          labels.push(toMonthName(e));
        });

        //   j'ajoute mes 02 array dans l'Objet DATAOBJ
        const dataObj = { labels, data: donnee };

        //   j'ajoute l'Objet DATAOBJ dans l'Array DATA
        data.push(dataObj);
      }

      // Je renvoie mon DATA au Front 
      result(null, data);
    }
  });
};

Stat.getTempsPerduOfDossierByProcedure = (numeroDossier, result) => {
  dbConn.query(STATS_SINGLE_DOSSIER, numeroDossier, (err, res) => {
    if (err) { 
      result(err, null);
    } else {
      //stoquer les mois(en lettre) du stats
      const labels = [];

      //stoquer les mois(en chiffre) du stats
      const mois = [];

      //ce VALUES va ordonner toutes les donnees selon leur mois
      const values1 = [];

      //stoquer les donnee du stats
      const donnee = [];
      let obj1 = {};

      //stoquer les donnee de retour
      const data = [];

      if (res.length !== 0) {
        //pour chaque element du resultat du mysql dans RES
        res.forEach((element) => {
          //pour chaque element du variable ELEMENT de chq ligne, je les stock dans M
          for (const m in element) {
            // Recuperation des mois disponible
            if (m === "nomProcedure") {
              //element[m] design la valeur du mois en chiffre, je les stock dans MOIS
              mois.push(element[m]);
            }

            // Recuperation des valeur correspondant a chq mois
            if (m === "nombreJour") {
              values1.push(element[m]);
            }
          }
        });

        // je stock chq VALUES dans OBJ
        obj1 = Object.assign(obj1, { values: values1 });

        // puis j'ajout OBJ a l'array DONNEE
        donnee.push(obj1);
        // pour avoir un format de donnee DONNE[0] = Tableau de plusieur Objet

        mois.forEach((e) => {
          // je stock la valeur des mois en lettre dans labels
          labels.push(e);
        });

        //   j'ajoute mes 02 array dans l'Objet DATAOBJ
        const dataObj = { labels, data: donnee };

        //   j'ajoute l'Objet DATAOBJ dans l'Array DATA
        data.push(dataObj);
      }

      // Je renvoie mon DATA au Front 
      result(null, data);
    }
  });
};

Stat.getTempsPerduByProcedure = (result) => {
  dbConn.query(STATS_TEMPS_PERDU_PROCEDURE, (err, res) => {
    if (err) { 
      result(err, null);
    } else {
      //stoquer les mois(en lettre) du stats
      const labels = [];

      //stoquer les mois(en chiffre) du stats
      const mois = [];

      //ce VALUES va ordonner toutes les donnees selon leur mois
      const values1 = [];

      //stoquer les donnee du stats
      const donnee = [];
      let obj1 = {};

      //stoquer les donnee de retour
      const data = [];

      if (res.length !== 0) {
        //pour chaque element du resultat du mysql dans RES
        res.forEach((element) => {
          //pour chaque element du variable ELEMENT de chq ligne, je les stock dans M
          for (const m in element) {
            // Recuperation des mois disponible
            if (m === "nomProcedure") {
              //element[m] design la valeur du mois en chiffre, je les stock dans MOIS
              mois.push(element[m]);
            }

            // Recuperation des valeur correspondant a chq mois
            if (m === "nombreJour") {
              values1.push(element[m]);
            }
          }
        });

        // je stock chq VALUES dans OBJ
        obj1 = Object.assign(obj1, { values: values1 });

        // puis j'ajout OBJ a l'array DONNEE
        donnee.push(obj1);
        // pour avoir un format de donnee DONNE[0] = Tableau de plusieur Objet

        mois.forEach((e) => {
          // je stock la valeur des mois en lettre dans labels
          labels.push(e);
        });

        //   j'ajoute mes 02 array dans l'Objet DATAOBJ
        const dataObj = { labels, data: donnee };

        //   j'ajoute l'Objet DATAOBJ dans l'Array DATA
        data.push(dataObj);
      }

      // Je renvoie mon DATA au Front 
      result(null, data);
    }
  });
};

Stat.getStatsBySigle = (result) => {
  dbConn.query(STATS_SIGLE, (err, res) => {
    if (err) { 
      result(err, null);
    } else {
      //stoquer les mois(en lettre) du stats
      const labels = [];

      //stoquer les mois(en chiffre) du stats
      const mois = [];

      //ce VALUES va ordonner toutes les donnees selon leur mois
      const values1 = [];
      const values2 = [];
      const values3 = [];

      //stoquer les donnee du stats
      const donnee = [];
      let obj1 = {};
      let obj2 = {};
      let obj3 = {};

      //stoquer les donnee de retour
      const data = [];

      if (res.length !== 0) {
        //pour chaque element du resultat du mysql dans RES
        res.forEach((element) => {
          //pour chaque element du variable ELEMENT de chq ligne, je les stock dans M
          for (const m in element) {
            // Recuperation des mois disponible
            if (m === "Mois") {
              //element[m] design la valeur du mois en chiffre, je les stock dans MOIS
              mois.push(element[m]);
            }

            // Recuperation des valeur correspondant a chq mois
            if (m === "V") {
              values1.push(element[m]);
            }
            if (m === "AX") {
              values2.push(element[m]);
            }
            if (m === "X") {
              values3.push(element[m]);
            }
          }
        });

        // je stock chq VALUES dans OBJ
        obj1 = Object.assign(obj1, { values: values1 });
        obj2 = Object.assign(obj2, { values: values2 });
        obj3 = Object.assign(obj3, { values: values3 });

        // puis j'ajout OBJ a l'array DONNEE
        donnee.push(obj1);
        donnee.push(obj2);
        donnee.push(obj3);
        // pour avoir un format de donnee DONNE[0] = Tableau de plusieur Objet

        mois.forEach((e) => {
          // je stock la valeur des mois en lettre dans labels
          labels.push(toMonthName(e));
        });

        //   j'ajoute mes 02 array dans l'Objet DATAOBJ
        const dataObj = { labels, data: donnee };

        //   j'ajoute l'Objet DATAOBJ dans l'Array DATA
        data.push(dataObj);
      }

      // Je renvoie mon DATA au Front 
      result(null, data);
    }
  });
};

module.exports = Stat;
