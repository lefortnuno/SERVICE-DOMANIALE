"use strict";
const Terrain = require("../models/terrain.model");
const NumeroIM = require("../models/numeroIM.model");

module.exports.addTerrain = (req, res) => {
  let { imTerrain, nomPropriete, etatCiviqueTerrain, prixTerrain, cin } =
    req.body;

  NumeroIM.getLastIdNumeroIM((err, resLastIM) => {
    if (!err) {
      imTerrain = resLastIM + "-" + imTerrain;

      const newTerrain = {
        imTerrain,
        nomPropriete,
        etatCiviqueTerrain,
        prixTerrain,
        cin,
      };


      Terrain.addTerrain(newTerrain, (erreur, resp) => {
        if (erreur) {
          res.send(erreur);
        } else {
          res.send(resp);
        }
      });
    }
  });
};

module.exports.getAllTerrains = (req, res) => {
  Terrain.getAllTerrains((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getIdTerrain = (req, res) => {
  Terrain.getIdTerrain(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.searchTerrain = (req, res) => {
  const valeur = req.body;
  Terrain.searchTerrain(valeur, (err, resp) => {
    if (!err) {
        res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updateTerrain = (req, res) => {
  const {
    imTerrain,
    nomPropriete,
    etatCiviqueTerrain,
    cin,
  } = req.body;
  const updateTerrain = {
    imTerrain,
    nomPropriete,
    etatCiviqueTerrain,
    cin,
  };

  Terrain.updateTerrain(updateTerrain, req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};
