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

Terrain.addTerrain = (newTerrain, result) => {
  Individu.getCinIndividu(newTerrain.cin, (err, resIndividu) => {
    console.log(resIndividu);
    if (resIndividu.length) {
      dbConn.query("INSERT INTO Terrain SET ?", newTerrain, (err, res) => {
        if (err) {
          result(err, null);
        } else {
          result(null, res);
        }
      });
    } else {
      result(null, { message: "Individu non trouver ! Inconnu !" });
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
      if(res.length !== 0){
        result(null, res);
      } else {
        result(null,  null);
      }
    }
  });
};

Terrain.searchTerrain = (valeur, result) => {
  let req
  console.log(valeur.nomPropriete);
  if(valeur.imTerrain && valeur.cin && valeur.nomPropriete){
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

Terrain.updateTerrain = (updateTerrain, numSuivi, result) => {
  // En Cas de Force Majeur !
  dbConn.query(
    `update Terrain set ? where imTerrain = ${numSuivi}`,
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
