let dbConn = require("../config/db");
const Individu = require("./individu.model");

let Terrain = function (terrain) {
  this.numSuivi = terrain.numSuivi;
  this.imTerrain = terrain.imTerrain;
  this.nomPropriete = terrain.nomPropriete;
  this.etatCiviqueTerrain = terrain.etatCiviqueTerrain;
  this.prixTerrain = terrain.prixTerrain;
  this.t_cin = terrain.t_cin;
  this.t_numeroDossier = terrain.t_numeroDossier;
  this.t_numeroAffaire = terrain.t_numeroAffaire;
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
    t_labordeLat,
    t_labordeLong,
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
    AND INDIVIDU.cin = REQUERANT.p_cin
    AND DOSSIER.numeroDossier = TERRAIN.t_numeroDossier
    AND DOSSIER.numeroAffaire = TERRAIN.t_numeroAffaire `;

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
  dbConn.query("SELECT * FROM Terrain order by numeroTitre ASC", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Terrain.getIdTerrain = (id, result) => {
  dbConn.query(REQUETE_EXTRA+ ` and numeroTitre = ? ` , id, (err, res) => {
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
  dbConn.query(
    REQUETE_EXTRA +
      ` AND ( immatriculationTerrain LIKE '%${valeur.value}%' OR nomPropriete LIKE '%${valeur.value}%') `,
    (err, res) => {
      if (err) { 
        result({ err, message: "erreur !", success: false }, null);
      } else {
        if (res.length !== 0) {
          result(null, { res, success: true });
        } else {
          result(null, { res, message: "Introuvable !", success: false });
        }
      }
    }
  );
};

Terrain.rechercher_le_Terrain = (valeur, result) => { 
  const TRIPLE_CONDITION = ` AND cin = ${valeur.cin} AND numeroRequerant = ${valeur.numeroRequerant} AND t_numeroDossier = ${valeur.numeroDossier} `;

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
