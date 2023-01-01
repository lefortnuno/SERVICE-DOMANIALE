let dbConn = require("../config/db");
const Individu = require("./individu.model");

let Terrain = function (terrain) {
  this.numSuivi = terrain.numSuivi;
  this.imTerrain = terrain.imTerrain;
  this.nomPropriete = terrain.nomPropriete;
  this.etatCiviqueTerrain = terrain.etatCiviqueTerrain;
  this.prixTerrain = terrain.prixTerrain;
  this.cin = terrain.cin;
};

const REQUETE_EXTRA = `
SELECT
    numeroDossier,
    numeroAffaire,
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
    p_numeroRequerant,
    p_numeroProcedure,
    numeroRequerant,
    etatMorale,
    numeroTelephone,
    complementInformation,
    p_cin,
    cin,
    nom,
    prenom,
    lieuNaiss,
    DATE_FORMAT(dateNaiss, '%d-%m-%Y') as dateNaiss,
    profession,
    domicile,
    DATE_FORMAT(dateLivrance, '%d-%m-%Y') as dateLivrance,
    lieuLivrance,
    p_codeEtatCivil,
    numeroTitre,
    immatriculationTerrain,
    nomPropriete,
    etatCiviqueTerrain,
    prixTerrain,
    t_cin
FROM
    DOSSIER,
    REQUERANT, 
    INDIVIDU,
    TERRAIN
WHERE
    TERRAIN.t_cin = INDIVIDU.cin  
    AND DOSSIER.p_numeroRequerant = REQUERANT.numeroRequerant  
    AND INDIVIDU.cin = REQUERANT.p_cin `;

Terrain.addTerrain = (newTerrain, result) => {
  dbConn.query("INSERT INTO Terrain SET ?", newTerrain, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, { success: true });
    }
  });
};

Terrain.getAllTerrains = (result) => {
  dbConn.query("SELECT * FROM Terrain", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Terrain.getIdTerrain = (id, result) => {
  dbConn.query("SELECT * FROM Terrain WHERE numSuivi = ?", id, (err, res) => {
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

Terrain.searchTerrain = (valeur, result) => {
  let req;
  console.log(valeur.nomPropriete);
  if (valeur.imTerrain && valeur.cin && valeur.nomPropriete) {
    req = `select * from Terrain where imTerrain LIKE '%${valeur.imTerrain}%' AND cin LIKE '%${valeur.cin}%'  AND nomPropriete LIKE '%${valeur.nomPropriete}%' `;
  }
  /**
   * BEAUCOUP DE ELSE IF HERE !!!
   */

  dbConn.query(req, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Terrain.rechercher_le_Terrain = (valeur, result) => {
  console.log(valeur);
  const TRIPLE_CONDITION = ` AND cin = ${valeur.cin} AND numeroRequerant = ${valeur.numeroRequerant} AND numeroDossier = ${valeur.numeroDossier} `;

  dbConn.query(
    REQUETE_EXTRA + TRIPLE_CONDITION + ` GROUP BY numeroDossier `,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Terrain.updateTerrain = (updateTerrain, numeroTitre, result) => {
  // En Cas de Force Majeur !
  dbConn.query(
    `update Terrain set ? where numeroTitre = ${numeroTitre}`,
    updateTerrain,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Terrain;
