let dbConn = require("../config/db");

const Historique = function (historique) {
  this.numeroHisto = historique.numeroHisto;
  this.mouvement = historique.mouvement;
  this.dateDebutMouvement = historique.dateDebutMouvement;
  this.dateFinMouvement = historique.dateFinMouvement;
  this.dateRDV = historique.dateRDV;
  this.dispoDossier = historique.dispoDossier;
  this.approbation = historique.approbation;
  this.accomplissement = historique.accomplissement;
  this.observation = historique.observation;
  this.h_numeroAffaire = historique.h_numeroAffaire;
  this.h_numeroDossier = historique.h_numeroDossier;
  this.p_numeroCompte = historique.p_numeroCompte;
  this.h_numeroProcedure = historique.h_numeroProcedure;
};

// Format date aujourdhui pour mysql
let today = new Date();
let dateAujourdHui = new Date();

const y = today.getFullYear();
const m = today.getMonth() + 1;
const d = today.getDate();

const fomatDateAujourdHui = y + "-" + m + "-" + d;

const REQUETE_BASE = ` 
SELECT
    -- max(numeroSousDossier) as numeroSousDossier,
    numeroHisto,
    mouvement,
    DATE_FORMAT(dateDebutMouvement, '%d-%m-%Y') as dateDebutMouvement,
    DATE_FORMAT(dateFinMouvement, '%d-%m-%Y') as dateFinMouvement,
    DATE_FORMAT(dateRDV, '%d-%m-%Y') as dateRDV,
    dateRDV as dateALERTE,
    dispoDossier,
    approbation,
    observation,
    VISA,
    preVISA,
    accomplissement,
    h_numeroAffaire,
    h_numeroDossier,
    h_numeroProcedure,
    p_numeroCompte,
    dependance,
    natureAffectation,
    empietement,
    lettreDemande,
    planAnnexe,
    pvDelimitation,
    superficieTerrain,
    DATE_FORMAT(dateDemande, '%d-%m-%Y') as dateDemande,
    droitDemande,
    observationDossier, 
    observationSD,
    DATE_FORMAT(dateDepotSD, '%d-%m-%Y') as dateDepotSD,
    mesureAttribuable,
    prixAttribue,
    lettreDesistement,
    planMere,
    certificatSituationJuridique,
    identification,
    u_cin,
    p_cin,
    numeroRequerant,
    etatMorale,
    numeroTelephone,
    complementInformation,
    nomProcedure,
    natureProcedure,
    movProcedure,
    p_numeroProcedure,
    p_idBureau,
    nomBureau,
    adressBureau,
    nom,
    prenom
FROM
    HISTORIQUE,
    REQUERANT,
    COMPTE,
    SOUS_DOSSIER,
    DOSSIER,
    PROCEDURES,
    BUREAU,
    INDIVIDU
WHERE
    HISTORIQUE.h_numeroAffaire = DOSSIER.numeroAffaire
    AND HISTORIQUE.h_numeroDossier = DOSSIER.numeroDossier
    AND HISTORIQUE.h_numeroProcedure = PROCEDURES.numeroProcedure
    AND HISTORIQUE.p_numeroCompte = COMPTE.numeroCompte
    AND DOSSIER.p_numeroRequerant = REQUERANT.numeroRequerant
    AND DOSSIER.numeroAffaire = SOUS_DOSSIER.p_numeroAffaire
    AND DOSSIER.numeroDossier = SOUS_DOSSIER.p_numeroDossier 
    AND PROCEDURES.p_idBureau = BUREAU.idBureau
    AND INDIVIDU.cin = REQUERANT.p_cin `;
    

const GROUP_BY = ` GROUP BY h_numeroAffaire `;
const ORDER_BY = ` ORDER BY numeroHisto DESC `;
const GROUP_BY_numHisto = ` GROUP BY numeroHisto `;

const CONDITION_RDV_APRES = ` AND ( accomplissement=0) AND dateFinMouvement IS NULL `;
const CONDITION_RDV = ` AND ( dateRDV > '${fomatDateAujourdHui}') AND dateFinMouvement IS NULL `;
const ORDER_BY_ASC = ` ORDER BY numeroHisto ASC `;

Historique.addHistorique = (newHistorique, result) => {
  dbConn.query("INSERT INTO Historique SET ?", newHistorique, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, { success: true });
    }
  });
};

Historique.addHistoNewDemande = (newHistorique) => {
  dbConn.query("INSERT INTO HISTORIQUE SET ?", newHistorique);
};

Historique.getAllHistoriques = (result) => {
  dbConn.query(REQUETE_BASE + GROUP_BY_numHisto + ORDER_BY, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Historique.getHistoriqueDossier = (id, result) => {
  dbConn.query(REQUETE_BASE + ` AND h_numeroDossier = ? `+ GROUP_BY_numHisto + ORDER_BY_ASC, id, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Historique.getCahierInterne = (result) => {
  dbConn.query(
    REQUETE_BASE +
      `AND ( mouvement = 'Interne' AND dispoDossier = 1 ) ` +
      GROUP_BY_numHisto +
      ORDER_BY,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Historique.getCahierArriver = (result) => {
  dbConn.query(
    REQUETE_BASE +
      `AND ( mouvement = 'Arriver' AND dispoDossier = 1 ) ` +
      GROUP_BY_numHisto +
      ORDER_BY,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Historique.getCahierDepart = (result) => {
  dbConn.query(
    REQUETE_BASE +
      `AND ( mouvement = 'Depart' AND dispoDossier = 0 ) ` +
      GROUP_BY_numHisto +
      ORDER_BY,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Historique.getCahierNouvelleDemande = (result) => {
  dbConn.query(
    REQUETE_BASE +
      `AND ( dispoDossier = 1 AND p_numeroProcedure = 1) ` +
      GROUP_BY_numHisto +
      ORDER_BY,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Historique.getCahierRendezVous = (result) => {
  dbConn.query(
    REQUETE_BASE + CONDITION_RDV + GROUP_BY + ORDER_BY_ASC,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Historique.searchHistoriqueRDV = (valeur, result) => {
  const rNumeroAffaire = ` h_numeroAffaire LIKE '%${valeur}%' `;
  const rNom = ` nom LIKE '%${valeur}%' `;
  const rPrenom = ` prenom LIKE '%${valeur}%' `;
  const rNumeroTelephone = ` numeroTelephone LIKE '%${valeur}%' `;
  dbConn.query(
    REQUETE_BASE +
      ` AND ( ${rNumeroAffaire} OR ${rNom} OR ${rPrenom} OR ${rNumeroTelephone} )` +
      CONDITION_RDV +
      GROUP_BY +
      ORDER_BY_ASC,
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

Historique.getIdHistorique = (id, result) => {
  dbConn.query(
    REQUETE_BASE + ` AND numeroHisto = ? ` + GROUP_BY_numHisto,
    id,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Historique.searchHistorique = (valeur, result) => {
  dbConn.query(
    REQUETE_BASE +
      ` AND (h_numeroAffaire LIKE '%${valeur}%' OR u_cin LIKE '%${valeur}%'  OR nom LIKE '%${valeur}%'  OR prenom LIKE '%${valeur}%' )` +
      GROUP_BY_numHisto +
      ORDER_BY,
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

Historique.updateHistorique = (updateHistorique, id, result) => {
  dbConn.query(
    `update Historique set ? where numeroHisto = ${id}`,
    updateHistorique,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, { success: true });
      }
    }
  );
};

module.exports = Historique;
