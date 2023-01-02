"use strict";
const Terrain = require("../models/terrain.model");
const NumeroIM = require("../models/numeroIM.model");

module.exports.addTerrain = (req, res) => {
  let {
    immatriculationTerrain,
    nomPropriete,
    t_cin,
    t_numeroDossier,
    t_numeroAffaire,
  } = req.body;

  let numeroTitre;
  let newTerrain = {
    numeroTitre,
    immatriculationTerrain,
    nomPropriete,
    // etatCiviqueTerrain,
    // prixTerrain,
    t_cin,
    t_numeroDossier,
    t_numeroAffaire,
  };

  if (immatriculationTerrain === "V") {
    NumeroIM.getLastNumeroIM_V((err, resLastIM) => {
      if (!err) {
        newTerrain.numeroTitre = resLastIM;
        newTerrain.immatriculationTerrain =
          resLastIM + "-" + newTerrain.immatriculationTerrain;

        Terrain.addTerrain(newTerrain, (erreur, resp) => {
          if (erreur) {
            res.send(erreur);
          } else {
            NumeroIM.addNumeroIM_V();
            res.send(resp);
          }
        });
      }
    });
  } else if (immatriculationTerrain === "AX") {
    NumeroIM.getLastNumeroIM_AX((err, resLastIM) => {
      if (!err) {
        newTerrain.numeroTitre = resLastIM;
        newTerrain.immatriculationTerrain =
          resLastIM + "-" + newTerrain.immatriculationTerrain;

        Terrain.addTerrain(newTerrain, (erreur, resp) => {
          if (erreur) {
            res.send(erreur);
          } else {
            NumeroIM.addNumeroIM_AX();
            res.send(resp);
          }
        });
      }
    });
  } else if (immatriculationTerrain === "X") {
    NumeroIM.getLastNumeroIM_X((err, resLastIM) => {
      if (!err) {
        newTerrain.numeroTitre = resLastIM;
        newTerrain.immatriculationTerrain =
          resLastIM + "-" + newTerrain.immatriculationTerrain;

        Terrain.addTerrain(newTerrain, (erreur, resp) => {
          if (erreur) {
            res.send(erreur);
          } else {
            NumeroIM.addNumeroIM_X();
            res.send(resp);
          }
        });
      }
    });
  }
};

module.exports.le_Terrain = (req, res) => {
  let { numeroRequerant, numeroDossier, cin } = req.body;
  const valeur = { numeroRequerant, numeroDossier, cin };

  Terrain.rechercher_le_Terrain(valeur, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
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
  let { value } = req.body;
  const valeur = { value };
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
    etatCiviqueTerrain,
    immatriculationTerrain,
    nomPropriete,
    t_cin,
    prixTerrain,
  } = req.body;

  const updateTerrain = {
    etatCiviqueTerrain,
    immatriculationTerrain,
    nomPropriete,
    t_cin,
    prixTerrain,
  };

  Terrain.updateTerrain(updateTerrain, req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.ajoutPrixDuTerrain = (req, res) => {
  const { prixTerrain } = req.body;

  const updateTerrain = {
    prixTerrain,
  };

  Terrain.updateTerrain(updateTerrain, req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};
