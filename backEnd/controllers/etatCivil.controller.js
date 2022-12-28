"use strict";
const EtatCivil = require("../models/etatCivil.model");

module.exports.addEtatCivil = (req, res) => {
  const {
    nature,
    cinConjoint,
    nomConjoint,
    prenomConjoint,
    dateEtatCivil,
    lieuEtatCivil,
  } = req.body;

  const newEtatCivil = {
    nature,
    cinConjoint,
    nomConjoint,
    prenomConjoint,
    dateEtatCivil,
    lieuEtatCivil,
  };
  EtatCivil.addEtatCivil(newEtatCivil, (erreur, resp) => {
    if (erreur) {
      res.send(erreur);
    } else {
      res.send(resp);
    }
  });
};

module.exports.getAllEtatCivils = (req, res) => {
  EtatCivil.getAllEtatCivils((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getIdEtatCivil = (req, res) => {
  EtatCivil.getIdEtatCivil(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updateEtatCivil = (req, res) => {
  const {
    nature,
    cinConjoint,
    nomConjoint,
    prenomConjoint,
    dateEtatCivil,
    lieuEtatCivil,
  } = req.body;
  const updateEtatCivil = {
    nature,
    cinConjoint,
    nomConjoint,
    prenomConjoint,
    dateEtatCivil,
    lieuEtatCivil,
  };

  EtatCivil.updateEtatCivil(updateEtatCivil, req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};
